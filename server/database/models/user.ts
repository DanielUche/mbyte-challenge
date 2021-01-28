import { Document, Model, model, Types, Schema, Query } from "mongoose"

export interface IUser extends Document {
    email: string;
    password: string;
  }
  
  const UserSchema: Schema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
  });
  
const User: Model<IUser> = model('User', UserSchema);


export default User;