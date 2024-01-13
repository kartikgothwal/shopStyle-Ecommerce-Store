const Products = require("../model/product");
const ProductModel = Products.ProductModel;
const { tryCatch } = require("../utils/trycatch");
const { expertError } = require("../utils/expertError");
exports.getProducts = tryCatch(async (req, res) => {
  const { sort, filter } = req.body;
  if (req.query.page) {
    const { page, LIMIT_PER_PAGE, category } = req.query;
    let baseQuery = {
      $or: [
        { subCategory: { $regex: new RegExp(category, "i") } },
        { title: { $regex: new RegExp(category, "i") } },
        { description: { $regex: new RegExp(category, "i") } },
        { category: { $regex: new RegExp(category, "i") } },
        { details: { $regex: new RegExp(category, "i") } },
      ],
    };
    let paginationQuery = { ...baseQuery };
    let PaginationProducts;

    if (filter) {
      paginationQuery = { ...paginationQuery, ...filter };
    }

    if (paginationQuery.sizes && paginationQuery.sizes.length) {
      paginationQuery.sizes = { $in: paginationQuery.sizes };
    }

    if (sort) {
      PaginationProducts = await ProductModel.find(paginationQuery)
        .sort(sort)
        .skip((page - 1) * LIMIT_PER_PAGE)
        .limit(LIMIT_PER_PAGE);
    } else {
      PaginationProducts = await ProductModel.find(paginationQuery)
        .skip((page - 1) * LIMIT_PER_PAGE)
        .limit(LIMIT_PER_PAGE);
    }

    const TotalDocument = await ProductModel.find(
      paginationQuery
    ).countDocuments();
    const brands = await ProductModel.distinct("brand", baseQuery);

    const TotalPages = Math.ceil(TotalDocument / LIMIT_PER_PAGE);

    return res.status(200).json({
      message: "pagination Products fetched successfully",
      PaginationProducts,
      TotalPages,
      TotalDocument,
      brands,
    });
  }

  const AllProducts = await ProductModel.find();
  return res
    .status(200)
    .json({ message: "Products fetched successfully", AllProducts });
});
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
exports.getProductByID = tryCatch(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return expertError(404, "Product not found");
  }
  const doc = await ProductModel.findById(id);
  return res.status(200).json({ message: "Products found", doc });
});
