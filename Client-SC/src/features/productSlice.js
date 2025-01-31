import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch products from an API
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:3000/api/products/getAll"
      ); // Adjust your API endpoint

      return response.data.data; // Assuming the response is in JSON format
    } catch (error) {
      throw new Error("Failed to fetch products");
    }
  }
);

// Initial state
const initialState = {
  products: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {}, // No need for reducers here, since we’re using the async thunk for actions

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload; // Store fetched products
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
