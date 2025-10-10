# DAY 5

## Các nội dung cần học

- understand json
- CRUD app
- todo app
- middleware
- express.json() middleware

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
