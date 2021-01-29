import { Router } from 'express';

import ProductController from '../controllers/products.conroller';

const router = Router();

export default () => {
  router.get('/', ProductController.getProducts);
  router.get('/add-to-Cart/:id', ProductController.addToCart);
  return router;
};