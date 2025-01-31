import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../userSlice";
import productSlice from "./productSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productSlice,
  },
});
console.log(store.getState());
