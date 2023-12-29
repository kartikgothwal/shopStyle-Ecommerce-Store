const Products = require("../model/product");
const ProductModel = Products.ProductModel;
exports.SearchProduct = async (req, res) => {
  try {
    const { data } = req.query;
    const doc = await ProductModel.find({
      $or: [
        { title: { $regex: new RegExp(data, "i") } },
        { description: { $regex: new RegExp(data, "i") } },
        { category: { $regex: new RegExp(data, "i") } },
        { details: { $regex: new RegExp(data, "i") } },
      ],
    });
    return res.status(200).json({ message: "failed search", doc: doc });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "failed search", error: error.message });
  }
};
