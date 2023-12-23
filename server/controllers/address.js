const { AddressModel } = require("../model/address");
exports.addaddress = async (req, res) => {
  try {
    const { item } = req.body;
    const doc = await new AddressModel(item);
    await doc.save();
    return res
      .status(201)
      .json({ message: "Address has been added", doc: doc });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to add address", error: error.message });
  }
};
exports.getaddress = async (req, res) => {
  try {
    const { user } = req.body;
    const doc = await AddressModel.find({ user: user });
    return res.status(201).json({ message: "Address fetched", doc: doc });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch user address", error: error.message });
  }
};
exports.deleteaddress = async (req, res) => {
  try {
    const { addressID } = req.params;
    const doc = await AddressModel.findByIdAndDelete(addressID);
    return res.status(201).json({ message: "Address removed", doc: doc });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to add address", error: error.message });
  }
};
