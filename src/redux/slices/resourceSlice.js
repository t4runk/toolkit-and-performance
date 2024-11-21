import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial State
const initialState = {
  resources: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  currentPage: 1, // Track the current page
};

// Async Thunk for API call with pagination
export const fetchResources = createAsyncThunk('resources/fetchResources', async (page = 1) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
  return { data: response.data, page };
});

// Resource Slice
const resourceSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {
    resetResources: (state) => {
      state.resources = [];
      state.currentPage = 1;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResources.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchResources.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.resources = action.payload.data;
        state.currentPage = action.payload.page;
      })
      .addCase(fetchResources.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetResources } = resourceSlice.actions;
export default resourceSlice.reducer;
