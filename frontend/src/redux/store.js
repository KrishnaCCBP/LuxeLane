import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productsReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";
import checkoutReducer from "./slices/checkoutSlice";
import ordersReducer from "./slices/ordersSlice";
import adminReducer from "./slices/adminSlice";
import adminProductsReducer from "./slices/adminProductsSlice";
import adminOrdersReducer from "./slices/adminOrdersSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    orders: ordersReducer,
    admin: adminReducer,
    adminProducts: adminProductsReducer,
    adminOrders: adminOrdersReducer,
  },
});

export default store;
