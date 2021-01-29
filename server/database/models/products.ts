import { PaginateModel, Document, model, Schema, SchemaTypes } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

export interface IProduct extends Document {
  name: string;
  item: string;
  quantity: number;
  price: number;
  description: string
};

interface IProductModel<T extends Document> extends PaginateModel<T> { };

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  item: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

ProductSchema.plugin(mongoosePaginate);

const Product: IProductModel<IProduct> = model<IProduct>('Product', ProductSchema) as IProductModel<IProduct>;

export default Product;