import axios from "axios";

export const addLetter = async (userdata) => {
  try {
    return await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/newsletter/add`,
      userdata
    );
  } catch (error) {
    return error.response;
  }
};
