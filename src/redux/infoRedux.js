import { createSlice } from "@reduxjs/toolkit";

const infoSlice = createSlice({
  name: "info",
  initialState: {
    cure: null,
    info: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    infoStart: (state) => {
      state.isFetching = true;
    },
    infoSuccess: (state, action) => {
      state.isFetching = false;
      state.info = action.payload;
    },
    infoFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getinfoStart: (state) => {
      state.isFetching = true;
    },
    getinfoSuccess: (state, action) => {
      state.isFetching = false;
      state.cure = action.payload;
    },
    getinfoFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  infoFailure,
  infoStart,
  infoSuccess,
  getinfoFailure,
  getinfoStart,
  getinfoSucces,
} = infoSlice.actions;
export default infoSlice.reducer;