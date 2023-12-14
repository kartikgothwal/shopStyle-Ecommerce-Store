import { configureStore } from "@reduxjs/toolkit";
import UserAuthReducer from "../features/userAuth/UserAuthSlice";
import productReducer from "../features/products/productSlice";
export const store = configureStore({
  reducer: {
    user: UserAuthReducer,
    product: productReducer,
  },
});
