import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../config/connectDB'
import { fa } from 'zod/locales'


export interface ProductAttributes {
  id: number
  name: string
  description?: string
  price: number
  slug: string
  category_id: number
}

type ProductCreationAttributes = Optional<ProductAttributes, 'id' | 'description' >

export class Product extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes {
  declare  id: number
  declare  name: string
  declare  description?: string
  declare  price: number
  declare  slug: string
  declare  category_id: number
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
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    category_id: {
      type: DataTypes.INTEGER,
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
