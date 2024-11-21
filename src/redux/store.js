import { configureStore } from '@reduxjs/toolkit';
import resourceReducer from './slices/resourceSlice';

const store = configureStore({
  reducer: {
    resource: resourceReducer,
  },
});

export default store;
