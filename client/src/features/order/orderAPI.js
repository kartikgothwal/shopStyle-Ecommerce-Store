import axios from "axios";
import Cookies from "js-cookie";
export function getToken() {
  const refreshToken = Cookies.get("refresh-token");
  const headers = {
    Authorization: `Bearer ${refreshToken}`,
  };
  return headers;
}

export async function getOrders(orderInfo) {
  try {
    return await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/order/getorders`,
      { orderInfo },
      { headers: getToken() }
    );
  } catch (error) {
    return error.response;
  }
}
