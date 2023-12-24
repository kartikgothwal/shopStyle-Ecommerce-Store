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
      orderstatus: "Booked",
      payment: paymentId,
      address: address._id,
    };
    const orderdoc = await OrderModel.create(newOrderItem);
    console.log(
      "🚀 ~ file: order.js:24 ~ exports.addOrders= ~ orderdoc:",
      orderdoc
    )
  } catch (error){
    return res
      .status(500)
      .json({ message: "Failed to order", error: error.message });
  }
};
