const mongoose = require("mongoose");
const { Schema } = mongoose;
const NewsLetterSchema = new Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
      },
      message: "Please enter a valid email address",
    },
  },
});
const NewsLetterModel = new mongoose.model("newsletter", NewsLetterSchema);
exports.NewsLetterModel = NewsLetterModel;
