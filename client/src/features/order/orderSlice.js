import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOrders } from "./orderAPI";
import { toast } from "react-toastify";

const initialState = {
  userorders: [],
  pending: false,
};

export const getOrdersAsync = createAsyncThunk(
  "order/fetch",
  async (orderInfo) => {
    try {
      const response = await getOrders(orderInfo);
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

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersAsync.pending, (state) => {
        state.pending = true;
      })
      .addCase(getOrdersAsync.fulfilled, (state, action) => {
        state.pending = false;
        const { docs } = action.payload;
        state.userorders = docs;
      })
      .addCase(getOrdersAsync.rejected, (state, action) => {
        state.pending = false;
        state.userorders = [];
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

export const {} = orderSlice.actions;

export default orderSlice.reducer;
