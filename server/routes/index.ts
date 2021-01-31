import { Application, Response, Router } from 'express';
import cors from 'cors';

import ProductsRoutes from './product.routes';

const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: '*',
  preflightContinue: false,
};
const router = Router();
router.use(cors(options));


export default (app: Application) => {
  app.use('/products', ProductsRoutes(router));
  app.use('/', (_, res: Response) => {
    res.send('Ok');
  });
  return app;
}