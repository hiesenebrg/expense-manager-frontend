import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;

      state.currentUser = action.payload;
      console.log(action.payload);
      // state.currentUser = action.payload.data.user;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    update: (state, action) => {
      const data = action.payload;
      const user = data.data.user;
      state.currentUser.data.user.email = user.email;
      state.currentUser.data.user.name = user.name;
      state.currentUser.data.user.password = user.password;
      if (user.avatar) {
        state.currentUser.data.user.avatar = user.avatar;
      }
    },
    logout: (state) => {
      state.currentUser = null;
      // state.info = null;
      state.isFetching = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, update } =
  userSlice.actions;
export default userSlice.reducer;