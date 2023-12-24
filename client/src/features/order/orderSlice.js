import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOrders } from "./orderAPI";

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
      })
      .addCase(getOrdersAsync.rejected, (state, action) => {
        state.pending = false;
      });
  },
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;
