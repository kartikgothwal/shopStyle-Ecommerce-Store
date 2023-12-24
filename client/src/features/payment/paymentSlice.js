import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { attemptpayment, getToken } from "./paymentAPI";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  paymentdata: [],
  pending: false,
};

export const attemptPaymentAsync = createAsyncThunk(
  "payment/attemptpayment",
  async ({ totalAmount, orderInfo }) => {
    try {
      const response = await attemptpayment(totalAmount);
      if (response.status >= 400) {
        let error = response.data.message;
        throw error;
      }
      return { ...response.data, orderInfo };
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
        const { apiKeySecret, order, orderInfo } = action.payload;
        state.pending = false;
        var options = {
          key: apiKeySecret,
          amount: order.amount,
          currency: "INR",
          name: "Payment methods",
          description: "Test Transaction",
          image:
            "https://avatars.githubusercontent.com/u/127651456?s=400&u=ac7f56901b779fe11e6a69b03ad8ac4d34edd692&v=4",
          order_id: order.id,
          callback_url: `${process.env.REACT_APP_BACKEND_URL}/payment/api/paymentverify`,
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
          handler: async function (response) {
            await axios
              .post(
                `${process.env.REACT_APP_BACKEND_URL}/payment/api/paymentverify`,
                { response, order, orderInfo },
                { headers: getToken() }
              )
              .then((response) => {
                console.log(
                  "🚀 ~ file: paymentSlice.js:69 ~ .then ~ data:",
                  response.data
                );
                const { message, orderdoc, doc } = response.data;
                state.paymentdata.push(doc);
                state.paymentdata = state.paymentdata;
                toast(message, {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              })
              .catch((error) => {
                console.log(
                  "🚀 ~ file: paymentSlice.js:76 ~ .then ~ error:",
                  error
                );
              });
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
