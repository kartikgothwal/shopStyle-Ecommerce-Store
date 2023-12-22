// A mock function to mimic making an async request for data
import axios from "axios";
import Cookies from "js-cookie";
function getToken() {
  const refreshToken = Cookies.get("refresh-token");
  const headers = {
    Authorization: `Bearer ${refreshToken}`,
  };
  return headers;
}
export async function addAddress(item) {
  try {
    return await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/address/addaddress`,
      {
        item: item,
      },
      { headers: getToken() }
    );
  } catch (error) {
    return error.response;
  }
}
export async function getAddress(user) {
  try {
    return await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/address/getaddress`,
      user,
      { headers: getToken() }
    );
  } catch (error) {
    return error.response;
  }
}
export async function deleteAddress(addressID) {
  try {
    return await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/address/deleteaddress/${addressID}`,
      { headers: getToken() }
    );
  } catch (error) {
    return error.response;
  }
}
