
import mongoose from 'mongoose';
import { Request, Response } from 'express';
import ProductController from "../products.conroller";

const productController = new ProductController();

describe('Product Controller', () => {
  let responseObject: any = {};
  const req : Partial<Request> = {
    query: {
      limit: '1', page: '1'
    },
    params:{
      id: '6015bf8e8318ad452f11b751'
    }
  };
  const res: Partial<Response> = {
    send: jest.fn().mockImplementation((result) => {
      responseObject = result;
    }),
    status: jest.fn().mockImplementation((result) => {
      responseObject = result;
    })
  };

  beforeAll(async () => {
    const url = `${process.env.DB_URL}`
    await mongoose.connect(url, { useNewUrlParser: true });
  });

  it('should get products', async () => {
    await productController.getProducts(req as Request, res as Response);
    expect(responseObject).toHaveProperty('docs');
    expect(responseObject.docs).toEqual(expect.any(Array));
  });

  it('should add Item to cart', async () => {
    await productController.addToCart(req as Request, res as Response);
    expect(responseObject).toHaveProperty('name');
    expect(responseObject).toEqual(expect.any(Object));
  });

  it('should remove item from cart', async () => {
    await productController.removeItemFromCart(req as Request, res as Response);
    expect(responseObject).toHaveProperty('name');
    expect(responseObject).toEqual(expect.any(Object));
  });

  it('Should prevent user from updating product it if is lessthan 0', async () => {
    req!.params!.id = '60170ee1382a89420394e752';
    await productController.addToCart(req as Request, res as Response);
    expect(responseObject).toEqual('No Item left! We ran short of this stock');
  });

  it('should throw error on invalid product ID passed', async () => {
    req!.params!.id = 'InvalidID';
    await productController.addToCart(req as Request, res as Response);
    expect(responseObject).toHaveProperty('message');
    expect(responseObject.message).toEqual('Product not found');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  })
});