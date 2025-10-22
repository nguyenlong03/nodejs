import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/connectDB";


export interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  role?: string;
  refresh_token?: string | null;
  reset_token?: string | null;
}

export type UserCreationAttributes = Optional<
  UserAttributes,
  "id" | "role" | "refresh_token" | "reset_token"
>;
export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public role?: string;
  public refresh_token?: string | null;
  public reset_token?: string | null;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },
    refresh_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reset_token: {
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
