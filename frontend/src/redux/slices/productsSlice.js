import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to Fetch products by Collection and filters
export const fetchProductsByFilters = createAsyncThunk(
  "products/fetchProductsByFilters",
  async ({
    collection,
    gender,
    size,
    color,
    minPrice,
    maxPrice,
    sortBy,
    search,
    category,
    material,
    brand,
    limit,
  }) => {
    const query = new URLSearchParams();
    if (collection) query.append("collection", collection);
    if (gender) query.append("gender", gender);
    if (size) query.append("size", size);
    if (color) query.append("color", color);
    if (minPrice) query.append("minPrice", minPrice);
    if (maxPrice) query.append("maxPrice", maxPrice);
    if (sortBy) query.append("sortBy", sortBy);
    if (search) query.append("search", search);
    if (category) query.append("category", category);
    if (material) query.append("material", material);
    if (brand) query.append("brand", brand);
    if (limit) query.append("limit", limit);

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`
    );
    return response.data;
  }
);

// Async thunk to fetch product details by ID
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
    );
    return response.data;
  }
);

// Async thunk to update product details
export const updateProductDetails = createAsyncThunk(
  "products/updateDetailsById",
  async ({ id, productData }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
    return response.data;
  }
);

// Async thunk to fetch similar products
export const fetchSimilarProducts = createAsyncThunk(
  "products/fetchSimilarProducts",
  async ({ id }) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`
    );
    return response.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    chosenProduct: null,
    similarProducts: [],
    loading: false,
    error: null,
    filters: {
      category: "",
      size: "",
      color: "",
      gender: "",
      material: "",
      brand: "",
      minPrice: "",
      maxPrice: "",
      collection: "",
      sortBy: "",
      search: "",
      limit: "",
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: "",
        size: "",
        color: "",
        gender: "",
        material: "",
        brand: "",
        minPrice: "",
        maxPrice: "",
        collection: "",
        sortBy: "",
        search: "",
        limit: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetching products by filters
      .addCase(fetchProductsByFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchProductsByFilters.rejected, (state, action) => {
        state.loading = true;
        state.error = action.error.message;
      })
      // Handle fetching product details by id
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.chosenProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = true;
        state.error = action.error.message;
      })
      // Handle fetching similar products by id
      .addCase(fetchSimilarProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.similarProducts = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.loading = true;
        state.error = action.error.message;
      })
      // Handle updating product details by id
      .addCase(updateProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const updatedProduct = action.payload;
        const index = state.products.findIndex((product) => {
          product._id === updatedProduct._id;
        });
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
      })
      .addCase(updateProductDetails.rejected, (state, action) => {
        state.loading = true;
        state.error = action.error.message;
      });
  },
});

export const { setFilters, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;
