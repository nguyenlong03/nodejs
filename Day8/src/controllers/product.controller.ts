import Product from '../models/product.model'
import { NextFunction, Request, Response } from 'express'
import { asyncMiddleware } from '../middleware/asyncMiddleware'
import ProductImage from '../models/productImage.model'
import productsVarionts from '../models/productVariants.model'
import sequelize from '../config/connectDB'
import { and } from 'sequelize'
import { any } from 'zod'


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
export const productDetail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const product = await Product.findOne({
      where: { id },
      include: [
        { model: ProductImage, as: 'images', attributes: { exclude: ['product_id', 'id','order']  ,  } },
        { model: productsVarionts, as: 'variants', attributes: { exclude: ['product_id', "id"] } }
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
  const { name, description, price, images, variants, category_id, slug } = req.body;

  const t = await sequelize.transaction();

  try {
    const newProduct = await Product.create(
      { name, description, price, category_id, slug },
      { transaction: t }
    );

    if (images && images.length>0) {
      const imageRecords = images.map((url:any) => ({
        product_id: newProduct.id,
        url
      }));
      await ProductImage.bulkCreate(imageRecords, { transaction: t });
    }

    if (variants && variants.length>0) {
      const variantRecords = variants.map((item:any) => ({
        product_id: newProduct.id,
        sku: item.size,
        option_name: item.color,
        price: item.price,
        stock: item.stock
      }));
      await productsVarionts.bulkCreate(variantRecords, { transaction: t });
    }

    await t.commit();

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct
    });
  } catch (error) {
    await t.rollback();
    console.log(error);
    
    next(error); // trả về lỗi cho client
  }
});

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
