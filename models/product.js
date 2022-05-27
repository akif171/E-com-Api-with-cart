const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide product name."],
  },
  description: {
    type: String,
    required: [true, "Please provide product description."],
  },
  price: {
    type: Number,
    required: [true, "Please provide product price."],
  },
  image: {
    type: String,
    required: [true, "Please provide product image."],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide userId."],
  },
});

module.exports = mongoose.model("Product", productSchema);
