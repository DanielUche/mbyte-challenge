import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

import { ICartItem, IProduct } from 'types';
import { AppThunk, AppDispatch } from '../';
import { API_URL } from 'constant';

interface InitialState {
  isLoading?: boolean;
  products: IProduct[],
  selectedProduct?: IProduct,
  error?: string
  cart: ICartItem
};

const initialState: InitialState = {
  isLoading: false,
  products: [],
  selectedProduct: undefined,
  cart: {}
};

const isLoading = (state: InitialState) => {
  state.isLoading = true
};

const isErrorLoading = (state: InitialState, action: PayloadAction<string>) => {
  state.isLoading = false
  state.error = action.payload
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getIsLoading: isLoading,
    getErrorLoading: isErrorLoading,
    getProducts(state, action: PayloadAction<IProduct[]>) {
      state.products = [...action.payload];
      state.isLoading = false;
    },
    addItemToCart(state, action: PayloadAction<string>) {
      const { payload } = action;
      const { cart } = state;
      if (cart && cart[payload]) {
        cart[payload] ++;
      } else {
        cart[payload] = 1;
      }
    },
    selectProduct(state, action: PayloadAction<IProduct>) {
      state.selectedProduct = action.payload;
    }
  }
});

export const { getIsLoading, getErrorLoading } = productsSlice.actions;

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
    await axios.get(`${API_URL}/products/add-to-cart/${cart}`);
  } catch (error) {
    
  }
  dispatch(productsSlice.actions.addItemToCart(cart));
}

export default productsSlice.reducer;