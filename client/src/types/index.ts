export interface IProduct {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  description: string;
}
export interface IModalProps {
  shouldOpen: boolean
}

export interface ICartItem {
  [key: string]: number
}

export interface IAcknowledgementResponse {
  msg: string;
  data: IProduct
}

export interface IStoreRefreshPaylaod {
  id: string;
  quantity: number;
}