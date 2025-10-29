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
