import { configureStore } from '@reduxjs/toolkit';
import searchSlice from '../slices/searchSlice';
import { createEpicMiddleware, Epic } from "redux-observable";

const epiccEpicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: {
    search: searchSlice,
  },
})