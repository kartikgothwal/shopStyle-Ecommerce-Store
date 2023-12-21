import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCount } from "./addressAPI";

const initialState = {
  value: 0,
  pending: false,
};

export const incrementAsync = createAsyncThunk(
  "address/fetch",
  async (amount) => {
    const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value += action.payload;
      });
  },
});

export const {} = addressSlice.actions;

export default addressSlice.reducer;
