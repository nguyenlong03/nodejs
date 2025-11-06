import Product from '../models/product.model'
import { NextFunction, Request, Response } from 'express'
import ProductImage from '../models/productImage.model'
import productsVarionts from '../models/productVariants.model'
import sequelize from '../config/app.config'
import { Transaction } from 'sequelize'
import * as productServiecs from '../services/product.service'


// get all product
export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
 
  const data = await productServiecs.getAllProduct(page , limit)
  res.status(200).json({
    page,
    limit,
    data
  })
}
// get product detail
export const productDetail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const product = await productServiecs.productDetail(+id)
    res.status(200).json({
      succes : true,
      product
    })
  } catch (error) {
    next(error)
  }
}
// create product
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productServiecs.creatProduct(req.body)
   res.status(201).json({ 
    succes : true,
    message: 'Product created', product });
  } catch (error) {
    next(error)
  }
}

// update product
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  await productServiecs.updateProduct(req.body, +id)
  res.status(200).json({
    success : true,
    message : "update success"
  })
}

// delete product
export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  await productServiecs.deleteProduct(+id)
  res.status(200).json({
    success : true,
    message : "Delete success"
  })
}
