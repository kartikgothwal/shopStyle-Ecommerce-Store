const { NewsLetterModel } = require("../model/newsletter");
exports.addNewLetter = (req, res) => {
  try {
    const { email } = req.body;
    const doc = new NewsLetterModel({ email: email });
    return res
      .status(201)
      .json({ message: "Added to the newsletter", doc: doc });
  } catch {
    return res
      .status(500)
      .json({ message: "Failed to add to new letter", error: error.message });
  }
};
