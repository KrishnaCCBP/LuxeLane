const express = require("express");
const Product = require("../models/Product");
const { protect, adminCheck } = require("../middleware/authMiddleware");

const router = express.Router();

// @route GET /api/admin/products
// @desc Get all products (ADMIN-REQUEST only)
// @access Private/Admin
router.get("/", protect, adminCheck, async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
