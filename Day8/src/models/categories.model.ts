import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/connectDB";

export interface CategoryAttributes {
  id: number;
  name: string;
  slug: string;
  parent: string;
}

// Khi tạo mới Category, có thể bỏ qua id (vì auto increment)
type CategoryCreationAttributes = Optional<CategoryAttributes, "id">;

export class Category extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes {
  declare  id: number;
  declare  name: string;
  declare  slug: string;
  declare  parent: string;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parent: {
      type: DataTypes.STRING,
      allowNull: true, // có thể null
    },
  },


  {
    sequelize,               
    tableName: "categories", 
    timestamps: false,      
  }
);

export default Category;
