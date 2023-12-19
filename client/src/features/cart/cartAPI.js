import axios from "axios";

export async function addCartItem(item) {
  console.log("cartAPi", item)
  return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/cart/additem`, {
    item: item,
  });
}
