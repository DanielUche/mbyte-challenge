import { createSlice } from '@reduxjs/toolkit';

interface IProduct {

}

const productsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    getProducts(state: IProduct[], action) {
      state = [...state, action.payload ]
    },
    toggleproducts(state, action) {
      const products = state.find(products => products.id === action.payload)
      if (products) {
        products.completed = !products.completed
      }
    }
  }
})

export const { addproducts, toggleproducts } = productsSlice.actions

export default productsSlice.reducer