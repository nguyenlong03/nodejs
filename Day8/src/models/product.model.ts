import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../config/connectDB'
import slugify from 'slugify'

export interface ProductAttributes {
  id: number
  name: string
  description?: string
  price: number
  slug: string
  category_id: number
}

type ProductCreationAttributes = Optional<ProductAttributes, 'id' | 'description' | 'slug'>

export class Product extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes {
  public id!: number
  public name!: string
  public description?: string
  public price!: number
  public slug!: string
  public category_id!: number
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
      allowNull: true // nếu DB có NOT NULL thì giữ nguyên, còn muốn tạm bỏ lỗi thì cho true
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
