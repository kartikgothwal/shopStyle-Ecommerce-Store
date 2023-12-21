import axios from "axios";
export async function userLoginFunction(userData) {
  try {
    return await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/auth/user/login`,
      userData
    );
  } catch (error) {
    return error.response;
  }
}

export async function userRegistrationFunction(userData) {
  try {
    return await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/auth/user/register`,
      userData
    );
  } catch (error) {
    return error.response;
  }
}

export async function checkUserWithRefreshTokenCookie(UserRefreshToken) {
  try {
    return await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/auth/user/authuser`,
      UserRefreshToken
    );
  } catch (error) {
    return error.response;
  }
}
