import axios from "axios";

export async function addWishlist(Items) {
  try {
    return await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/wishlist/additem`,
      { Items }
    );
  } catch (error) {
    return error.response;
  }
}
export async function removeWishlist(Items) {
  try {
    return await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/wishlist/additem`,
      { Items }
    );
  } catch (error) {
    return error.response;
  }
}
export async function getWishlist(userData) {
  try {
    return await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/wishlist/getitem`,
      { userData: userData }
    );
  } catch (error) {
    return error.response;
  }
}
