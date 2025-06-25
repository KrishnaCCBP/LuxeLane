const express = require("express");
const Checkout = require("../models/Checkout");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// @route GET /api/orders/my-orders
// @desc Get logged-in user's orders
// @access Private
router.get("/my-orders", protect, async (req, res) => {
  try {
    // Find order for the authenticated user
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    }); // sort by most recent orders
    res.json(orders);
  } catch (error) {
    consolelog(error);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/orders/:id
// @desc vGet order details by ID
// @access Private
router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    console.log(order);
    // Return the full order details
    // console.log(res.json(order));
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});


module.exports = router;
