const Products = require("../model/product");
const ProductModel = Products.ProductModel;
const { tryCatch } = require("../utils/trycatch");

exports.SearchProduct = tryCatch(async (req, res) => {
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
});
