import { Request, Response } from 'express';
import { IProduct } from '../database/models/products';

import ProductServices from '../services/products.services';
import { BadRequestException } from '../utils/exceptions';
import BaseController from './base.controller';


class ProductController extends BaseController {

  static async getProducts(req: Request, res: Response) {
    try {
      const { page, limit } = req.query;
      const offset: number = page ? Number(page) : 0;
      const plimit: number = limit ? Number(limit) : 20;
      const products = await ProductServices.getProducts(offset, plimit);
      return res.send(products);
    } catch (error) {
      ProductController.errorHandler(res, error);
    }
  }

  static async addToCart(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product: IProduct = await ProductServices.getProduct(id);
      if(Number(product.quantity) === 0) {
          throw new BadRequestException('No Item left! We ran short of this stock');
      }
      const newQuantity = Number(product.quantity) - 1;
      return res.send(await ProductServices.updateProduct(id, { quantity: newQuantity }));
    } catch (error) {
      console.log(error)
      ProductController.errorHandler(res, error);
    }
  }
}

export default ProductController;