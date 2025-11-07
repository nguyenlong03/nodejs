# Day 8

## learn Typescript

## cài đặt dự án Express + TypeScript

## Các bước cài đặt

### Bước 1: Khởi tạo dự án

Mở terminal và chạy lệnh sau để tạo tệp `package.json`:

```bash
npm init -y
```

### Bước 2: Cài đặt các thư viện cần thiết (Dependencies)

Cài đặt các thư viện cho production (Express, dotenv, cors):

```bash
npm install express dotenv cors
```

Cài đặt các thư viện cho development (TypeScript, ESLint, Prettier, etc.):

```bash
npm install -D typescript ts-node-dev @types/node @types/express @types/cors @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-prettier prettier
```

### Bước 3: Cấu hình TypeScript

Tạo tệp `tsconfig.json` bằng lệnh:

```bash
npx tsc --init
```

Sau đó, cập nhật nội dung tệp `tsconfig.json` như sau để phù hợp với dự án:

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

### Bước 4: Cấu hình `package.json`

Mở tệp `package.json` và thêm các đoạn mã `scripts` sau để dễ dàng chạy các tác vụ:

```json
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js",
  "lint": "eslint . --ext .ts",
  "lint:fix": "eslint . --ext .ts --fix",
  "format": "prettier --write \"src/**/*.{ts,js,json,md}\""
}
```

### Bước 5: Tạo cấu trúc thư mục và file server

1. Tạo thư mục `src`.
2. Bên trong `src`, tạo tệp `server.ts` với nội dung sau:

```typescript
import express from 'express'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
```

### Bước 6: Chạy dự án

Sử dụng lệnh sau để khởi động server ở chế độ development. Server sẽ tự động khởi động lại khi có thay đổi trong mã nguồn.

```bash
npm run dev
```

Server sẽ chạy tại địa chỉ `http://localhost:3000`.

### Bước 6 : config eslint.config.ts

```js
import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginPrettier from 'eslint-plugin-prettier'

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      prettier: eslintPluginPrettier
    },
    rules: {
      'prettier/prettier': 'off', // tắt toàn bộ cảnh báo Prettier
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      argsIgnorePattern: '^_'
    },
    ignores: ['**/node_modules/', '**/dist/']
  }
]
```

### Bước 7 : config .prettierrc

```js
{
  "arrowParens": "always",
  "semi": false,
  "trailingComma": "none",
  "tabWidth": 2,
  "endOfLine": "auto",
  "useTabs": false,
  "singleQuote": true,
  "printWidth": 120,
  "jsxSingleQuote": true
}

```

# Typescript

## 1. TypeScript là gì?

**TypeScript** là ngôn ngữ lập trình mã nguồn mở do **Microsoft** phát triển, mở rộng từ **JavaScript**.  
Nó bổ sung **kiểu dữ liệu tĩnh (static typing)**, **class**, **interface**, và nhiều tính năng hướng đối tượng, giúp phát triển dự án lớn dễ bảo trì hơn.

### Các kiểu dữ liệu cơ bản

```js
let username: string = "Long";
let age: number = 22;
let isAdmin: boolean = true;
let scores: number[] = [10, 9, 8];
let anything: any = "Tự do";

```

### Kiểu nâng cao (Advanced Types)

```js
// Union Type
let id: number | string;
id = 123;
id = "ABC";

// Type Alias
type UserID = number | string;
let userId: UserID = 42;

// Interface
interface User {
  id: number;
  name: string;
  email?: string; // tùy chọn
}

const user: User = { id: 1, name: "Long" };


// Class
class Person {
  constructor(public name: string, private age: number) {}
  greet() {
    console.log(`Xin chào, tôi là ${this.name}`);
  }
}

const p1 = new Person("Long", 22);
p1.greet();



//Generic (Kiểu tổng quát)
function identity<T>(value: T): T {
  return value;
}

console.log(identity<string>("Hello"));
console.log(identity<number>(10));


// Enum
enum Role {
  ADMIN,
  USER,
  GUEST,
}

let myRole: Role = Role.ADMIN;
console.log(myRole);

```

# Authentication ( xác thực)

### Authentication (xác thực) có nghĩa là xác nhận danh tính của riêng bạn, trong khi authorization (ủy quyền) có nghĩa là cấp quyền truy cập vào hệ thống. Nói một cách đơn giản, authentication là quá trình xác minh bạn là ai, trong khi authorization là quá trình xác minh những gì bạn có quyền truy cập.

# Các status code

## Mã code 200

- 200 :request thành công sever trả về dữ liệu
- 201 : tạo mới thành công : đăng ký , thêm sản phẩm
- 202 : reques được chấp nhận và sử lý sau
- 202 : thành công nhưng không có dữ liệu trả về

## Mã code 400 lỗi phía client

