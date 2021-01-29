import { combineReducers } from '@reduxjs/toolkit';


import ProductSlice from "../slices/product.slice";

const rootReducer = combineReducers({
    ProductSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

