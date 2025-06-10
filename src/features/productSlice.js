import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('https://dummyjson.com/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data.products;
  }
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (product) => {
    const response = await fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error('Failed to add product');
    }
    return response.json();
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, product }) => {
    const response = await fetch(`https://dummyjson.com/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error('Failed to update product');
    }
    return response.json();
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id) => {
    const response = await fetch(`https://dummyjson.com/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
    return id;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(p => p.id !== action.payload);
      });
  },
});

export default productSlice.reducer; 