const { OrderModel } = require("../model/order");
const { tryCatch } = require("../utils/trycatch");

exports.addOrders = tryCatch(async (req, res) => {
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
});

exports.getOrders = tryCatch(async (req, res) => {
  const { orderInfo } = req.body;
  if (orderInfo._id) {
    var docs = await OrderModel.find({
      user: orderInfo.user,
      _id: orderInfo._id,
    })
      .populate("user")
      .populate("payment")
      .populate("address")
      .populate({
        path: "address",
        populate: {
          path: "user",
        },
      })
      .populate("products.productData");
  } else {
    var docs = await OrderModel.find({
      user: orderInfo.user,
    })
      .populate("user")
      .populate("payment")
      .populate("address")
      .populate({
        path: "address",
        populate: {
          path: "user",
        },
      })
      .populate("products.productData");
  }

  return res.status(200).json({
    message: "Order data fetched successfully",
    docs: docs,
  });
});
