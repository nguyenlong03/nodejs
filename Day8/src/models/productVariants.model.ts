import sequelize from "../config/app.config";
import { DataType , DataTypes, Model , Optional } from "sequelize";
import Product from "./product.model";


interface productVariants {
    id : number,
    product_id : number,
    sku: string,
    option_name: string,
    price : number,
    stock : number
    
}

type productVariantsCreationAttributes = Optional<productVariants,'id'
>

export class productsVarionts
extends Model<productVariants,productVariantsCreationAttributes>
implements productVariants {
   declare  id : number
   declare  product_id : number
   declare  sku: string
   declare  option_name: string
   declare  price : number
   declare  stock : number
}
productsVarionts.init(
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
    sku: {
      type: DataTypes.STRING,
      allowNull: false
    },
    option_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "product_variants",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['product_id', 'sku']  // composite unique
      }
    ]
  }
)

export default productsVarionts;

