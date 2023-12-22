import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addAddress, getAddress } from "./addressAPI";
import { toast } from "react-toastify";
const initialState = {
  useraddress: [],
  pending: false,
};

// export const incrementAsync = createAsyncThunk(
//   "address/fetch",
//   async (amount) => {
//     const response = await fetchCount(amount);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );
export const getAddressAsync = createAsyncThunk(
  "address/getaddress",
  async (userID) => {
    try {
      const response = await getAddress(userID);
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
export const addAddressAsync = createAsyncThunk("address/add", async (item) => {
  try {
    const response = await addAddress(item);
    if (response.status >= 400) {
      let error = response.data.message;
      throw error;
    }
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addAddressAsync.pending, (state) => {
        state.pending = true;
      })
      .addCase(addAddressAsync.fulfilled, (state, action) => {
        state.pending = false;
        const { doc, message } = action.payload;
        state.useraddress.push(doc);
        toast.success(message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .addCase(addAddressAsync.rejected, (state, action) => {
        state.pending = false;
        const { message } = action.error;
        toast.error(message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .addCase(getAddressAsync.pending, (state) => {
        state.pending = true;
      })
      .addCase(getAddressAsync.fulfilled, (state, action) => {
        state.pending = false;
        const { doc, message } = action.payload;
        state.useraddress = doc;
        toast.success(message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .addCase(getAddressAsync.rejected, (state, action) => {
        state.pending = false;
        const { message } = action.error;
        toast.error(message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  },
});

export const {} = addressSlice.actions;

export default addressSlice.reducer;
