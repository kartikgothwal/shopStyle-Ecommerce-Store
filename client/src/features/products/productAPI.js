import axios from "axios";
export async function fetchProducts() {
  return await axios.get(`${process.env.REACT_APP_BACKEND_URL}/product`);
}
