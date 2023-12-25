const { OrderModel } = require("../model/order");
exports.addOrders = async (req, res) => {
  try {
    const {
      amount,
      paymentId,
      orderInfo: { address, user, cartdata },
    } = req.body;
    const newOrderItem = {
      user: user,
      products: cartdata.map((item) => {
        return {
          productData: item.product._id,
          quantity: item.quantity,
          subtotal: item.product.price * item.quantity,
        };
      }),
      totalamount: amount,
      orderstatus: "order placed",
      payment: paymentId,
      address: address._id,
    };
    const orderdoc = await OrderModel.create(newOrderItem);
    return res.status(200).json({
      message: "Order Placed, Thankyou for ordering",
      orderdoc: orderdoc,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to order", error: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const { orderInfo } = req.body;
    const docs = await OrderModel.find({
      user: orderInfo.user,
      _id: orderInfo._id,
    })
      .populate("user")
      .populate("payment")
      .populate("address")
      .populate("products.productData");

    return res.status(200).json({
      message: "Order data fetched successfully",
      docs: docs,
    });
  } catch (error) {
    console.log("🚀 ~ file: order.js:49 ~ exports.getOrders= ~ error:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetched order", error: error.message });
  }
};
