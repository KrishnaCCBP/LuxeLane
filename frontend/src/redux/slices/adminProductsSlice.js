import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;
const USER_TOKEN = `Bearer ${localStorage.getItem("userToken")}`;

// Async thunk to fetch all admin products
export const fetchAdminProducts = createAsyncThunk(
  "admin/fetchAdminProducts",
  async () => {
    const response = await axios.get(`${API_URL}/api/admin/products`, {
      headers: { Authorization: USER_TOKEN },
    });
    return response.data;
  }
);

// Async thunk to create a new product
export const createProduct = createAsyncThunk(
  "admin/createProduct",
  async (productData) => {
    const response = await axios.post(
      `${API_URL}/api/admin/products`,
      productData,
      {
        headers: { Authorization: USER_TOKEN },
      }
    );
    return response.data;
  }
);

// Async thunk to update an existing product
export const updateProduct = createAsyncThunk(
  "admin/updateProduct",
  async ({ id, productData }) => {
    const response = await axios.put(
      `${API_URL}/api/admin/products/${id}`,
      productData,
      {
        headers: { Authorization: USER_TOKEN },
      }
    );
    return response.data;
  }
);

// Async thunk to delete user (ADMIN-REQUEST only)
export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (id) => {
    await axios.delete(`${API_URL}/api/products/${id}`, {
      headers: { Authorization: USER_TOKEN },
    });
    return id;
  }
);

const adminProductsSlice = createSlice({
  name: "adminProducts",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create product
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      // Update Product
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      // Delete product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
      });
  },
});


export default adminProductsSlice.reducer