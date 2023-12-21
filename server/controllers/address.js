exports.addadress = (req, res) => {
    try {
      console.log("hello", req.body);
    } catch {
      return res
        .status(500)
        .json({ message: "Failed to add address", error: error.message });
    }
  };
  