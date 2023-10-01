import { createSlice } from "@reduxjs/toolkit";

const infoSlice = createSlice({
  name: "info",
  initialState: {
    cure: null,
    expenses: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    Start: (state, action) => {
      state.isFetching = true;
    },
    addexpenses: (state, action) => {
      console.log("While adding the expeses ", action.payload);
      state.expenses.push(action.payload);
    },

    deleteexpense: (state, action) => {
      const indexToRemove = state.expenses.findIndex(
        (expense) => expense._id === action.payload
      );
      console.log(indexToRemove, " ", action.payload);
      if (indexToRemove > -1) {
        state.expenses.splice(indexToRemove, 1);
      }
    },
    updateexpense: (state, action) => {
      state.expenses = action.payload;
    },

    Success: (state, action) => {
      state.isFetching = false;
    },
    Failure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    emptyExpenses: (state, action) => {
      state.expenses = [];
    },
  },
});

export const {
  Failure,
  Start,
  addexpenses,
  deleteexpense,
  Success,
  updateexpense,

  emptyExpenses,
} = infoSlice.actions;
export default infoSlice.reducer;
