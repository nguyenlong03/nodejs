# DAY 6

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

# 4. Database

## 4.1. Select

SELECT dùng để lấy dữ liệu từ một hoặc nhiều bảng trong cơ sở dữ liệu.
Đây là câu lệnh quan trọng nhất, chiếm 70% công việc khi làm SQL.

**Cấu trúc**

```js
SELECT [tên_cột_1, tên_cột_2, ...]
FROM [tên_bảng];
```

## 4.2 where (BETWEEN , AND , OR , IN , IS NULL , LIKE %)

Giúp lọc dữ liệu theo điều kiện

**Cấu trúc**

```js
SELECT [tên_cột_1, tên_cột_2, ...]
FROM [tên_bảng] where [điều kiện]
```

## 4.3 ORDER BY (Xắp xếp)

giúp sắp xếp kết quả của câu lệnh SELECT theo ý muốn , Lệnh này được dùng để phân loại dữ liệu theo thứ tự tăng hoặc giảm dần, dựa trên một hoặc nhiều cộ

```JS
SELECT cot
FROM ten_bang
[WHERE dieu_kien]
[ORDER BY cot_1, cot_2,..., cot_N] [ASC | DESC];
```

## 4.4 LIMIT và OFFSET (Phân trang)

- limit giúp giới hạn phân trang , offset giúp lấy phần tử bắt đầu từ limit
  **Cấu trúc**

```js
SELECT column1, column2, ...
FROM table_name
WHERE conditions
ORDER BY column
LIMIT n OFFSET m;
```

## Các loại join

### Inner join

**Cấu trúc**

```js
SELECT <...>
FROM <Bảng trái> INNERJOIN <bảng phải>
ON <Điều kiện khớp nối (id)>
[các  mệnh đề nếu có ví dụ where , order ... nếu có]
```

**chú ý** : INNER JOIN sẽ chỉ trả về những dòng dữ liệu có giá trị khớp nhau ở cả hai bảng trong điều kiện ON.

### LEFT JOIN

**Cấu trúc**

```js
SELECT <cột muốn lấy>
FROM <bảng_trái> LEFT JOIN <bảng_phải>
ON <điều kiện_khớp_nối>
[WHERE <điều kiện_lọc nếu có>]
[ORDER BY <cột_sắp_xếp>];
```

**còn lại RIGHT JOIN , FULL JOIN cũng giống cấu trúc trên chỉ thay tên**

## 5. Min , max

### Lấy giá trị nhỏ nhất và lớn nhất

**Cú pháp**

```js
// lấy giá trị lớn nhất
SELECT MAX<tên cột> FROM
<tên bảng>
WHERE <điều kiện đi kèm nếu có>

```

```js
SELECT MIN(tên cột) FROM
<tên bảng>
WHERE <điều kiện đi kèm nếu có>
```

## 6.Các statement tính toán

### như là đếm tổng số dòng (COUNT()) , tính tổng các giá trị (SUM()) , Tính trung bình (AVG()).

**Cấu trúc**

```js
SELECT COUNT(<tên cột>) AS <tên cột muốn tạo>
FROM <tên bảng>
```

## GROUP BY (hàm nhóm các dữ liệu)

### thường được dùng với các hàm statement ở mục 6

```js
SELECT <các_cột_không_trùng_lặp>,
       <hàm_tính_toán>(<cột>)
FROM <tên_bảng>
[WHERE <điều_kiện_lọc>]
GROUP BY <các_cột_nhóm>
[HAVING <điều_kiện_sau_nhóm>]
[ORDER BY <cột_sắp_xếp>];

```

**chú ý**:

- WHERE → lọc trước khi nhóm
- GROUP BY → nhóm dữ liệu
- HAVING → lọc sau khi nhóm
- ORDER BY → sắp xếp kết quả cuối
- thứ tự thực hiện câu lệnh sql:

```js
 SELECT
    column_name(s),
    aggregate_function()
 - FROM
    table_name
 - JOIN
    another_table ON ...
 - WHERE
    condition
-  GROUP BY
    column_name
 - HAVING
    condition_on_group
 - ORDER BY
    column_name
 - LIMIT
    n;


# khi xóa dữ liệu dùng delete thì phải làm theo cách sau nếu ko muốn mất toàn bộ dữ liệu
BEGIN;  -- bắt đầu transaction

DELETE FROM users WHERE id = 3;

-- Kiểm tra xem có xóa đúng không:
SELECT * FROM users;

ROLLBACK;  -- hoàn tác lại nếu sai
-- hoặc nếu đúng thì dùng:
COMMIT;    -- xác nhận thay đổi


```
