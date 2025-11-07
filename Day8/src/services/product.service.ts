import * as productRepository from '../repositorys/product.repository';
import sequelize from '../config/app.config';



 interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  images?: string[];
  variants?: any[];
  category_id: number;
  slug: string;

} 


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
    const { name, description, price, images, variants, category_id, slug } = data;
    const product = await productRepository.createProduct({ name, description, price, category_id, slug },
      t);

    if (images?.length) {
      const imageRecords = images.map(url => ({
        product_id: product.id,
        url,
      }));
      await productRepository.createImages(imageRecords, t);
    }

    if (variants?.length) {
      const variantRecords = variants.map(item => ({
        product_id: product.id,
        sku: item.size,
        option_name: item.color,
        price: item.price,
        stock: item.stock,
      }));
      await productRepository.createVariants(variantRecords, t);
    }
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
    const { name, description, price, images, variants, category_id, slug } = data;
    const product = await productRepository.updateProductData({name,description,price,category_id,slug} ,id, t)

    if (images && Array.isArray(images)) {
          await productRepository.deleteProductImages(id , t)
          const newImages = images.map((url: string) => ({
            product_id: +id,
            url
          }))
          await productRepository.createImages(newImages,t)
        }

     if (variants && Array.isArray(variants)) {
          await productRepository.deleteProductImages(id,t)
          const variant = variants.map((item: any) => ({
            product_id: +id,
            sku: item.size,
            option_name: item.color,
            price: item.price,
            stock: item.stock
          }))
          await productRepository.createVariants(variant,t)
        }
    await t.commit()
    return product
  } catch (error) {
    await t.rollback()
    throw error
  }

}
// delete product
export const deleteProduct = async(id : number)=>{
 return await productRepository.deleteProductById(id)
}

