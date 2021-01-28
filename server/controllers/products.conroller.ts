import { Request, Response } from 'express';

import ProductServices from '../services/products.services';
import { NotFoundException } from '../utils/exceptions';
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
}

export default ProductController;