- 400 : bad Request : Request sai cú pháp hoặc gửi sai dữ liệu
- 401 : Unauthorized : không có token trong header
- 403 : Forbidden : đã đăng nhập nhưng không có quyền truy cập
- 404 : not foud : không tìm thấy tài nguyên
- 405 : Methot not allowsd : sai method
- 409 : conflic : xung đột dữ liệu như email hoặc password đã tồn tại

## Mã code 500 lỗi phía server

- 500 : internal server erro : lỗi server không xác định
- 503 : Service Unavailable : server quá tải

# basic authen

- là 1 phương thức để xác thực người dùng khi truy cập tài nguyên thông qua http(s)
- Là phương thức xác thực đơn giản trong HTTP.
- Client gửi username và password trong mỗi request.
- Thông tin này được encode bằng Base64 và gửi trong header:

# Cookie

- Cookie là file nhỏ lưu trên trình duyệt (client).
- Nó được server gửi về và được gửi lại trong các request tiếp theo.
- Cookie có thể lưu thông tin nhỏ hoặc session ID để server biết client là ai.
- Ví dụ: Set-Cookie: sessionID=abc123; HttpOnly
- Cookie là một đoạn văn bản ghi thông tin được tạo ra và lưu trên trình duyệt của máy người dùng.

# Session

- Session là dữ liệu lưu trên server để nhớ trạng thái người dùng.
- Mỗi client có 1 session riêng, server dùng session ID để xác định user.
- Thường lưu thông tin như: userId, role, giỏ hàng…
- Session giúp xác thực và quản lý quyền mà không phải lưu dữ liệu nhạy cảm trên client.

```js
select u.id , u.full_name , u.email
from users u
left join orders o on u.id = o.user_id
where o.id isnull



select
date_trunc('month' , placed_at) as month,
count(*) as soluong
sum(total_amuont) as doanh thu
from orders
where placed_at >= now() - interval '6 month'
group by month
```

## HTTPONLY , SAMESITE , SECURE , PATH

1. HTTPONLY: nếu thuộc tính này = true => thì Cookie chỉ được gửi khi trình duyệt gửi request HTTP, chứ không đọc được bằng JS trên client. giúp ngăn chặn các cuộc tấn công xss

- nếu mà thuộc tính này = false thì nó vẫn gửi kèm request bình thường nhưng js có thể truy cập dược cookie qua document.cookie dễ bị tấn công xss

2. Samesite : thuộc tính bảo mật của cookie, giúp trình duyệt kiểm soát xem cookie có được gửi kèm khi yêu cầu đến từ một trang web khác hay không.

   #### các giá trị của samesite gồm các giá trị sau

- script : chỉ gửi dược cookie khi request cùng domain , nếu như khác domain thì sẽ không gửi dược
  => dược dung khi chỉ muốn cookie hoạt động nội bộ trong 1 domain duy nhất,
  ví dụ: bank.com muốn bảo mật tuyệt đối, không chấp nhận cross-site nào.

- Lax : mặc dịnh hiện nay Gửi cookie trong một số trường hợp an toàn (ví dụ truy cập trực tiếp, form GET), nhưng không gửi trong iframe hoặc fetch cross-site.

- none : Luôn gửi cookie, kể cả khi cross-site (frontend và backend khác domain hoặc port). Phải dùng secure: true kèm theo.

trường hợp Nên dùng
FE & BE cùng domain (hoặc cùng cổng) sameSite: "lax"
FE & BE khác port (vd: 3000 – 4000) sameSite: "none"

3. secure : khi mà cái này bằng true thì cookie chỉ được gửi qua https , nếu dùng với localhost (http) thì sẽ không gửi di dược
   => khi nào dùng : khi mà ở môi trường localhost ta nên xét secure = false , còn ở môi trường server that thì sẽ thành true

ví dụ ở server thật
res.cookie("token", token, {
sameSite: "none",
secure: true, // bắt buộc nếu sameSite=none
});

4. path : với thằng này Quy định đường dẫn (URL path) mà cookie sẽ được gửi kèm.

ví dụ : res.cookie("token", token, {
path: "/api",
});
Trình duyệt chỉ gửi cookie này khi gọi API bắt đầu bằng /api.

## Pool và Poolsize

- pool giúp quản lý hiệu quả kết nối DB, còn poolSize (hay max) giới hạn số kết nối hoạt động cùng lúc để tránh “nghẽn” database.

- pool là một nhóm các kết nối tới database mà Sequelize (hoặc ORM khác) tạo sẵn và tái sử dụng

- thay vì mỗi lần request đến thì phải kết nối mới tới DB (rất tốn thời gian).

## isolation transaction ( mức độ cô lập)

- Isolation level là mức kiểm soát cách các transaction ảnh hưởng lẫn nhau khi chúng chạy đồng thời trong cơ sở dữ liệu.( => Nếu 2 người cùng sửa/xem dữ liệu một lúc, thì database sẽ cho phép “nhìn thấy” bao nhiêu thay đổi của người kia?)
- có 4 loại bao gồm
  - Read uncommitted.
  - Read committed.
  - Repeatable read.
  - Serializable.

