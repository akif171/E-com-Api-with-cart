const Product = require("../models/product");
const fs = require("fs");
const { StatusCodes } = require("http-status-codes");

//Get ALl Products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(StatusCodes.OK).json({ products });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
};

//Get Product by id
const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findOne({ _id: id });

    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `Product not found with given id : ${id}` });
    }

    res.status(StatusCodes.OK).json({ product });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
};

// Create Product
const createProduct = async (req, res) => {
  try {
    req.body.createdBy = req.user.userId;
    const { name, description, price, createdBy } = req.body;
    const imagePath = req.file.path;

    if (!name || !description || !price || !req.file) {
      return fs.unlink(imagePath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    const product = await Product.create({
      ...req.body,
      image: imagePath,
    });
    res.status(StatusCodes.CREATED).json({ product });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
};

//Update Product by id
const updateProduct = async (req, res) => {
  const { id } = req.params;
  if (req.file) {
    req.body.image = req.file.path;
  }

  try {
    const product = await Product.findOneAndUpdate(
      { _id: id, createdBy: req.user.userId },
      req.body,
      {
        new: true,
      }
    );
    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `Product not found with given id : ${id}` });
    }
    res.status(StatusCodes.CREATED).json({ product });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
};

//Delete Product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findOneAndDelete({
      _id: id,
      createdBy: req.user.userId,
    });

    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `Product not found with given id : ${id}` });
    }

    const { image } = product;

    fs.unlink(image, (err) => {
      if (err) {
        console.log(err);
      }
    });

    res.status(StatusCodes.OK).json({ product });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
