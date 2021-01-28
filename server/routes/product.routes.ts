import { Router } from 'express';

import ProductController from '../controllers/products.conroller';

const router = Router();

export default () => {
  router.get('/', ProductController.getProducts);
  return router;
};