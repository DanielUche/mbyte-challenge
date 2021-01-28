import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

import { IProduct } from '../../types';
import { AppThunk, AppDispatch } from '../';
import { API_URL } from '../../constant';

interface InitialState {
  isLoading: boolean;
  products: IProduct[],
  error?: string
};

const initialState: InitialState = {
  isLoading: false,
  products: [],
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
    getProducts(state, action: PayloadAction<InitialState>) {
      const { isLoading, products } = action.payload;
      state.products = [...products]
      state.isLoading = isLoading;
    }
  }
});


export const { getIsLoading, getErrorLoading } = productsSlice.actions;

export const getProducts = (): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(getIsLoading());
  try {
    const products: AxiosResponse<any> = await axios.get(`${API_URL}/products`);
    dispatch(productsSlice.actions.getProducts({
      isLoading: false,
      products: products.data.docs
    }));
  } catch (err) {
    dispatch(getErrorLoading(err.response.data.message));
  }
}

export default productsSlice.reducer;