import Product from '../models/product.model'
import { NextFunction, Request, Response } from 'express'
import { asyncMiddleware } from '../middleware/asyncMiddleware'
import ProductImage from '../models/productImage.model'
import productsVarionts from '../models/productVariants.model'
import sequelize from '../config/connectDB'


// lấy danh sách sản phẩm với phân trang
export const getProducts = asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
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
})
// lấy chi tiết sản phẩm theo id
export const productDetail = asyncMiddleware( async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const product = await Product.findOne({
      where: { id },
      include: [
        { model: ProductImage, as: 'images', attributes: { exclude: ['product_id', 'id', 'order'] } },
        { model: productsVarionts, as: 'variants', attributes: { exclude: ['product_id', 'id'] } }
      ]
    })
    if (!product) {
       res.status(404)
      throw new Error("product not found")
    }

    res.status(200).json({
      product
    })
  } catch (error) {
    next(error)
  }
})

// tạo sản phẩm mới
export const createProduct = asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
  const { name, description, price, images, variants, category_id, slug } = req.body

  const t = await sequelize.transaction()

  try {
    const newProduct = await Product.create({ name, description, price, category_id, slug }, { transaction: t })

    if (images && images.length > 0) {
      const imageRecords = images.map((url: any) => ({
        product_id: newProduct.id,
        url
      }))
      await ProductImage.bulkCreate(imageRecords, { transaction: t })
    }

    if (variants && variants.length > 0) {
      const variantRecords = variants.map((item: any) => ({
        product_id: newProduct.id,
        sku: item.size,
        option_name: item.color,
        price: item.price,
        stock: item.stock
      }))
      await productsVarionts.bulkCreate(variantRecords, { transaction: t })
    }
    await t.commit()
    res.status(201).json({
      message: 'Product created successfully',
      product: newProduct
    })
  } catch (error) {
    await t.rollback()
    next(error) // trả về lỗi cho client
  }
})

// sửa sản phẩm

export const updateProduct =  async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const { name, description, price, images, variants, category_id, slug } = req.body
  const t = await sequelize.transaction()

  try {
    const checkId = await Product.findOne({ where: { id } })
  if (!checkId) {
    throw new Error('id not found')
  }
   await Product.update(
    { name, description, price, category_id, slug },
    { where: { id }, transaction: t }
  )
  const paramcId = Number(req.params.id)
  if (images && Array.isArray(images)) {
    await ProductImage.destroy({ where: { product_id: id } , transaction:t })
    const newImages = images.map((url: string) => ({
      product_id: paramcId,
      url
    }))
    await ProductImage.bulkCreate(newImages, {transaction:t})
  }
   if (variants && Array.isArray(variants)) {
    await productsVarionts.destroy({where : {product_id:id} , transaction:t})
    const variant = variants.map((item : any)=>({
        product_id: paramcId,
        sku: item.size,
        option_name: item.color,
        price: item.price,
        stock: item.stock
    } 
    ))
    await productsVarionts.bulkCreate(variant,{transaction:t})
   }
   await t.commit()
  res.status(200).json({
    message: 'cập nhật product thành công',
  })
  } catch (error) {
   await t.rollback
    next(error)
  }
  
}

// xóa sản phẩm
export const deleteProduct = asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const checkid = await Product.findByPk(id)
  if (!checkid) {
    throw new Error('id not found')
  }
  await checkid.destroy()
  res.status(200).json({ message: ' xóa sản phẩm thành công' })
})
