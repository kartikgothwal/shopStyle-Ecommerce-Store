import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addCartItem,
  deleteCartItem,
  getCartItem,
  updateCartItem,
} from "./cartAPI";
import { toast } from "react-toastify";

const initialState = {
  cartvalue: [],
  pending: false,
};

// export const incrementAsync = createAsyncThunk(
//   "counter/fetchCount",
//   async (amount) => {
//     const response = await fetchCount(amount);
//     return response.data;
//   }
// );
export const getCartItemAsync = createAsyncThunk(
  "cart/getitems",
  async (userID) => {
    const response = await getCartItem(userID);
    return response.data;
  }
);
export const addCartItemAsync = createAsyncThunk(
  "cart/addItem",
  async (item) => {
    const response = await addCartItem(item);
    return response.data;
  }
);
export const deleteCartItemAsync = createAsyncThunk(
  "cart/deleteitem",
  async ({ userID, productID }) => {
    const response = await deleteCartItem(userID, productID);
    return response.data;
  }
);
export const updateCartItemAsync = createAsyncThunk(
  "cart/updateitem",
  async ({ userID, productID, change }) => {
    const response = await updateCartItem(userID, productID, change);
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartItemAsync.pending, (state) => {
        state.pending = true;
      })
      .addCase(getCartItemAsync.fulfilled, (state, action) => {
        state.pending = false;
        const { doc } = action.payload;
        state.cartvalue = doc;
      })
      .addCase(getCartItemAsync.rejected, (state, action) => {
        state.pending = false;

        toast.error("failed to fetch cart", {
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
      .addCase(addCartItemAsync.pending, (state) => {
        state.pending = true;
      })
      .addCase(addCartItemAsync.fulfilled, (state, action) => {
        state.pending = false;
        toast.success("Added to the cart", {
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
      .addCase(addCartItemAsync.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message;
        toast.error("adding to the cart failed", {
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
      .addCase(deleteCartItemAsync.pending, (state) => {
        state.pending = true;
      })
      .addCase(deleteCartItemAsync.fulfilled, (state, action) => {
        state.pending = false;
        const { doc } = action.payload;
        const { userID, ProductID } = doc;
        state.cartvalue = state.cartvalue.filter((item) => {
          return item._id !== userID && item.product._id !== ProductID;
        });
      })
      .addCase(deleteCartItemAsync.rejected, (state) => {
        state.pending = false;
        toast.error("Failed to remove", {
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
      .addCase(updateCartItemAsync.pending, (state) => {
        state.pending = true;
      })
      .addCase(updateCartItemAsync.fulfilled, (state, action) => {
        const { doc } = action.payload;
        const targetIndex = state.cartvalue.findIndex(
          (item) => item?._id == doc?._id
        );
        if (targetIndex !== -1) {
          state.cartvalue.splice(targetIndex, 1, doc);
          state.cartvalue = [...state.cartvalue];
          toast(
            ` You've changed ${doc.product?.title} QUANTITY to ${doc.quantity}`,
            {
              position: "bottom-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              style: { width: "30rem", textAlign: "center" },
            }
          );
        } else {
          toast.warn("Something went Wrong, wait!!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
        state.pending = false;
      })
      .addCase(updateCartItemAsync.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message;
      });
  },
});

export const {} = cartSlice.actions;

export default cartSlice.reducer;
