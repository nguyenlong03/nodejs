import express from 'express';
import router from './Router/router.js';
import dotenv from 'dotenv';
import {connectDB} from './config/connectDB.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware parse JSON body
app.use(express.json());  
app.use('/', router);
// Sử dụng middleware xử lý lỗi
app.use(errorMiddleware);
// connect database
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Database connection failed:', error);
    process.exit(1);
});
