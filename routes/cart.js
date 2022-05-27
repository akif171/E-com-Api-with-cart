const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");
const {
  getAllItems,
  createCart,
  deleteCart,
} = require("../controllers/cartController");

//Get All cart items by user id
router.get("/", checkAuth, getAllItems);

//create cart
router.post("/", checkAuth, createCart);

//delete cart
router.delete("/:id", checkAuth, deleteCart);

module.exports = router;
