import axios from "axios";
import Cookies from "js-cookie";

function getToken() {
  const refreshToken = Cookies.get("refresh-token");
  const headers = {
    // Authorization: `Bearer ${"sdkjfnjd"}`,
    Authorization: `Bearer ${refreshToken}`,
  };
  return headers;
}
export async function addCartItem(item) {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/cart/additem`,
    {
      item: item,
    },
    { headers: getToken() }
  );
}
export async function getCartItem(userID) {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/cart/getitems`,
    { userID: userID },
    { headers: getToken() }
  );
}
export async function updateCartItem(userID, productID, change) {
  return await axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}/cart/updateitem`,
    { userID: userID, productID: productID, change: change },
    { headers: getToken() }
  );
}
export async function deleteCartItem(userID, ProductID) {
  return await axios.delete(
    `${process.env.REACT_APP_BACKEND_URL}/cart/deleteitem`,
    {
      data: {
        userID: userID,
        ProductID: ProductID,
      },
    },
    { headers: getToken() }
  );
}
