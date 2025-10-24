import { Sequelize } from 'sequelize';
import { config } from './envConfig';
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
