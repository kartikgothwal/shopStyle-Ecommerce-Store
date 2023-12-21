import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCount } from "./orderAPI";

const initialState = {
  value: 0,
  pending: false,
};

export const incrementAsync = createAsyncThunk(
  "order/fetch",
  async (amount) => {
    const response = await fetchCount(amount);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.pending = true;
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.pending = false;
        state.value += action.payload;
      });
  },
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;
