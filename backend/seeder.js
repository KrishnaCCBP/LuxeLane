const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/User");
const Cart = require("./models/Cart");
const products = require("./data/products");

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

// Function to seed Data

const seedData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    // Create a default admin user
    const createdUser = await User.create({
      name: "Admin",
      email: "admin@example.com",
      password: "123456",
      role: "Admin",
    });

    // Assign the default user ID to products
    const userId = createdUser._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: userId };
    });

    // Insert the products into database
    await Product.insertMany(sampleProducts);

    console.log("Products seeded successfully");
    process.exit();
  } catch (error) {
    console.log("Error seeding the data:", error);
    process.exit(1);
  }
};

seedData();
