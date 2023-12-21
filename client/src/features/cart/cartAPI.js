import axios from "axios";
import Cookies from "js-cookie";

function getToken() {
  const refreshToken = Cookies.get("refresh-token");
  const headers = {
    Authorization: `Bearer ${refreshToken}`,
  };
  return headers;
}
export async function addCartItem(item) {
  try {
    return await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/cart/additem`,
      {
        item: item,
      },
      { headers: getToken() }
    );
  } catch (error) {
    return error.response;
  }
}
export async function getCartItem(userID) {
  try {
    return await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/cart/getitems`,
      { userID: userID },
      { headers: getToken() }
    );
  } catch (error) {
    return error.response;
  }
}
export async function updateCartItem(userID, productID, change) {
  try {
    return await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/cart/updateitem`,
      { userID: userID, productID: productID, change: change },
      { headers: getToken() }
    );
  } catch (error) {
    return error.response;
  }
}
export async function deleteCartItem(userID, ProductID) {
  try {
    return await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/cart/deleteitem`,
      {
        data: {
          userID: userID,
          ProductID: ProductID,
        },
        headers: getToken(),
      }
    );
  } catch (error) {
    return error.response;
  }
}
