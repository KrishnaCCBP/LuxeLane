const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/user-routes.js");
const productRoutes = require("./routes/product-routes.js");
const cartRoutes = require("./routes/cart-routes.js");
const checkoutRoutes = require("./routes/checkout-routes.js");
const orderRoutes = require("./routes/order-routes.js");
const uploadRoutes = require("./routes/upload-routes.js");
const subscribeRoutes = require("./routes/subscribe-routes.js");
const adminRoutes = require("./routes/admin-routes.js");
const productsAdminRoutes = require("./routes/admin-product-routes.js");
const ordersAdminRoutes = require("./routes/admin-order-routes.js");

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();


const PORT = process.env.PORT; 


// Connect to MongoDB
connectDB();

app.get("/",(req,res)=>{
    res.send("Welcome to LuxeLane API!!");
});

// API Routes
app.use("/api/users",userRoutes);
app.use("/api/products",productRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/checkout",checkoutRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/upload",uploadRoutes);
app.use("/api/subscribe",subscribeRoutes);

// Admin API Routes
app.use("/api/admin/users",adminRoutes);
app.use("/api/admin/products",productsAdminRoutes);
app.use("/api/admin/orders",ordersAdminRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});