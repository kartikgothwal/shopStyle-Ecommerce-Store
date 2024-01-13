const { AddressModel } = require("../model/address");
const { tryCatch } = require("../utils/trycatch");
const { expertError } = require("../utils/expertError");
exports.addaddress = async (req, res) => {
  try {
    const { item } = req.body;
    const doc = await new AddressModel(item);
    await doc.save();
    return res
      .status(201)
      .json({ message: "Address has been added", doc: doc });
  } catch (error) {
    error.message = "Failed to add address";
    next(error);
  }
};
exports.getaddress = async (req, res) => {
  try {
    const { user } = req.body;
    const doc = await AddressModel.find({ user: user });
    return res.status(201).json({ message: "Address fetched", doc: doc });
  } catch (error) {
    error.message = "Failed to fetch user address";
    next(error);
  }
};
exports.deleteaddress = async (req, res) => {
  try {
    const { addressID } = req.params;
    const doc = await AddressModel.findByIdAndDelete(addressID);
    return res.status(201).json({ message: "Address removed", doc: doc });
  } catch (error) {
    error.message = "Failed to add address";
    next(error);
  }
};
