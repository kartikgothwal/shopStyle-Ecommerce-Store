require("dotenv").config();
const { instance } = require("../payment/init");
const { paymentModel } = require("../model/payment");
exports.checkOut = async (req, res) => {
  try {
    const { amount } = req.body;
    var options = {
      amount: Number(amount * 100),
      currency: "INR",
      receipt: "order_rcptid_11",
    };
    const order = await instance.orders.create(options);
    const apiKeySecret = process.env.RAZOR_PAY_API_KEY;
    return res.status(200).json({ success: true, order: order, apiKeySecret });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to redirect to payment",
      error: error.message,
      success: false,
    });
  }
};

exports.paymentVerification = async (req, res) => {
  try {
    const { paymentdata } = req.body;
    console.log("🚀 ~ file: payment.js:27 ~ exports.paymentVerification= ~ req.body:", req.body)
  
    // const doc = await paymentModel.insertOne();
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({
      message: "Payment verification failed",
      error: error.message,
      success: false,
    });
  }
};
