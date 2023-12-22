import { configureStore } from "@reduxjs/toolkit";
import UserAuthReducer from "../features/userAuth/UserAuthSlice";
import productReducer from "../features/products/productSlice";
import CartReducer from "../features/cart/cartSlice";
import AddressReducer from "../features/address/addressSlice";
import orderReducer from "../features/order/orderSlice";

export const store = configureStore({
  reducer: {
    user: UserAuthReducer,
    product: productReducer,
    cart: CartReducer,
    order: orderReducer,
    address: AddressReducer,
  },
});
