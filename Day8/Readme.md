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
