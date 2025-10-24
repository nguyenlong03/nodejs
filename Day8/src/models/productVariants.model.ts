import sequelize from "../config/connectDB";
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
   public id! : number
   public product_id! : number
   public sku!: string
   public option_name!: string
   public price! : number
   public stock! : number
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
   }
    ,{
    sequelize,
    modelName: "product_variants",
    timestamps: false,
   }
)


Product.hasMany(productsVarionts,{foreignKey : "product_id", as : "variants"});
productsVarionts.belongsTo(Product,{foreignKey : "product_id", as : "product"});