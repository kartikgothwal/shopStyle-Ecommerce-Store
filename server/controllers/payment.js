const { instance } = require("../payment/init");
exports.checkOut = async (req, res) => {
  try {
    const { amount } = req.body;
    var options = {
      amount: Number(amount * 100),
      currency: "INR",
      receipt: "order_rcptid_11",
    };
    const order = await instance.orders.create(options);
    return res.status(200).json({ success: true, order: order });
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
    console.log(req.body);
  } catch (error) {
    return res.status(500).json({
      message: "Payment verification failed",
      error: error.message,
      success: false,
    });
  }
};
