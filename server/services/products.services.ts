import  mongoose from "mongoose";

import { NotFoundException } from '../utils/exceptions';
import Products, { IProduct } from '../database/models/products';

export interface UpdatePayload {
  [key: string]: string | number
}

class ProductServices {

  static async getProducts(offset: number, limit: number) {
    return await Products.paginate({}, { offset, limit });
  }

  static async getProduct(id: string): Promise<IProduct> {
    if(!mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Product not found');
    }
    const product = await Products.findById(id);
    if(!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  static async addProduct(product: IProduct): Promise<IProduct> {
    return await Products.create(product);
  }

  static async updateProduct(id: string, data: UpdatePayload): Promise<any> {
    return await Products.findByIdAndUpdate({_id: id}, data);
  }

  static async deleteProduct(id: string): Promise<any> {
    return await Products.findByIdAndDelete(id);
  }
}

export default ProductServices;
