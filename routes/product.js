const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const uploadImage = require("../middlewares/uploadImage");
const checkAuth = require("../middlewares/checkAuth");

router.get("/", getAllProducts); 
router.post("/", [checkAuth, uploadImage.single("image")], createProduct);

router.get("/:id", getProduct);
router.patch("/:id", [checkAuth, uploadImage.single("image")], updateProduct);
router.delete("/:id", checkAuth, deleteProduct);

module.exports = router;
