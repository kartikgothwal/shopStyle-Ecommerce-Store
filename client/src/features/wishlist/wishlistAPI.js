import axios from "axios";
import Cookies from "js-cookie";
export function getToken() {
  const refreshToken = Cookies.get("refresh-token");
  const headers = {
    Authorization: `Bearer ${refreshToken}`,
  };
  return headers;
}
export async function addWishlist(Items) {
  try {
    return await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/wishlist/additem`,
      { Items },
      { headers: getToken() }
    );
  } catch (error) {
    return error.response;
  }
}
export async function removeWishlist(product, user) {
  try {
    return await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/wishlist/deleteitem`,
      {
        data: {
          product: product,
          user: user,
        },
        headers: getToken(),
      }
    );
  } catch (error) {
    return error.response;
  }
}
export async function getWishlist(userData) {
  try {
    return await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/wishlist/getitem`,
      { userData: userData },
      { headers: getToken() }
    );
  } catch (error) {
    return error.response;
  }
}
