import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addCartItem, deleteCartItem, getCartItem } from "./cartAPI";
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
  async (userID, productID) => {
    console.log("deleteitem", userID, productID);
    // const response = await deleteCartItem(item);
    // return response.data;
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
        // console.log("cartvalue", state.cartvalue);
      })
      .addCase(getCartItemAsync.rejected, (state, action) => {
        state.pending = false;
        console.log("rejected", action);
        toast.error("failed to fetch cart", {
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
      .addCase(addCartItemAsync.pending, (state) => {
        state.pending = true;
      })
      .addCase(addCartItemAsync.fulfilled, (state, action) => {
        state.pending = false;
        const { items } = action.payload;
        // if (Array.isArray(items)) {
        //   items.forEach((element) => {
        //     state.cartvalue.push(element);
        //   });
        // } else {
        //   state.cartvalue.push(items);
        // }
        toast.success("Added to the cart", {
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
      .addCase(addCartItemAsync.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message;
        toast.error("adding to the cart failed", {
          position: "top-right",
          autoClose: 5000,
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

export const {} = cartSlice.actions;

export default cartSlice.reducer;
