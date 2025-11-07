

import { Product } from '../models/product.model'
import { ProductImage } from '../models/productImage.model'
import { productsVarionts } from '../models/productVariants.model'


// get all product
export const findAllProduct = async (limit : number, offset:number)=>{
return await Product.findAll({
    limit,
    offset,
    include: [{ model: ProductImage, as: 'images', attributes: ['url'] }]
  })
}

// product detail 
export const findOneProductdetail = async (id: number) => {
  return await Product.findOne({
    where: { id },
    include: [
      { model: ProductImage, as: 'images', attributes: { exclude: ['product_id', 'id', 'order'] } },
      { model: productsVarionts, as: 'variants', attributes: { exclude: ['product_id', 'id'] } }
    ]
  })
}

// creat product 
export const createProduct = async (productData: any, transaction: any)=>{
return await Product.create(productData, { transaction });
}
// create product_images
export const createImages = async (images: any[], transaction: any) => {
  return await ProductImage.bulkCreate(images, { transaction });
}
// create product_Variants
export const createVariants = async (variants: any[], transaction: any) => {
  return await productsVarionts.bulkCreate(variants, { transaction });
};
// set variable
export const findOneProduct = async(id:number)=>{
  return await Product.findOne({where : {id}})
}
// update product
export const updateProductData = async (productData: any, id: number, transaction: any) => {
  return await Product.update(productData, { where: { id }, transaction });
};
// delete product images
export const deleteProductImages = async (productId: number, transaction: any) => {
  return await ProductImage.destroy({ where: { product_id: productId }, transaction });
};
// Xóa variants theo product_id
export const deleteProductVariants = async (productId: number, transaction: any) => {
  return await productsVarionts.destroy({ where: { product_id: productId }, transaction });
};


// delete product
export const deleteProductById = async (id: number) => {
  const product = await findOneProduct(id);
  if (!product) {
    throw new Error("id product not found")
  }
  await product.destroy();
  return product;
};


