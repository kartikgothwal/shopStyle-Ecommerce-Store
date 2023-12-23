import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { attemptpayment } from "./paymentAPI";
import { toast } from "react-toastify";

const initialState = {
  paymentdata: [],
  pending: false,
};

export const attemptPaymentAsync = createAsyncThunk(
  "payment/attemptpayment",
  async (amount) => {
    try {
      const response = await attemptpayment(amount);
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

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(attemptPaymentAsync.pending, (state) => {
        state.pending = true;
      })
      .addCase(attemptPaymentAsync.fulfilled, (state, action) => {
        const { apiKeySecret, order } = action.payload;
        console.log(
          "🚀 ~ file: paymentSlice.js:37 ~ .addCase ~ apiKeySecret:",
          apiKeySecret
        );
        state.pending = false;
        var options = {
          key: apiKeySecret,
          amount: order.amount,
          currency: "INR",
          name: "Acme Corp",
          description: "Test Transaction",
          image:
            "https://avatars.githubusercontent.com/u/127651456?s=400&u=ac7f56901b779fe11e6a69b03ad8ac4d34edd692&v=4",
          order_id: order.id,
          callback_url: "http://localhost:8080/payment/api/paymentverify",
          prefill: {
            name: "Gaurav Kumar",
            email: "gaurav.kumar@example.com",
            contact: "9000090000",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };
        const razor = new window.Razorpay(options);
        razor.open();
      })
      .addCase(attemptPaymentAsync.rejected, (state, action) => {
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

export const {} = paymentSlice.actions;

export default paymentSlice.reducer;
