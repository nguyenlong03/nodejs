import sequelize from "../config/app.config";
import { DataTypes, Model, Optional } from "sequelize";
import Product from "./product.model";
// tạo ra interface cho ProductImage
export interface ProductAttributes {
  id: number;
  product_id: number;
  url: string;
  order?: number;
}
// thiết lập các trường muốn bỏ qua khi tạo mới
type ProductImageCreationAttributes = Optional<
  ProductAttributes,
  "id"
>;
// tạo class ProductImage kế thừa từ Model của sequelize
export class ProductImage
  extends Model<ProductAttributes, ProductImageCreationAttributes>
  implements ProductAttributes{
    declare  id: number;
    declare  product_id: number;
    declare  url: string;
    declare  order: number;
  }

ProductImage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: "product_images",
    timestamps: false
  }
);
export default ProductImage;
