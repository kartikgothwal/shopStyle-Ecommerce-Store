const Products = require("../model/product");
const ProductModel = Products.ProductModel;
exports.getProducts = async (req, res) => {
  try {
    const AllProducts = await ProductModel.find();
    return res
      .status(200)
      .json({ message: "Products fetched successfully", AllProducts });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
exports.addProducts = async (req, res) => {
  try {
    let products = req.body;
    if (!Array.isArray(products)) {
      products = [products];
    }
    const result = await ProductModel.insertMany(products);
    return res
      .status(201)
      .json({ message: "Products added successfully", result });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
