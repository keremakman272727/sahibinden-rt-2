import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../ReduxToolkit/Slices/themeSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer
  },
})