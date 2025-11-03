import Product from './product.model'
import ProductImage from './productImage.model'
import ProductVariants from './productVariants.model'
import Category from './categories.model'

// Product ↔ ProductImage
Product.hasMany(ProductImage, { foreignKey: 'product_id', as: 'images', onDelete: 'CASCADE' });
ProductImage.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

// Product ↔ ProductVariants
Product.hasMany(ProductVariants, { foreignKey: 'product_id', as: 'variants', onDelete: 'CASCADE' });
ProductVariants.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

// Product ↔ Category
Category.hasMany(Product, { foreignKey: 'category_id', as: 'products', onDelete: 'CASCADE' });
Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category', onDelete: 'CASCADE' });

export { Product, ProductImage, ProductVariants, Category };
