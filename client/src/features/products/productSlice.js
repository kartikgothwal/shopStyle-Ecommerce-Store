import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./productAPI";
const initialState = {
  productdata: [],
  pending: false,
};

export const fetchProductAsync = createAsyncThunk("product/fetch", async () => {
  const response = await fetchProducts();
  return response.data;
});

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductAsync.pending, (state) => {
        state.pending = true;
      })
      .addCase(fetchProductAsync.fulfilled, (state, action) => {
        const { message, AllProducts } = action.payload;
        state.pending = false;
        state.productdata = AllProducts;
      })
      .addCase(fetchProductAsync.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message;
      });
  },
});

export const {} = productSlice.actions;

export default productSlice.reducer;
