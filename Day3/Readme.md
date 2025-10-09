# DAY 3

## Các nội dung cần học

- name convention(camelCase, PascalCase, snake_case, UPPER_CASE, kebab-case) -> Quy tắc đặt biến
- promise
- async/await
- callback function
- nodejs
- init nodejs project
- import, export
- npm website
- nodemon

## 1. name convention

## 1.1 camelCase()

### Chữ đầu viết thường, các từ tiếp theo viết hoa chữ cái đầu

### Dùng cho: Biến, hàm, property của object.

**Example:**

```js
let firstName = "Long";
let totalPrice = 100;

function calculateSum(a, b) {
  return a + b;
}

const userProfile = { name: "Long", age: 20 };
```

### 1.2.PascalCase

#### Định nghĩa: Mỗi từ viết hoa chữ cái đầu, không có dấu gạch dưới.

#### Dùng cho: Class, constructor, React component, tên module.

**Example**

```js
class Student {
  constructor(name) {
    this.name = name;
  }
}

const myStudent = new Student("Long");

function MyComponent() {
  return <div>Hello</div>;
}
```

### 1.3.UPPER_CASE

#### Định nghĩa: Viết hoa tất cả, nối các từ bằng \_.

#### Dùng cho: Hằng số (constant), key quan trọng.

```js
const MAX_USER = 100;
const API_KEY = "abc123";

const STATUS_ACTIVE = "active";
const STATUS_INACTIVE = "inactive";
```

### 1.4 kebab-case

#### Định nghĩa: Viết thường tất cả, nối các từ bằng -.

#### Dùng cho: Tên file, CSS class, HTML id.

```js
<div class="main-header"></div>
<button id="submit-button">Submit</button>
```

## 2. Callback

### Định nghĩa : Là mội funcition được truyền vào 1 funcition

**Example**

```js
function sayHello(name) {
  console.log("Hello " + name);
}

function processUserInput(callback) {
  const name = "Long";
  callback(name); // gọi lại hàm callback
}

processUserInput(sayHello);
```

**ƯU ĐIỂM**

- Nó có thể sử lý bất đồng bộ trong javascrip
- có thể truyền nhiều hàm khác nhau vào cùng 1 hàm

  **Example**

  ```js
  function handleData(callback) {
    const data = [1, 2, 3];
    callback(data);
  }
  handleData((arr) => console.log(arr.join(","))); // "1,2,3"
  handleData((arr) => console.log(arr.length));
  ```

  **NHƯỢC ĐIỂM**

- vì là hàm trong hàm nên nó có thể gay ra hiện tượng

  **Example**

  ```js
  progames1(() => {
    progames2(() => {
      progames3(() => {
        progames4();
      });
    });
  });
  ```

## 3. Promise

### Định Nghĩa : Promise là 1 cơ chế trong js nó giúp sử lý bất đồng bộ và khắc phục nhược điểm của callback hell

### Trạng thái

- Promise có 3 trạng thái
  - pending (trạng thái chờ kết quả)
  - fulfilled (trạng thái thành công)
  - rejected (trạng thái thất bại)
    **Cách khởi tạo 1 promise**

```js
const creatPromise = new promise((resolve, reject) => {
  let boolean = true;
  boolean ? resolve("Thành công") : reject("thất bại");
  creatPromise
    .then((data) => {
      console.log(data); // in ra thành công
    })
    .cath((err) => {
      console.log(err); // in ra thất bại
    });
});
```

**Chú ý** : Dù khắc phục được callback hell nhưng vì .then() liên tục cũng làm ảnh hưởng đến code và debug đây cũng là nhược điểm của promise

## 4.async/await

### Định Nghĩa : là một tính năng của JavaScript giúp chúng ta làm việc với các hàm bất đồng bộ theo cách thú vị hơn và dễ hiểu hơn. Nó được xây dựng trên Promises và tương thích với tất cả các Promise dựa trên API

### Async - khai báo một hàm bất đồng bộ (async function someName(){...}).

```js
function getData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Dữ liệu đã tải xong"), 2000);
  });
}

getData().then((data) => console.log(data));
// viết theo async / await như sau

async function showData() {
  const data = await getData();
  console.log(data);
}

showData();
```

- Tự động biến đổi một hàm thông thường thành một Promise.
- Khi gọi tới hàm async nó sẽ xử lý mọi thứ và được trả về kết quả trong hàm của nó.
  Async cho phép sử dụng Await.

### Await - tạm dừng việc thực hiện các hàm async. (Var result = await someAsyncCall ()

- Khi được đặt trước một Promise, nó sẽ đợi cho đến khi Promise kết thúc và trả về kết quả.
- Await chỉ làm việc với Promises, nó không hoạt động với callbacks.
- Await chỉ có thể được sử dụng bên trong các function async.

### Sử lý lỗi trong Async / await

#### Async / Await là nó cho phép chúng ta bắt các lỗi không mong đợi bằng cách sử dụng try / catch. Chúng ta chỉ cần để các await call của chúng ta vào trong khối try/catch như sau:

```js
const doSomethingAsync = async()=>{
     try{
         // code tại đây
     }
     cath(err){
       // sử lý lỗi err
     }
}
```

## 5.Nodejs

- Node.js là môi trường chạy JavaScript bên ngoài trình duyệt,
- giúp dùng JS để viết server backend, thao tác với file, API, cơ sở dữ liệu, v.v

## 6.init nodejs project

- Giúp tạo ra file package.json

## 7.import, export

### Với 1 dự án không thể viết chung vào 1 file ta cần bóc tách các file riêng biệt lúc này mới dùng đến import và export

### Để các file có liên kết được với nhau thì dùng phải cần dùng đến import và export

- export là xuất ra những gì file muốn chia sẻ
- import là lấy những gì file khác đã export
