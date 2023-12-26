import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addWishlist } from "./counterAPI";

const initialState = {
  wishlistData: [],
  pending: false,
};

// export const incrementAsync = createAsyncThunk(
//   "counter/fetchCount",
//   async (amount) => {
//     const response = await fetchCount(amount);

//     return response.data;
//   }
// );
export const addWishlistAsync = createAsyncThunk(
  "wishlist/additem",
  async (Item) => {
    try {
      const response = await addWishlist(Item);
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

export const counterSlice = createSlice({
  name: "wishlist",
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
      })
      .addCase(incrementAsync.rejected, (state) => {
        state.pending = false;
      });
  },
});

export const {} = counterSlice.actions;

export default counterSlice.reducer;
