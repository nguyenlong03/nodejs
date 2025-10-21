import express from 'express';
import dotenv from 'dotenv';
import router from './Router/router.js';
import { connectDB } from './config/connectDB.js';

dotenv.config();

const app = express();
// middleware
app.use(express.json()); 
// để đọc dữ liệu từ html backend form
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT_DAY7 || 7000;
// router
app.use('/', router);
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Database connection failed:', error);
  process.exit(1);
});