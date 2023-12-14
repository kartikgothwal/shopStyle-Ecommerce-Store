import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  userLoginFunction,
  userRegistrationFunction,
  checkUserWithRefreshTokenCookie,
} from "./UserAuthAPI";
import Cookies from "js-cookie";
const initialState = {
  userData: {},
  error: "",
  pending: false,
};

export const AuthUserLogin = createAsyncThunk(
  "auth/login",
  async (userData) => {
    try {
      const response = await userLoginFunction(userData);
      if (response.status >= 400) {
        let error = response.data.message;
        throw error;
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const AuthUserRegistration = createAsyncThunk(
  "auth/register",
  async (userData) => {
    try {
      const response = await userRegistrationFunction(userData);
      if (response.status >= 400) {
        let error = response.data.message;
        throw error;
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const AuthUserCheck = createAsyncThunk(
  "auth/usercheck",
  async (UserRefreshToken) => {
    try {
      let userDataObj = { UserRefreshToken: UserRefreshToken };
      const response = await checkUserWithRefreshTokenCookie(userDataObj);

      if (response.status >= 400) {
        let error = response.data.message;
        throw error;
      }
      return response.data;
    } catch (error) {
      console.log("AuthUserCheck", error);
      throw error;
    }
  }
);

const setCookie = (cookiesData) => {
  Cookies.remove("refresh-token");
  Cookies.set("refresh-token", cookiesData, { expires: 365 });
};

export const userAuth = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AuthUserLogin.fulfilled, (state, action) => {
        console.log("fulfilledLogin", action.payload);
        const { data, message } = action.payload;
        const { _doc, RefreshToken } = data;
        setCookie(RefreshToken);
        state.userData = _doc;
        state.pending = false;
        alert(message);
      })
      .addCase(AuthUserLogin.pending, (state, action) => {
        state.pending = true;
      })
      .addCase(AuthUserLogin.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message;
        alert(action.error.message);
      })
      .addCase(AuthUserRegistration.fulfilled, (state, action) => {
        const { data, message } = action.payload;
        const { _doc, RefreshToken } = data;
        setCookie(RefreshToken);
        state.userData = _doc;
        state.pending = false;
        alert(message);
      })
      .addCase(AuthUserRegistration.pending, (state, action) => {
        state.pending = true;
      })
      .addCase(AuthUserRegistration.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message;
        alert(action.error.message);
      })
      .addCase(AuthUserCheck.fulfilled, (state, action) => {
        const { data, message } = action.payload;
        const { _doc } = data;
        state.userData = _doc;
        state.pending = false;
      })
      .addCase(AuthUserCheck.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message;
        console.log(action.error.message);
      });
  },
});

export const { resetError } = userAuth.actions;

export default userAuth.reducer;
