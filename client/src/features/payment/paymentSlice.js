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
      console.log("🚀 ~ file: paymentSlice.js:15 ~ response:", response);
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
        state.pending = false;
        var options = {
          "key": "YOUR_KEY_ID", 
          "amount": "50000",  
          "currency": "INR",
          "name": "Acme Corp",
          "description": "Test Transaction",
          "image": "https://example.com/your_logo",
          "order_id": "order_IluGWxBm9U8zJ8",  
          "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
          "prefill": {
              "name": "Gaurav Kumar",
              "email": "gaurav.kumar@example.com",
              "contact": "9000090000"
          },
          "notes": {
              "address": "Razorpay Corporate Office"
          },
          "theme": {
              "color": "#3399cc"
          }
      };
      var rzp1 = new Razorpay(options);
      document.getElementById('rzp-button1').onclick = function(e){
          rzp1.open();
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
