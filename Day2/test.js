
const numbers = [1,2,3,5]
const doubled = numbers.map((n) => {
    n*2
    console.log(n*2);
});
console.log(doubled);

const users = [
  { name: "Long", age: 21 },
  { name: "Nam", age: 20 },
  { name: "An", age: 22 },
];
const filter = users.filter((item, index) => {
    item.age > 20
});
console.log(doubled);
console.log(filter);


// reduce


const arr = [1, 2, 3, 4];

const [a, , c, d] = arr;




[1, 2, 3].map1()




if (!Array.prototype.map1) { 
    Array.prototype.map1 = function() {
       console.log(123);
    }
}

const map1 = (arr , callback) =>{
  let resust = []
  for (let i = 0; i < arr.length; i++) {
    resust.push(callback(arr[i] , i , arr))
  }
  return resust

}

const result = map1([1, 2, 3], (value) => value * 2);
console.log(result);


// Polyfill là viết lại đoạn mã thay vì sử dụng các hamc có sẵn
map()
Array.prototype.map1 = function(callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};

console.log([1, 2, 3].map1(n => n * 2)); // [2, 4, 6]

filter
if (!Array.prototype.filter1) {
  Array.prototype.filter1 = function(callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
      if (callback(this[i], i, this)) {
        result.push(this[i]); // chỉ push khi điều kiện đúng
      }
    }
    return result;
  };
}

// Dùng thử
const numbers1 = [1, 2, 3, 4, 5];
const even = numbers.filter1(n => n % 2 === 0);
console.log(even); // 👉 [2, 4]


reduce
if (!Array.prototype.reduce1) {
  Array.prototype.reduce1 = function(callback, initialValue) {
    let accumulator = initialValue; // biến tích lũy
    for (let i = 0; i < this.length; i++) {
      accumulator = callback(accumulator, this[i], i, this);
    }
    return accumulator;
  };
}

// Dùng thử
const sum = [1, 2, 3, 4].reduce1((acc, val) => acc + val, 0);
console.log(sum); // 👉 10
