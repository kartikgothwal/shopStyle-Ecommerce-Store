import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addWishlist, getWishlist, removeWishlist } from "./wishlistAPI";
import { toast } from "react-toastify";

const initialState = {
  wishlistData: [],
  pending: false,
};

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
export const removeWishlistAsync = createAsyncThunk(
  "wishlist/removeitem",
  async ({ product, user }) => {
    try {
      const response = await removeWishlist(product, user);
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
export const getWishlistAsync = createAsyncThunk(
  "wishlist/getwishlist",
  async (userID) => {
    try {
      const response = await getWishlist(userID);
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
      .addCase(addWishlistAsync.pending, (state) => {
        state.pending = true;
      })
      .addCase(addWishlistAsync.fulfilled, (state, action) => {
        state.pending = false;
        const { message, doc } = action.payload;
        state.wishlistData = state.wishlistData.concat(doc);
        toast.success(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .addCase(addWishlistAsync.rejected, (state, action) => {
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
      .addCase(getWishlistAsync.pending, (state) => {
        state.pending = true;
      })
      .addCase(getWishlistAsync.fulfilled, (state, action) => {
        state.pending = false;
        const { doc } = action.payload;
        state.wishlistData = doc;
      })
      .addCase(getWishlistAsync.rejected, (state) => {
        state.pending = false;
      })
      .addCase(removeWishlistAsync.pending, (state) => {
        state.pending = true;
      })
      .addCase(removeWishlistAsync.fulfilled, (state, action) => {
        state.pending = false;
        const { doc, message } = action.payload;

        const targetIndex = state.wishlistData.findIndex(
          (items) => items._id == doc._id
        );
        if (targetIndex !== -1) {
          state.wishlistData.splice(targetIndex, 1);

          state.wishlistData = state.wishlistData;
          toast.success(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      })
      .addCase(removeWishlistAsync.rejected, (state, action) => {
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

export const {} = counterSlice.actions;

export default counterSlice.reducer;
