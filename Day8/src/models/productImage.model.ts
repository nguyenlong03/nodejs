import sequelize from "../config/connectDB";
import { DataTypes, Model, Optional } from "sequelize";
import Product from "./product.model";
// tạo ra interface cho ProductImage
export interface ProductAttributes {
  id: number;
  product_id: number;
  url: string;
  order: number;
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
    public id!: number;
    public product_id!: number;
    public url!: string;
    public order!: number;
  }
// khởi tạo model với các trường và kiểu dữ liệu tương ứng
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
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: "product_images",
    timestamps: false
  }
);

Product.hasMany(ProductImage, { foreignKey: "product_id", as: "images" });
ProductImage.belongsTo(Product, { foreignKey: "product_id", as: "product" });