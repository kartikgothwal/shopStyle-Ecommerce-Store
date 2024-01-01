import { configureStore } from "@reduxjs/toolkit";
import UserAuthReducer from "../features/userAuth/UserAuthSlice";
import productReducer from "../features/products/productSlice";
import CartReducer from "../features/cart/cartSlice";
import AddressReducer from "../features/address/addressSlice";
import orderReducer from "../features/order/orderSlice";
import PaymentReducer from "../features/payment/paymentSlice";
import WishlistReducer from "../features/wishlist/wishlistSlice";
import newsLetterReducer from "../features/newletter/newsLetterSlice";

export const store = configureStore({
  reducer: {
    user: UserAuthReducer,
    product: productReducer,
    cart: CartReducer,
    order: orderReducer,
    address: AddressReducer,
    payment: PaymentReducer,
    wishlist: WishlistReducer,
    newsletter: newsLetterReducer,
  },
});
