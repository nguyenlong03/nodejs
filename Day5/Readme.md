# DAY 5

## Các nội dung cần học

- understand json
- CRUD app
- todo app
- middleware
- express.json() middleware
- Commit Convention

## 1. understand json

### Json là một định dạng dữ liệu dùng để lưu trữ và trao đổi dữ liệu từ client đến server

### Cấu trúc

- json dựa trên 2 cấu trúc chính :

  - Objects và Array

- Về Object (Đối tượng)
  - Được bao quanh bở dấu {},
  - Dữ liệu được lưu dưới dạng key và value
  - key là **Chuỗi** , value có thể là :
    **số, chuỗi , boolean , null , array hoặc object khác **

**Example**

```js
{
  "name": "Long",
  "age": 22,
  "isStudent": true
}

```

- Về Array (mảng)
  - Được bao quanh bởi []
  - Chứa một danh sách các giá trị , có thể là :
    số , chuối , object , hoặc Array khác

**Example**

```js
[
  { name: "Long", age: 22 },
  { name: "Giang", age: 25 },
];
```

**Trick**:

- Chuyển json sang object

```js
const jsonString = '{"name":"Long","age":22}';
const obj = JSON.parse(jsonString); // JSON string → JS object
console.log(obj.name); // Long
```

- Chuyển object sang json

```js
const obj = { name: "Long", age: 22 };
const jsonString = JSON.stringify(obj); // JS object → JSON string
console.log(jsonString); // '{"name":"Long","age":22}'
```

**Chú ý**: Khi gửi dữ liệu qua HTTP (fetch, axios) hoặc lưu vào file thường dùng JSON.stringify.Khi nhận dữ liệu từ server, bạn dùng JSON.parse.

## 2.middleware

### Midleware là thành phần trung gian xử lý request/respone trong pipeline của express

- Mỗi midleware có thể
  - Thực hiện logic(loging , parsing, auth, validation ...)
  - Thay đổi req / res
  - Kết thúc response hoặc chuyển tiếp cho middleware tiếp theo bằng next()

### Cấu trúc midlware

```js
// hàm cơ bản
function (req, res, next) { ... }
```

```js
// hàm xử lý lỗi
function (err, req, res, next) { ... }
```

### Các cách đặt midleware

- Global (dùng cho mọi route)
- Route-specific (chỉ apply cho route hoặc router)
- Third-party (ví dụ body-parser, cors, helmet)
- Error-handling

### Examle

** Ví dụ midleware về xác thực người dùng**

```js
const requireAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  // verify token...
  next();
};

app.get("/protected", requireAuth, (req, res) => {
  res.json({ secret: "data" });
});
```

**Error-handling middleware**

```js
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || "Internal Server Error" });
});
```

## Thứ tự (order) và phạm vi (scoped)

### Order matters: middleware được gọi theo thứ tự đăng ký.

### Scope: app.use('/api', middleware) chỉ apply cho routes bắt đầu bằng /api.

### Router-level: dùng express.Router() để nhóm middleware cho module.

## 3.CRUD & Todolist

### CRUD là viết tắt của 4 thao tác cơ bản trong việc quản lý dữ liệu: Create , Read , Update , Delete

### CREATE (POST)

- Thêm dữ liệu vào DB

**Example**

```js
// Thêm dữ liệu và check trùng trong DB khi người dùng add công việc mới
export const createData = async (req, res) => {
  try {
    const { title, completed } = req.body;
    if (!title) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập tiêu đề công việc" });
    }
    const existingTodo = await Todo.findOne({
      where: { title: { [Op.iLike]: title.trim() } },
    });

    if (existingTodo) {
      return res.status(400).json({ message: "Công việc này đã tồn tại!" });
    }
    const newTodo = await Todo.create({
      title: title.trim(),
      completed: completed || false,
    });
    res.status(201).json(newTodo);
  } catch (error) {
    console.error(error);
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .json({ message: "Công việc này đã tồn tại trong cơ sở dữ liệu!" });
    }
    res.status(500).json({ message: "Lỗi server" });
  }
};
```

### READ (GET)

- Mục tiêu : Lấy danh sách trong DB

**Example**

```js
// lấy data ở DB
export const getData = async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};
```

### 3.UPDATE (PUT)

- Mục tiêu : Sửa dữ liệu theo id

**Example**

```js
// Sửa công việc theo id
export const updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).json({ message: "Không tìm thấy todo" });
    }
    const updatedTodo = await todo.update({ title, completed });
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};
```

### 4.DELETE (DELETE)

- Mục tiêu : Xóa dữ liệu theo id

**Example**

```js
export const deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).json({ message: "Không tìm thấy todo" });
    }
    await todo.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};
```

### Sử dụng ORM (Sequelize)

#### ORM (Object Relational Mapping) là kỹ thuật giúp bạn làm việc với database bằng đối tượng (object) thay vì viết câu lệnh SQL thủ công.

```js
// cách cài đặt
npm install Sequelize
npm install --save pg pg-hstore # Postgres
```

- Docs tại [https://sequelize.org/docs/v6/core-concepts/model-basics/] , database [https://www.postgresql.org/]

## Commit Convention

- feat: thêm tính năng
- fix: sửa lỗi
- refactor: tối ưu code
- style: chỉnh UI
- chore: cấu hình / phụ trợ
- docs: tài liệu
