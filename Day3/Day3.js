 
/*
name convention(camelCase, PascalCase, snake_case, UPPER_CASE, kebab-case) -> Quy tắc đặt biến
promise
async/await 
callback function
nodejs
init nodejs project
import, export 
npm website 
nodemon
*/

// camelCase 
// các Hàm sử lý bất đồng 
async / await
const tinhtoan = (data, resolve, reject) => {
  if (data % 2 == 0) {
    resolve(data);
  } else {
    reject("Error");
  }
};

const aPromise1 = new Promise((resolve, reject) => {
  tinhtoan(4, resolve, reject);
});
const aPromise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    tinhtoan(8, resolve, reject);
  }, 3000);
});
const aPromise3 = new Promise((resolve, reject) => {
  tinhtoan(6, resolve, reject);
});

const excume = async () => {
  const newprom = await aPromise1;
  console.log(`promise 1: ${newprom}`);
  const newprom1 = await aPromise2;
  console.log(`promise 2: ${newprom1}`);
  const newprom2 = await aPromise3;
  console.log(`promise 3: ${newprom2}`);
};
excume();



// sử dụng promise
function progames1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(1);
      resolve(1);
    }, 2000);
  });
}
function progames2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(2);
      resolve(2);
    }, 1000);
  });
}
function progames3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(3);
      resolve(3);
    }, 5000);
  });
}

function progames4() {
  return new Promise((resolve, reject) => {
    resolve(4);
  });
}

progames1()
  .then((data) => {
    console.log(data);
    return progames2();
  })
  .then((data) => {
    console.log(data);
    return progames3();
  })
  .then((data) => {
    console.log(data);
    return progames4();
  })
  .then((data) => {
    console.log(data);
  });











