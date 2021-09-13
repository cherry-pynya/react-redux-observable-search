import { createSlice } from "@reduxjs/toolkit";
import { PENDING, SUCCESS, ERROR, URL } from "../params/params";
import { ofType } from "redux-observable";
import { of } from "rxjs";
import { ajax } from "rxjs/ajax";
import {
  map,
  filter,
  debounceTime,
  switchMap,
  catchError,
  retry,
  pipe,
  mergeMap,
} from "rxjs/operators";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    status: PENDING,
    data: [],
    inputEmpty: true,
    search: "",
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    resetData: (state) => {
      state.data = [];
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
    request: (state, action) => {
      state.inputEmpty = false;
      state.status = PENDING;
    },
    changeSearchField: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const changeEpic = (actions$) =>
  actions$.pipe(
    ofType(searchSlice.actions.changeSearchField),
    map((o) => o.payload.trim()),
    debounceTime(100),
    mergeMap((o) => {
      if (o === "") {
        return of(resetData());
      } else {
        return of(request(o));
      }
    })
  );

export const searchEpic = (action$) =>
  action$.pipe(
    ofType(searchSlice.actions.request),
    map((o) => o.payload),
    map((o) => new URLSearchParams({q: o})),
    switchMap((o) =>
      ajax.getJSON(`${URL}?${o}`).pipe(
        retry(3),
        map((o) => setData(o)),
        catchError((e) => of(statusError()))
      )
    )
  );

export const {
  setData,
  inputEmptyFalse,
  statusPending,
  statusSuccess,
  statusError,
  inputEmptyTrue,
  request,
  changeSearchField,
  resetData,
} = searchSlice.actions;

export default searchSlice.reducer;
