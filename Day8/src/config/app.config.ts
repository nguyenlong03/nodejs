import { Sequelize } from 'sequelize';
import { config } from './env.config';
import dotenv from 'dotenv';

dotenv.config();


const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    dialect: "postgres",
    port: Number(config.DB_PORT) || 5432,
    logging: false, // nếu muốn bật log sql thì đặt thành true
    pool : {
      max : 5,
      min : 0,
      acquire : 30000,// chờ tối đa 30 giây để lấy connection
      idle : 10000
    }
  }
);
export default sequelize;
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
