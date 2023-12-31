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
  async ({ totalAmount, orderInfo, navigate }) => {
    try {
      const response = await attemptpayment(totalAmount);
      if (response.status >= 400) {
        let error = response.data.message;
        throw error;
      }
      return { ...response.data, orderInfo, navigate };
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
        const { apiKeySecret, order, orderInfo, navigate } = action.payload;
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
          handler: function (response) {
            axios
              .post(
                `${process.env.REACT_APP_BACKEND_URL}/payment/api/paymentverify`,
                { response, order, orderInfo },
                { headers: getToken() }
              )
              .then((axiosResponse) => {
                const { message, orderdoc, doc } = axiosResponse.data;
                toast(message, {
                  position: "top-center",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
                navigate("/ordersuccessful", { state: orderdoc });
              })
              .catch((error) => {
                toast.error(error.message, {
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
        };
        state.pending = false;
        const razor = new window.Razorpay(options);
        razor.open();
        razor.on("payment.failed", function (response) {
          razor.close();
          toast.error("Payment failed, Please try again", {
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
