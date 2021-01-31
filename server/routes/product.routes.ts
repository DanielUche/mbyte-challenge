import { Router } from 'express';
import ProductController from '../controllers/products.conroller';


const productController = new ProductController();

export default (router: Router) => {
  router.get('/', productController.getProducts);
  router.get('/add-to-Cart/:id', productController.addToCart);
  router.get('/remove-Cart-item/:id', productController.removeItemFromCart);
  return router;
};