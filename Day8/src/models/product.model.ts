import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../config/connectDB'

export interface ProductAttributes {
  id: number
  name: string
  description?: string
  price: number
}

type ProductCreationAttributes = Optional<ProductAttributes, 'id' | 'description'>

export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id!: number
  public name!: string
  public description?: string
  public price!: number
  public stock!: number
}
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'products',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)
export default Product
