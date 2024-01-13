require("dotenv").config();
const { instance } = require("../payment/init");
const crypto = require("crypto");
const axios = require("axios");
const { tryCatch } = require("../utils/trycatch");
const { expertError } = require("../utils/expertError");
const { paymentModel } = require("../model/payment");
exports.checkOut = tryCatch(async (req, res) => {
  const { amount } = req.body;
  var options = {
    amount: Number(amount * 100),
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  const order = await instance.orders.create(options);
  const apiKeySecret = process.env.RAZOR_PAY_API_KEY;
  return res.status(200).json({ success: true, order: order, apiKeySecret });
});

exports.paymentVerification = tryCatch(async (req, res) => {
  try {
    const { response, order, orderInfo } = req.body;
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      response;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZOR_PAY_API_SECRET)
      .update(body.toString())
      .digest("hex");
    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      const paymentdata = {
        user: orderInfo.user,
        amount: Number(order.amount / 100),
        ...response,
        payment_status: "success",
      };

      const doc = await new paymentModel(paymentdata);
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        expertError(401, "Unauthorized Access");
      }
      const token = authorizationHeader.split("Bearer ")[1];
      const addOrderResponse = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/order/addorder`,
        {
          orderInfo: orderInfo,
          amount: Number(order.amount / 100),
          paymentId: doc._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (addOrderResponse.status >= 400) {
        return res.status(500).json({
          message: "Failed to order",
          error: error.message,
          success: false,
        });
      } else {
        const { orderdoc, message } = addOrderResponse.data;
        doc.order = orderdoc._id;
        await doc.save();
        return res.status(201).json({
          message: message,
          orderdoc,
          doc,
        });
      }
    } else {
      const paymentdata = {
        user: orderInfo.user,
        amount: order.amount,
        ...response,
        payment_status: "success",
      };
      const doc = await new paymentModel();
    }
  } catch (error) {
    return res.status(500).json({
      message: "Payment verification failed",
      error: error.message,
      success: false,
    });
  }
});
