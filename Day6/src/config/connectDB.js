import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
 export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT
});
export const connectDB =async () => {
  try {
    await sequelize.authenticate();
    console.log('Kết nối database thành công.');
  } catch (error) {
      console.error('Không thể kết nối đến database:', error);
  }
};