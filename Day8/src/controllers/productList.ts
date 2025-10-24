import Product from "../models/product.model";
import { NextFunction, Request, Response } from "express";
import { ProductImage } from "../models/productImage.model";



export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.findAll({
        include: [
          { model: ProductImage, as: "images" , attributes: ["url"] },
        ]
    });
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
