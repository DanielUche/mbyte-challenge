import { Application, Request, Response } from 'express'

import ProductsRoutes from './product.routes';


export default (app: Application) => {
  app.use('/products', ProductsRoutes());
  app.use('/', (_, res: Response) => {
    res.send('Ok');
  });
  return app;
}