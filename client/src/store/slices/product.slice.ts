import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

import { IAcknowledgementResponse, ICartItem, IProduct } from 'types';
import { AppThunk, AppDispatch } from '../';
import webSocket from "utils/socket-client";
import { API_URL } from 'constant';

interface InitialState {
  isLoading?: boolean
  isCartLoading?: boolean
  products: IProduct[]
  selectedProduct?: IProduct
  error?: string
  cart: ICartItem
};

const initialState: InitialState = {
  isLoading: false,
  isCartLoading: false,
  products: [],
  selectedProduct: undefined,
  cart: {}
};

const isLoading = (state: InitialState) => {
  state.isLoading = true
};

const isCartLoading = (state: InitialState) => {
  state.isCartLoading = true
};

const clearCartLoading = (state: InitialState) => {
  state.isCartLoading = false;
};

const isErrorLoading = (state: InitialState, action: PayloadAction<string>) => {
  state.isLoading = false
  state.error = action.payload
};

const updateCartItems = (product: IProduct | any, products: IProduct[], cart: ICartItem, payload: string) => {
  const productIndex = products.findIndex((product) => product._id === payload);
  if (cart && cart[payload]) {
    cart[payload]++;
  } else {
    cart[payload] = 1;
  }
  const newSelectedItem: IProduct = {
    ...product,
  };
  newSelectedItem.quantity--;

  const newProducts = [...products.slice(0,
    productIndex), Object.assign({}, newSelectedItem,
      ...products.slice(productIndex + 1))]

  return { newProducts, newSelectedItem }
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getIsLoading: isLoading,
    getErrorLoading: isErrorLoading,
    getCartLoading: isCartLoading,
    getClearCartLoading: clearCartLoading,
    getProducts(state, action: PayloadAction<IProduct[]>) {
      state.products = [...action.payload];
      state.isLoading = false;
    },
    addItemToCart(state, action: PayloadAction<string>) {
      const { payload } = action;
      const { cart, products, selectedProduct } = state;
      const { newProducts, newSelectedItem } = updateCartItems(selectedProduct, products, cart, payload);
      state.products = [...newProducts];
      state.selectedProduct = newSelectedItem;
      state.isCartLoading = false;
      state.error = '';
    },
    refreshCartOnAdd(state, action: PayloadAction<string>) {
      const { payload } = action;
      const { products } = state;
      const productIndex = products.findIndex((product) => product._id === payload);
      products[productIndex].quantity--;
      state.products = [...products];
    },
    refreshCartOnRemove(state, action: PayloadAction<string>) {
      const { payload } = action;
      const { products } = state;
      const productIndex = products.findIndex((product) => product._id === payload);
      products[productIndex].quantity++;
      state.products = [...products];
    },
    removeItemFromCart(state, action: PayloadAction<string>) {
      const { payload } = action;
      const { cart, products } = state;
      const productIndex = state.products.findIndex((product) => product._id === payload);
      if (cart && cart[payload]) {
        cart[payload]--;
        const newSelectedItem: any = {
          ...state.selectedProduct,
        };
        newSelectedItem.quantity++;
        const newProducts = [...products.slice(0,
          productIndex), Object.assign({}, newSelectedItem,
            ...products.slice(productIndex + 1))]
        state.products = [...newProducts];
        state.selectedProduct = newSelectedItem;
        state.isCartLoading = false;
        state.error = '';
      }
    },
    selectProduct(state, action: PayloadAction<IProduct>) {
      state.selectedProduct = action.payload;
    }
  }
});

export const {
  getIsLoading, getCartLoading,
  getErrorLoading, getClearCartLoading,
  refreshCartOnAdd, refreshCartOnRemove
} = productsSlice.actions;

export const getProducts = (): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(getIsLoading());
  try {
    const products: AxiosResponse<any> = await axios.get(`${API_URL}/products`);
    dispatch(productsSlice.actions.getProducts(products.data.docs));
  } catch (err) {
    dispatch(getErrorLoading(err.response.data.message));
  }
}

export const selectProduct = (product: IProduct): AppThunk => (dispatch: AppDispatch) => {
  dispatch(productsSlice.actions.selectProduct(product));
}

export const addCartToStore = (cart: string): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(getCartLoading());
    await axios.get(`${API_URL}/products/add-to-cart/${cart}`);
    dispatch(productsSlice.actions.addItemToCart(cart));
  } catch (err) {
    dispatch(getErrorLoading(err.response.data));
  }
}

export const removeCartItemFromStore = (cart: string): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(getCartLoading());
    await axios.get(`${API_URL}/products/remove-Cart-item/${cart}`);
    dispatch(productsSlice.actions.removeItemFromCart(cart));
  } catch (err) {
    dispatch(getErrorLoading(err.response.data));
  }
}

export const updateCartOnAcknolodgement = (data: IAcknowledgementResponse): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(productsSlice.actions.refreshCartOnAdd(data.id));
  } catch (err) {
    dispatch(getErrorLoading(err.response.data));
  }
}

export const updateCartOnRemove = (data: IAcknowledgementResponse): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(productsSlice.actions.refreshCartOnRemove(data.id));
  } catch (err) {
    dispatch(getErrorLoading(err.response.data));
  }
}

export default productsSlice.reducer;