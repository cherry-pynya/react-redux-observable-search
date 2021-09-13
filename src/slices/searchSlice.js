import { createSlice } from "@reduxjs/toolkit";
import { PENDING, SUCCESS, ERROR, URL } from '../params/params';
import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, filter, debounceTime, switchMap, catchError } from 'rxjs/operators';

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    status: PENDING,
    data: [],
    inputEmpty: true,
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    inputEmptyTrue: (state) => {
      state.inputEmpty = true;
    },
    inputEmptyFalse: (state) => {
      state.inputEmpty = false;
    },
    statusPending: (state) => {
      state.status = PENDING;
    },
    statusSuccess: (state) => {
      state.status = SUCCESS;
    },
    statusError: (state) => {
      state.status = ERROR;
    },
  }
});

export const searchEpic = action$ => action$.pipe(
  ofType(searchSlice.actions.setData),
  map(o => o.payload.search),
  map(o => new URLSearchParams({q: o})),
  switchMap(o => ajax.getJSON(`${URL}?${o}`)),
  map(acttion => searchSlice.actions.setData(acttion.payload)),
);

export const { setData, inputEmptyFalse, statusPending, statusSuccess, statusError, inputEmptyTrue } = searchSlice.actions;

export default searchSlice.reducer;