import Product from "../models/product.model";
import { NextFunction, Request, Response } from "express";
import { ProductImage } from "../models/productImage.model";
import { productsVarionts } from "../models/productVariants.model";

// import sequelize from "../config/connectDB";
// import { QueryTypes } from "sequelize";

 // lấy danh sách sản phẩm với phân trang
export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = Number(req.query.limit) || 10
     const page = Number(req.query.page) || 1;
     const offset = (page-1)* limit
    const product = await Product.findAll(
      {
        limit,
        offset,
        include: [
          { model: ProductImage, as: "images" , attributes: ["url"] },
        ]
    });
    res.status(200).json({
      page,
      limit,
      product
    });
  } catch (error) {
    next(error);
  }
};
// lấy chi tiết sản phẩm theo id
export const productDetail = async (req:Request , res : Response , next : NextFunction)=>{
  try {
     const {id} = req.params 
      const product = await Product.findOne({
      where: { id },
      include: [
        { model: ProductImage, as: "images",attributes: { exclude: ["product_id"] } },
        { model: productsVarionts, as: "variants" ,attributes: { exclude: ["product_id"] } }
      ]
    });
    if (!product) {
      return res.status(404).json({ 
        success: false,
        error: "Not Found",
        message: "Product not found" });  
    }

    res.status(200).json({
      product
    });
  } catch (error) {
    next(error)
  } 
}
