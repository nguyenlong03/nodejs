import Product from '../models/product.model'
import { NextFunction, Request, Response } from 'express'
import { ProductImage } from '../models/productImage.model'
import { productsVarionts } from '../models/productVariants.model'
import { asyncMiddleware } from '../middleware/asyncMiddleware'


// import sequelize from "../config/connectDB";
// import { QueryTypes } from "sequelize";

// lấy danh sách sản phẩm với phân trang
export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = Number(req.query.limit) || 10
    const page = Number(req.query.page) || 1
    const offset = (page - 1) * limit
    const product = await Product.findAll({
      limit,
      offset,
      include: [{ model: ProductImage, as: 'images', attributes: ['url'] }]
    })
    res.status(200).json({
      page,
      limit,
      product
    })
  } catch (error) {
    next(error)
  }
}
// lấy chi tiết sản phẩm theo id
export const productDetail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const product = await Product.findOne({
      where: { id },
      include: [
        { model: ProductImage, as: 'images', attributes: { exclude: ['product_id'] } },
        { model: productsVarionts, as: 'variants', attributes: { exclude: ['product_id'] } }
      ]
    })
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'Product not found'
      })
    }

    res.status(200).json({
      product
    })
  } catch (error) {
    next(error)
  }
}

// tạo sản phẩm mới


export const createProduct = asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
  const { name, description, price, images, variants, category_id } = req.body;

  

  // // 1. Tạo sản phẩm mới
  // const newProduct = await Product.create({ name, description, price, category_id });

  // // 2. Tạo images (bulkCreate)
  // if (images && images.length > 0) {
  //   const imageRecords = images.map((url: string) => ({ url, productId: newProduct.id }));
  //   await ProductImage.bulkCreate(imageRecords);
  // }

  // // 3. Tạo variants (bulkCreate)
  // if (variants && variants.length > 0) {
  //   const variantRecords = variants.map((v: any) => ({ ...v, productId: newProduct.id }));
  //   await productsVarionts.bulkCreate(variantRecords);
  // }

  // // 4. Trả về response
  // const productWithRelations = await Product.findByPk(newProduct.id, {
  //   include: [
  //     { model: ProductImage, as: 'images' },
  //     { model: productsVarionts, as: 'variants' }
  //   ]
  // });

  // res.status(201).json({
  //   success: true,
  //   message: 'Product created successfully',
  //   product: productWithRelations,
  // });
});

