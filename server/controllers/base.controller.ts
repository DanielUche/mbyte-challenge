import {Request, Response} from 'express'

  class BaseController {
    static async errorHandler(res: Response, error: any) {
      const codes = [500, 400];
      const { statusCode } = error;
      if (codes.includes(statusCode)) {
        res.status(error.statusCode);
        return res.send(error.message);
      }
      if (!error.statusCode) {
        res.status(501);
        return res.send(error.message);
      }   
      res.status(error.statusCode);
      return res.send(error);
    }
  }
  
export default BaseController;
  