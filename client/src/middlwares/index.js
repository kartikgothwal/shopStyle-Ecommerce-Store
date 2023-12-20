import { getCartItemAsync } from "../features/cart/cartSlice";

const cartMiddleware = (store) => (next) => (action) => {
  if (action.type.startsWith("cart")) {
    const userData = store.getState().user.userData;
    if (userData && userData._id) {
      store.dispatch(getCartItemAsync(userData._id));
    }
  }
  return next(action);
};

export default cartMiddleware;
