import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addLetter } from "./newsLetterAPI";
import { toast } from "react-toastify";

const initialState = {
  data: [],
  pending: false,
};

export const AddNewsletter = createAsyncThunk(
  "newletter/add",
  async (userdata) => {
    try {
      const response = await addLetter(userdata);
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

export const newsLetterSlice = createSlice({
  name: "newletter",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(AddNewsletter.pending, (state) => {
        state.pending = true;
      })
      .addCase(AddNewsletter.fulfilled, (state, action) => {
        const { message, doc } = action.payload;
        state.pending = false;
        state.data = doc;
        toast.success(message, {
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
      .addCase(AddNewsletter.rejected, (state, action) => {
        const { message } = action.error;
        state.pending = false;
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

export const {} = newsLetterSlice.actions;

export default newsLetterSlice.reducer;
