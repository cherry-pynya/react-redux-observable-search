import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import searchSlice, { searchEpic, changeEpic } from '../slices/searchSlice';
import { createEpicMiddleware, Epic } from "redux-observable";

const epiccEpicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: {
    search: searchSlice,
  },
  middleware: [
    ...getDefaultMiddleware({
      thunk: false,
    }),
    epiccEpicMiddleware,
  ]
})

epiccEpicMiddleware.run(searchEpic);
epiccEpicMiddleware.run(changeEpic);