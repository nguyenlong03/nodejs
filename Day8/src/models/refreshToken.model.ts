import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/connectDB";
import User from "./user.model";

interface RefreshTokenAttributes {
  id: number;
  token: string;
  user_id: number;
  expires_at: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

type RefreshTokenCreationAttributes = Optional<RefreshTokenAttributes, "id">;

class RefreshToken
  extends Model<RefreshTokenAttributes, RefreshTokenCreationAttributes>
  implements RefreshTokenAttributes
{
  public id!: number;
  public token!: string;
  public user_id!: number;
  public expires_at!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Định nghĩa model
RefreshToken.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "refresh_tokens",
    modelName: "RefreshToken",
    timestamps: false, // có createdAt, updatedAt
  }
);

// Tạo association với User
RefreshToken.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.hasMany(RefreshToken, { foreignKey: "user_id", as: "refreshTokens" });

export default RefreshToken;
