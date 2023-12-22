const mongoose = require("mongoose");
const { Schema } = mongoose;
const AddressSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    validate: {
      validator: function (value) {
        return /^\d{10}$/.test(value);
      },
      message: "Contact must be a 10-digit number",
    },
  },

  zipCode: {
    type: String,
    required: true,
  },
});

const AddressModel = new mongoose.model("address", AddressSchema);
exports.AddressModel = AddressModel;
