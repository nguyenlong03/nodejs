import { DataTypes } from "sequelize";
import { sequelize } from "../config/connectDB.js";


const Todo = sequelize.define(
  "Todo",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "todos", // ánh xạ đúng tên bảng trong database
    timestamps: false,  // vì bảng không có createdAt, updatedAt
  }
);

export default Todo;
