import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/authSlice';
import productReducer from '../features/productSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    products: productReducer,
  },
});
