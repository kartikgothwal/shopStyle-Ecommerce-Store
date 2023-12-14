require("dotenv").config();
const port = process.env.PORT || 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
async function main() {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ejahxrh.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`
  );
}

main()
  .then(() => {
    console.log("Database connection successfull");
  })
  .catch((error) => {
    console.log("Database connection failed ", { error: error.message });
  });

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});
//ROUTERS
const UserAuthRouter = require("./routes/auth");
const ProductRouter = require("./routes/product");

//Middlewares

app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use("/auth/user", UserAuthRouter.router);
app.use("/product", ProductRouter.router);

app.listen(port, () => {
  console.log(`listening to the port http://localhost:${port}`);
});

