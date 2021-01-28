import {Request, Response} from 'express'

  class BaseController {
    static async errorHandler(res: Response, error: any) {
      const codes = [500];
      const { statusCode } = error;
      if (codes.includes(statusCode)) {
        return res.status(error.statusCode).send(error.message);
      }
      if (!error.statusCode) {
        return res.status(501).send(error.message);
      }
      return res.status(error.statusCode).send(error);
    }
  }
  
export default BaseController;
  