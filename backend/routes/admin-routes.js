const express = require("express");
const User = require("../models/User");
const { protect, adminCheck } = require("../middleware/authMiddleware");

const router = express.Router();

// @route GET /api/admin/users
// @desc Get all users (ADMIN-REQUEST only)
// @access Private/Admin
router.get("/", protect, adminCheck, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// @route POST /api/admin/users
// @desc Add a new user (ADMIN-REQUEST only)
// @access Private/Admin
router.post("/", protect, adminCheck, async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(404).json({ message: "User already exists" });
    }

    user = new User({
      name,
      email,
      password,
      role: role || "Customer",
    });

    await user.save();
    res.status(201).json({ message: "User created succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// @route PUT /api/admin/users/:id
// @desc Update user info (ADMIN-REQUEST only) - Name,email and role
// @access Private/Admin
router.put("/:id", protect, adminCheck, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
    }
    const updateUser = await user.save();
    res.json({ message: "User details updated succesfully", user: updateUser });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// @route DELETE /api/admin/users/:id
// @desc Delete a user (ADMIN-REQUEST only)
// @access Private/Admin
router.delete("/:id", protect, adminCheck, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.deleteOne();
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
