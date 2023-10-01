import { loginFailure, loginStart, loginSuccess, update } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  Failure,
  Start,
  addexpenses,
  deleteexpense,
  Success,
  updateexpense,
} from "./infoRedux";

import axios from "axios";
export const signup = async (dispatch, user) => {
  try {
    const res = await publicRequest.post("/user/sign-up", user);

    return res.data;
  } catch (err) {
    console.log("Error while signup", err);
  }
};

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/user/sign-in", user);
    dispatch(loginSuccess(res.data));
    console.log(res.data);
    return res.data;
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const updateprofile = async (dispatch, formdata, userid) => {
  dispatch(loginStart());

  try {
    const res = await axios.put(
      `http://localhost:8000/api/user/update/${userid}`,
      formdata,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );

    dispatch(update(res.data.data.user));
    // console.log(res.data.data.user);
    return res.data;
  } catch (err) {
    dispatch(Failure());
  }
};

export const addexpense = async (dispatch, info) => {
  dispatch(Start());

  try {
    const res = await userRequest.post("/todo/create", info);

    dispatch(Success());

    return res.data;
  } catch (err) {
    dispatch(Failure());
  }
};

// export const updateexpenses = async (dispatch, expense_id, info) => {
//   dispatch(Start());

//   try {
//     const id = expense_id;
    
//     console.log(res.data);
//     dispatch(updateexpense(res.data.data.todos));
   
//     dispatch(Success());
//     return res.data;
//   } catch (err) {
//     dispatch(Failure());
//   }
// };
