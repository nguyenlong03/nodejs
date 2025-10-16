import express from 'express';
import router from './Router/Router.js';
import dotenv from 'dotenv';
import {connectDB} from './config/connectDB.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());  
app.use('/', router);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Database connection failed:', error);
    process.exit(1);
});
