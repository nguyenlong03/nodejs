// src/config/env.ts
import dotenv from "dotenv";
dotenv.config({ path: ".env.development" }); 

export const config ={
    DB_NAME: process.env.DB_NAME as string,
    DB_USER: process.env.DB_USER as string,
    DB_PASSWORD: process.env.DB_PASSWORD as string,
    DB_HOST: process.env.DB_HOST as string,
    DB_PORT: process.env.DB_PORT as string,
    PORT: process.env.PORT as string,
    TOKEN: process.env.TOKEN as string,
    NODE_ENV: process.env.NODE_ENV as string,
    REFRES_TOKEN: process.env.REFRES_TOKEN as string
};