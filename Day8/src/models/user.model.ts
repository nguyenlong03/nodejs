import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/connectDB";


export interface UserAttributes {
  id: number;
  full_name: string;
  email: string;
  password: string;
  role?: string;
  phone?: string | null;
}


export type UserCreationAttributes = Optional<
  UserAttributes,
  "id" | "role" | "phone"
>;


export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  declare id: number;
  declare full_name: string;
  declare email: string;
  declare password: string;
  declare role?: string;
  declare phone?: string | null;
}


User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: false,
  }
);

export default User;
