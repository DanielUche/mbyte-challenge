import Products, { IProduct } from '../database/models/products';

import { NotFoundException } from '../utils/exceptions';

class ProductServices {

  static async getProducts(offset: number, limit: number) {
    const products = await Products.paginate({}, { offset, limit });
    if (!products.totalDocs) {
      throw new NotFoundException('Products not found');
    }
    return products;
  }

  static async getProduct(id: number): Promise<IProduct> {
    return await Products.findById(id);
  }

  static async addProduct(product: IProduct): Promise<IProduct> {
    return await Products.create(product);
  }

  static async updateProduct(id: number, data: IProduct): Promise<any> {
    return await Products.findByIdAndUpdate(id, data);
  }

  static async deleteProduct(id: number): Promise<any> {
    return await Products.findByIdAndDelete(id);
  }
}

export default ProductServices;
