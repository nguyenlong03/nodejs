# DAY 2

## Các nội dung cần học

- map, filter, reduce
- function
- object
- spread operator
- rest parameter
- parameter vs argument
- destructuring
- check property in object
- find
- findIndex
- indexOf

## 1.Map()

### **Dùng để:** Tạo ra **mảng mới** bằng cách **biến đổi từng phần tử** của mảng ban đầu.

Map gồm có 2 tham số item và index trong đó item là là phần tử được duyệt qua từng phần tử của mảng, còn index là vị trí của từng phần tử trong mảng

**Chú ý**: Nó không làm thay đổi đến giá trị của mảng ban đầu

**Syntax**:

```js
Array.Map(callbackFunction(item, index));
```

**Example:**

```js
const numbers = [1, 2, 3];
const doubled = numbers.map((n) => n * 2);
console.log(numbers); // [1,2,3]
console.log(doubled); // [2, 4, 6]
```

## 2.Filter()

### **Dùng để:** Lọc ra các phần tử thỏa mãn điều kiện đặt ra

**Syntax**:

```js
Array.Filter(callbackFunction(item, index));
```

**Example:**

```js
// lấy ra các trường có độ tuổi > 20
const users = [
  { name: "Long", age: 21 },
  { name: "Nam", age: 20 },
  { name: "An", age: 22 },
];
const filter = users.filter((item, index) => item.age > 20);
console.log(filter);
```

## 3.reduce()

### Là một phương thức sẵn có được sử dụng để thực thi một hàm lên các phần tử của mảng (từ trái sang phải) với một biến tích lũy để thu về một giá trị duy nhất. Là một phương thức quan trọng hay sử dụng trong lập trình hàm.

**Syntax**:

```js
Array.reduce(callbackFunction(acc, cur , index), initalvalue);
Trong đó :
Acc -> giá trị được cộng dồn sau mỗi lần lặp
cur -> giá trị lặp qua từng phần tử
index -> vị trí của từng phần tử
initalvalue -> nó là giá trị khởi tạo
```

```js
// tính tổng các phần tử mảng với giá trị khở tạo là 5
const Array = [1, 2, 3, 4];
let initalvalue = 5;
const reduce = Array.reduce((acc, cur) => {
  console.log("test ", cur);
  console.log("test acc", acc);
  const TongArray = acc + cur;
  return TongArray;
}, initalvalue);
console.log(reduce);
```

## 4.object

### Là một kiểu dữ liệu phức tạp trong JavaScript dùng để lưu trữ tập hợp các cặp key-value. Object giúp biểu diễn dữ liệu có cấu trúc và được sử dụng rất phổ biến trong các ứng dụng thực tế.

**Syntax**:

```js
const objectName = {
  key1: value1,
  key2: value2,
  ...
}
```

**Example:**

```js
// dùng Destructuring để truy cập vào giá trị
const user = {
  name: "Long",
  age: 21,
  address: {
    city: "Hà Nội",
    country: "Việt Nam",
  },
};
const {
  name,
  age,
  address: { city },
} = user;
```

## 5.spread operator

### Là cú pháp đặc biệt trong JavaScript được ký hiệu bằng ..., dùng để trải (mở rộng) các phần tử của mảng hoặc các thuộc tính của object.

### Nó giúp sao chép, gộp, hoặc truyền dữ liệu một cách ngắn gọn, dễ hiểu.

**Syntax**:

```js
// Mảng
const newArray = [...oldArray];

// Object
const newObject = { ...oldObject };
```

**Example:**

```js
// 1. Sao chép object
const user = { name: "Long", age: 21 };
const copyUser = { ...user };

// 2. Gộp object
const address = { city: "Hà Nội", country: "Việt Nam" };
const userInfo = { ...user, ...address };

// 3. Sao chép mảng
const arr = [1, 2, 3];
const newArr = [...arr];

// 4. Gộp mảng
const arr1 = [1, 2];
const arr2 = [3, 4];
const merged = [...arr1, ...arr2];

// 5. Truyền giá trị mảng vào hàm
function sum(a, b, c) {
  return a + b + c;
}
const nums = [1, 2, 3];
console.log(sum(...nums)); // 6
```

## 6.rest parameter

### Là cú pháp đặc biệt trong JavaScript được ký hiệu bằng ..., dùng để gom nhiều giá trị riêng lẻ thành một mảng.

### Khác với spread operator, rest parameter dùng trong khai báo hàm để nhận số lượng đối số không xác định.

### cái tham số sẽ trả về 1 mảng ...rest luôn trả về 1 mảng

**Syntax**:

```js
const funcName = (...rest) => {
  // rest là 1 mảng chứa các đối số truyền vào
};
```

**Example**:

```js
const funcNumbers=(....Number)=>{
    return Number
}
console.log(funcNumbers(1,2,3,4))// [1,2,3,4]
```

## 7.find()

### Được dùng để tìm phần tử đầu tiên trong mảng thỏa mãn điều kiện

### Nếu thấy thì trả về kết quả , nếu không thấy thì trả về undifined

**Syntax**:

```js
Array.Find(callbackFC(element , index))
- trong đó element là các phần tử đang được duyệt
- index là chỉ số hiện tại của phần tử
```

**Example**

```js
// tìm ra phần tử đầu tiên thỏa mãn điều kiện
const Array = [1, 2, 3, 4, 5, 6, 7];
const NewArray = Array.Find((element) => element > 2);
// log ra 3
```

## 8.findIndex()

### Dùng để tìm vị trí index của phần tử đầu tiên thỏa mãn điều kiện trong mảng

### nếu tìm thấy thì sẽ trả về vị trí index , nếu không thì sẽ trả về giá trị -1

**Syntax**:

```js
Array.Findindex(CallbackFC(element , index))
- trong đó :
   - element là các phần tử đang được lặp trong mảng
   -index là chỉ số của phần tử hiện tại
```

**Example**:

```js
const Array = [1, 2, 3, 4];
const NewArray = Array.findindex((element) => element > 3);
// log ra 3
```

## 9. indexOf()

### Dùng để tìm vị trí (index) đầu tiên của 1 phần tử trong mảng hoặc chuỗi

### Nếu tìm thấy thì sẽ trả về giá trị index , Nếu không thì sẽ trả về giá trị = -1

**Syntax**:

```js
array.indexOf(searchElement, fromIndex)
- trong đó
   - searchElement là phần tử cần tìm
   - fromIndex là vị trí bắt đầu tìm kiếm
```

**Example**:

```js
// Check xem có chuối trong mảng không nếu có thì xóa đi và thay bằng táo tầu
const arrayD = ["cam", "chuối", "Bưởi"];
const indexChuoi = arrayD.indexOf("chuối");
console.log(indexChuoi);
if (indexChuoi != -1) {
  console.log("Chuối đã tồn tại");
  arrayD.splice(indexChuoi, 1, "táo tầu");
}
console.log(arrayD);
```
