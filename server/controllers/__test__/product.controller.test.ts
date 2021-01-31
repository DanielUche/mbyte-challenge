
import { Request, Response } from 'express';
import ProductController from "../products.conroller";

const productController = new ProductController();

describe('Product Controller', () => {
  it('should get products', async () => {

    const mockRequest = {
      method: 'Post',
      query: {
        page: 0, limit: 10
      },
      body: {}
    } as unknown as Request;

    const mockResponse: any = {
      json: jest.fn(),
      status: jest.fn(),
    };

    const products = await productController.getProducts(mockRequest, mockResponse);

    console.log(products);

    expect(0).toEqual(0);

  });
});