1. Read uncommitted(Đọc cả dữ liệu chưa commit):
   - Transaction có thể nhìn thấy dữ liệu mà transaction khác chưa commit (tức là chưa lưu chính thức).Đây gọi là Dirty Read (đọc dữ liệu bẩn).

- thường không được sử dụng

```js
Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED
```

2. Read committed.

- Đây là mức mặc định
- chỉ đọc dữ liệu khi đã commit
- Không đọc dữ liệu chưa commit → tránh Dirty Read.
- Nhưng vẫn có thể gặp Non-repeatable Read (lúc đầu đọc 100, lát sau đọc lại thấy 200 do người khác commit giữa chừng).

- nhược điểm :
  - Không đảm bảo dữ liệu “ổn định” trong suốt transaction.

  - Dễ gặp Non-repeatable Read hoặc Phantom Read.

```js
Transaction.ISOLATION_LEVELS.READ_COMMITTED
// dùng khi CRUD đơn giản, không ảnh hưởng lớn
```

3. REPEATABLE READ( Đọc cố định)

- Khi transaction bắt đầu, mọi SELECT sẽ nhìn thấy snapshot dữ liệu tại thời điểm bắt đầu.

```js
Transaction.ISOLATION_LEVELS.REPEATABLE_READ
// dùng khi Thao tác đọc–ghi nhạy cảm (giá tiền, điểm số, tồn kho)
//Trong khi T1 đang chạy, T1 luôn thấy giá = 100.000, dù T2 đã cập nhật lên 150.000.
//Chỉ khi T1 commit hoặc rollback, lần đọc tiếp theo mới thấy giá mới.
```

4.  SERIALIZABLE (an toàn nhất )

- Coi như các transaction được thực thi lần lượt (tuần tự).

- Database tự khóa hoặc tự hoãn các transaction khác để tránh mọi xung đột.

- Nhược điểm:
  - Hiệu năng thấp, dễ gặp lỗi SerializationError khi có nhiều người truy cập cùng lúc.

  - Database phải rollback hoặc retry nhiều lần.

```js
Transaction.ISOLATION_LEVELS.SERIALIZABLE
// dùng khi các hệ thống ngân hàng, tài chính, kế toán, nơi dữ liệu sai 1 đồng cũng không chấp nhận được.
```

## OOP

## OOP là viết tắt của Lập trình hướng đối tượng (Object-Oriented Programming), một mô hình lập trình dựa trên khái niệm về lớp và đối tượng. Mô hình này giúp tổ chức code theo hướng mô phỏng các đối tượng trong thế giới thực, mỗi đối tượng có cả thuộc tính (dữ liệu) và phương thức (hành vi). Ưu điểm chính của OOP là giúp mã nguồn dễ quản lý, tái sử dụng và mở rộng hơn, đặc biệt trong các dự án lớn.

## Đối tượng trong OOP gòm 2 thành phần chính:

- thuộc tính (Attribute): là những thông tin đặc điểm đối tượng
- phương thức (Method): là những hành vi mà đối tượng có thể thực hiện

## Mục tiêu

- Giúp code rõ ràng, dễ mở rộng, dễ bảo trì bằng cách mô phỏng cách thế giới thật hoạt động.

## OOP gồm 4 đặc tính cơ bản

1. Tính đóng gói (Encapsulation)

- Tính đóng gói cho phép che giấu thông tin và những tính chất xử lý bên trong của đối tượng. Các đối tượng khác đều không thể tác động trực tiếp đến dữ liệu bên trong và thay đổi trạng thái của các đối tượng mà bắt buộc phải thông qua các phương thức công khai do đối tượng đó cung cấp

2. Tính kế thừa (Inheritance)

- Đây là tính chất được sử dụng khá nhiều. Tính kế thừa cho phép xây dụng một lớp mới (lớp Con), kế thừa và tái sử dụng các thuộc tính phương thức dựa trên lớp cũ (lớp Cha) đã có trước đó.

- Các lớp Con kế thừa toàn bộ thành phần của lớp Cha và không cần phải đinh nghĩa lại. Lớp có có thể mở rộng các thành phần kế thừa hoặc bổ sung những thanh phần mới

3. Tính đa hình (Polymorphim)

- Tính đa hình trong lập trình OOP cho phép các đối tượng khác nhau thực thi chức năng giống nhau theo những cách khác nhau.
  - ví dụ : Ở lớp smartphone, mỗi một dòng máy đều kế thừa các thành phần của lớp cha nhưng Iphone chạy trên hệ điều hành IOS còn Samsung lại chạy trên hệ điều hành Androi

4. Tính trừu tượng

- Tính trừu tượng giúp loại bỏ những thứ phức tạp không cần thiết của đối tượng và chỉ tâp trung vào những thứ cốt lõi quan trọng
