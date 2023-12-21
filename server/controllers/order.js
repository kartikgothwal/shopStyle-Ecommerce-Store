exports.addOrders = (req, res) => {
  try {
    console.log("hello", req.body);
  } catch {
    return res
      .status(500)
      .json({ message: "Failed to order", error: error.message });
  }
};
