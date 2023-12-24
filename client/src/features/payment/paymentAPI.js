import axios from "axios";
import Cookies from "js-cookie";

function getToken() {
  const refreshToken = Cookies.get("refresh-token");
  const headers = {
    Authorization: `Bearer ${refreshToken}`,
  };
  return headers;
}

export async function attemptpayment(amount) {
  try {
    return await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/payment/api/checkout`,
      { amount },
      { headers: getToken() }
    );
  } catch (error) {
    return error.response;
  }
}

 