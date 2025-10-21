# DAY 7

## Các nội dung cần học

- xử lý validate backend dùng thư viện {zod}

# Xử lý validate backend

## safeParse() trong zod

### safeParse() là phương thức an toàn của Zod dùng để validate dữ liệu mà không ném lỗi (throw error).

### Nó trả về kết quả dưới dạng object, chứ không dừng chương trình khi sai.

**kết quả trả về**

```js
{
  success: true or false
  true :data: <giá trị sau khi parse> ? false :   error: ZodError
}
```

### Các bước thực hiện

- Bước 1 : cài đặt thư viện zod

```js
npm install zod
```

- Bước 2 : tạo ra 1 forder mới có tên là utils (để custom zod tại đây)

```js
// trong custom này thì sẽ làm về 2 loại 1 là đăng ký , 2 là đăng nhập
// với custom thì chúng ta cần validate trường nào thì viết trường đó ví dụ
// trong trường hợp dưới đây chỉ validate 3 trường cơ bản username , email , passwword
import { z } from "zod";
// đăng ký validate
export const registerSchema = z.object({
  username: z.string().min(3, "Username ít nhất 3 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  password: z
    .string()
    .min(8, "Mật khẩu ít nhất 8 ký tự")
    .regex(/[A-Z]/, "Phải có ít nhất 1 chữ hoa")
    .regex(/[0-9]/, "Phải có ít nhất 1 số")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, " phải có ít nhất 1 ký tự đặc biệt"),
});

// đăng nhập validate
export const loginSchema = z.object({
  username: z.string().min(3, "Username ít nhất 3 ký tự"),
  password: z.string().min(8, "Mật khẩu ít nhất 8 ký tự"),
});
```

- Bước 3 : tạo Middleware/validateMiddleware để custom middleware theo ZOD

```js
import { ZodError } from "zod";

export const validate = (schema) => (req, res, next) => {
  try {
    // Bảo vệ khi truyền sai schema (undefined / không phải Zod schema)
    if (!schema || typeof schema.safeParse !== "function") {
      throw new TypeError("Invalid schema passed to validate middleware");
    }
    const result = schema.safeParse(req.body);
    // Nếu dữ liệu không hợp lệ
    if (!result.success) {
      // Zod v4 sử dụng `issues` thay vì `errors`
      const issues = result.error?.issues || result.error?.errors || [];
      // Log lỗi để dễ debug
      console.log("Validation error:", issues);
      return res.status(400).json({
        success: false,
        message: "Dữ liệu không hợp lệ",
        errors: issues.map((err) => ({
          field: Array.isArray(err.path) ? err.path[0] ?? "unknown" : "unknown",
          message: err.message,
        })),
      });
    }
    // Nếu hợp lệ thì gán data đã parse lại cho req.body
    req.body = result.data;
    return next();
  } catch (error) {
    console.error("Middleware validate lỗi:", error);
    // Nếu lỗi đến từ Zod
    if (error instanceof ZodError) {
      const issues = error.issues || error.errors || [];
      return res.status(400).json({
        success: false,
        message: "Lỗi xác thực dữ liệu",
        errors: issues.map((err) => ({
          field: Array.isArray(err.path) ? err.path[0] ?? "unknown" : "unknown",
          message: err.message,
        })),
      });
    }

    // Nếu là lỗi khác
    return res.status(500).json({
      success: false,
      message: "Lỗi máy chủ",
    });
  }
};
```

- Bước 4 : import vào router để sử dụng

```js
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
```

## Các method trong zod

```js
//các kiểu dữ liệu phổ biến
z.string(),
z.number(),
z.boolean(),
z.date(),
z.array(schema): Mảng phần tử theo schema
z.object()
z.enum([...]): Danh sách giá trị cố định : z.enum(["admin", "user"])

// các method giàng buộc
.min(n, msg):Độ dài tối thiểu / giá trị nhỏ nhất
.max(n, msg) : Độ dài tối đa / giá trị lớn nhất :z.string().max(100)
.email(msg) : Email hợp lệ
.regex(regex, msg) : biểu thức chính quy
.optional() : cho phép null / undefine
.refine(fn, msg) : tự custom logic

// dành cho middleware
schema.parse(data) : Parse và throw lỗi nếu sai
z.object({...}).strict() : Không cho field thừa

```
