const { NewsLetterModel } = require("../model/newsletter");
const { tryCatch } = require("../utils/trycatch");

exports.addNewLetter = tryCatch(async (req, res) => {
  const { email } = req.body;
  const doc = await new NewsLetterModel({ email: email });
  return res.status(201).json({ message: "Added to the newsletter", doc: doc });
});
