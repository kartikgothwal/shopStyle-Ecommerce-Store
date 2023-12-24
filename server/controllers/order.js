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
          productID: item.product._id,
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
