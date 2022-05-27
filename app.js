require("dotenv").config();
const express = require("express");
const res = require("express/lib/response");
const app = express();
const connectDb = require("./db/connectDb");
const authRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");

//middlewares
app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/cart", cartRoutes);

//error handling middleware
app.use((err, req, res, next) => {
  if (err) {
    console.log(err);
    res.json({ err });
  }
  next();
});

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    //connectDB
    await connectDb(process.env.MONGO_URI);

    app.listen(port, () => {
      console.log(`Server is listening on port: ${port}`);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
start();
