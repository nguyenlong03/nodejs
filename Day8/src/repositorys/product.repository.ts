
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

export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  images?: string[];
  variants?: any[];
  category_id: number;
  slug: string;

} 


export const creatproduct = async (data:CreateProductInput , transaction:any)=>{
  const { name, description, price, images, variants, category_id, slug } = data;

    const newProduct = await Product.create({ name, description, price, category_id, slug }, { transaction})
      
    if (images && images.length > 0) {
      const imageRecords = images.map((url: string) => ({
        product_id: newProduct.id,
        url
      }))
      await ProductImage.bulkCreate(imageRecords, { transaction})
    }

    if (variants && variants.length > 0) {
      const variantRecords = variants.map((item: any) => ({
        product_id: newProduct.id,
        sku: item.size,
        option_name: item.color,
        price: item.price,
        stock: item.stock
      }))
      await productsVarionts.bulkCreate(variantRecords, { transaction})
    }
}
// set variable
export const findOneProduct = async(id:number)=>{
  return await Product.findOne({where : {id}})
}

// update product

export const updateProduct = async (dataUpdate:CreateProductInput ,id: number , transaction:any )=>{
 const product = await findOneProduct(id)
 if (!product) {
  throw new Error("id product not found")
 }
  const { name, description, price, images, variants, category_id, slug } = dataUpdate;
  await Product.update({ name, description, price, category_id, slug }, { where: { id }, transaction})
    if (images && Array.isArray(images)) {
      await ProductImage.destroy({ where: { product_id: id }, transaction })
      const newImages = images.map((url: string) => ({
        product_id: +id,
        url
      }))
      await ProductImage.bulkCreate(newImages, { transaction })
    }
    if (variants && Array.isArray(variants)) {
      await productsVarionts.destroy({ where: { product_id: id }, transaction })
      const variant = variants.map((item: any) => ({
        product_id: +id,
        sku: item.size,
        option_name: item.color,
        price: item.price,
        stock: item.stock
      }))
      await productsVarionts.bulkCreate(variant, { transaction})
    }
}


// delete product

export const deleteProductById = async (id: number) => {
  const product = await findOneProduct(id);
  if (!product) {
    throw new Error("id product not found")
  }
  await product.destroy();
  return product;
};


