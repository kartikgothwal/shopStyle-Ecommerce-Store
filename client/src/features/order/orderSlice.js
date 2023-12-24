import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOrders } from "./orderAPI";

const initialState = {
  value: 0,
  pending: false,
};

// export const incrementAsync = createAsyncThunk(
//   "order/fetch",
//   async (amount) => {
//     const response = await fetchCount(amount);
//     return response.data;
//   }
// );
export const getOrdersAsync = createAsyncThunk(
  "order/fetch",
  async (amount) => {
    try {
      const response = await getOrders(amount);
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

  extraReducers: (builder) => {},
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;
