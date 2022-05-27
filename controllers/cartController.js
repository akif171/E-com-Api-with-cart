const Cart = require("../models/cart");
const { StatusCodes } = require("http-status-codes");

//Get All cart items
const getAllItems = async (req, res) => {
  if (!req.user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Athurization invalid" });
  }

  try {
    const cart = await Cart.find({ createdBy: req.user.userId });

    if (!cart) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "Items Not Found" });
    }

    res.status(StatusCodes.OK).json({ count: cart.length, cart });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
};

//create cart item
const createCart = async (req, res) => {
  req.body.createdBy = req.user.userId;

  const { productId } = req.body;

  if (!req.user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Athurization invalid" });
  } else if (!productId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "all fields are required" });
  }
  try {
    const cart = await Cart.create(req.body);

    res.status(StatusCodes.CREATED).json({ cart });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
};

const deleteCart = async (req, res) => {
  const { id } = req.params;

  try {
    const cart = await Cart.findOneAndDelete({
      _id: id,
      createdBy: req.user.userId,
    });

    if (!cart) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `item not found with given id : ${id}` });
    }

    res.status(StatusCodes.OK).json({ cart });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
};

module.exports = {
  getAllItems,
  createCart,
  deleteCart,
};
