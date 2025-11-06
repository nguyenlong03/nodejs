import * as productRepository from '../repositorys/product.repository';
import sequelize from '../config/app.config';
import {CreateProductInput} from '../repositorys/product.repository'
export const productDetail = async(id: number) =>{
const product = await productRepository.findOneProductdetail(id)
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
}
// get all product
export const getAllProduct = async (page: number , limit:number)=>{
const offset = (page - 1) * limit;
  const products = await productRepository.findAllProduct(limit, offset);
  return {
    page,
    limit,
    products,
  };
}
// create product
export const creatProduct = async (data:CreateProductInput)=>{
const t = await sequelize.transaction();
  try {
    const product = await productRepository.creatproduct(data, t);
    await t.commit();
    return product;
  } catch (error) {
    await t.rollback();
    throw error;
  }
}
// update product
export const updateProduct = async (data :CreateProductInput , id:number)=>{
  const t = await sequelize.transaction()
  try {
    const product = await productRepository.updateProduct(data ,id, t)
    await t.commit()
    return product
  } catch (error) {
    await t.rollback()
    console.log(error);
  }

}
// delete product
export const deleteProduct = async(id : number)=>{
const product = await productRepository.deleteProductById(id)
  return product
}

