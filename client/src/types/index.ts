export interface IProduct {
  _id: number;
  name: string;
  quantity: number;
  price: number;
  description: string;
}
export interface IModalProps {
  selectedProduct: IProduct | null;
  shouldOpen: boolean
}

export interface ICartItem {
  [key: string]: number
}