const mongoose = require("mongoose");
const { Schema } = mongoose;
const OrderSchema = new Schema({});

const OrderModel = new mongoose.model("order", OrderSchema);
exports.OrderModel = OrderModel;
