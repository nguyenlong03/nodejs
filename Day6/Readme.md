# DAY 5

## Các nội dung cần học

- error handling
- throw
- errorMiddleware
- asyncMiddleware
- Postgres query cở bản: select, các loại join, group by, order by, offset, limit, các statement tính toán min, max...

## 1. error handling

### Error Handling là cơ chế dùng để phát hiện, bắt và xử lý lỗi trong quá trình chương trình chạy, giúp ứng dụng không bị dừng đột ngột và trả về thông báo lỗi có ý nghĩa cho người dùng.

## Throw

- Dùng để tạo ra một lỗi một cách chủ động.
- Khi throw được gọi, chương trình sẽ dừng tại đó và ném ra lỗi cho phần xử lý kế tiếp.
  **example**

```js
if (!data) {
  throw new Error("Không tìm thấy dữ liệu");
}
```

## Try-catch

- dùng để bắt và xử lý lỗi cục bộ.

```js
try {
  //  Khối lệnh có thể gây ra lỗi
} catch (error) {
  // Khối xử lý khi lỗi xảy ra
}
```

## 2. errorMiddleware

### errorMiddleware là middleware xử lý lỗi (Error Handling Middleware) trong Express.js, được dùng để bắt và xử lý tất cả lỗi phát sinh trong quá trình chạy ứng dụng.

### Nó giúp tập trung quản lý lỗi thay vì phải viết try...catch ở từng route riêng lẻ.

### Cách hoạt động

Khi một lỗi được tạo ra (bằng throw hoặc next(error)), Express sẽ tự động chuyển lỗi đó đến errorMiddleware.
Tại đây, middleware sẽ:

- Ghi log lỗi (nếu cần).
- Gửi phản hồi JSON chứa thông tin lỗi cho client.
- Giúp ứng dụng không bị crash khi xảy ra lỗi.

Cấu trúc

```js
export const errorMiddleware = (err, req, res, next) => {
  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    status: "error",
    message: err.message,
  });
};
```

**Cách sử dụng**

- Tạo ra 1 forder tên là middleware và trong forder này sẽ tạo ra 1 file errormiddleware.js để custum tất cả những trường sảy ra để bắt lỗi ở đây

- đặt ở dưới cùng ở file server

## 3. asyncMiddleware

### asyncMiddleware là một hàm trung gian (middleware wrapper) dùng để tự động bắt lỗi trong các hàm async mà không cần viết try...catch lặp đi lặp lại trong từng controller.

**Cách hoạt động**

- asyncMiddleware nhận vào một hàm async (controller)
  → nó thực thi và nếu có lỗi, gọi next(error) để chuyển lỗi đến errorMiddleware.

```js
export const asyncMiddleware = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
```

**Cách dùng**

- Tạo 1 file asyncMiddleware custum sau đó import vào controller dùng như sau

```js
// thay vì viết try catch bình thường như thế này
export const getData = async (req, res, next) => {
  try {
    const todos = await Todo.findAll();
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};
// ta viết lại khi đã custum asyncMiddleware
import { asyncMiddleware } from "../middleware/asyncMiddleware.js";

export const getData = asyncMiddleware(async (req, res, next) => {
  const todos = await Todo.findAll();
  res.status(200).json(todos);
});
```
