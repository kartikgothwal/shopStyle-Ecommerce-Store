const { NewsLetterModel } = require("../model/newsletter");
exports.addNewLetter = (req, res) => {
  try {
    console.log("🚀 ~ file: newsletter.js:3 ~ req:", req.body);
  } catch {
    return res
      .status(500)
      .json({ message: "Failed to add to new letter", error: error.message });
  }
};
