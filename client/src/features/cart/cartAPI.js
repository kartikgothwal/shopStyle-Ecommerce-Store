import axios from "axios";

export async function addCartItem(item) {
  return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/cart/additem`, {
    item: item,
  });
}
export async function getCartItem(userID) {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/cart/getitems`,
    { userID: userID }
  );
}
