import { loginFailure, loginStart, loginSuccess, update } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import { infoFailure, infoStart, infoSuccess } from "./infoRedux";
import axios from "axios";
export const signup = async (dispatch, user) => {
  try {
    const res = await publicRequest.post("/user/sign-up", user);

    return res.data;
  } catch (err) {
    console.log("Error while signup" , err);
  }
};

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/user/sign-in", user);
    dispatch(loginSuccess(res.data));

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

    dispatch(update(res.data));
    console.log(res.data);
    return res.data;
  } catch (err) {
    dispatch(infoFailure());
  }
};

export const info = async (dispatch, info) => {
  dispatch(infoStart());

  try {
    const res = await userRequest.post("/user/info/create", info);
    console.log(res);
    dispatch(infoSuccess(res.data));
    console.log(res.data);
    return res.data;
  } catch (err) {
    dispatch(infoFailure());
  }
};

export const getinfo = async (dispatch, userid) => {
  dispatch(infoStart());

  try {
    const res = await userRequest.post("/user/info/getinfo", { userid });

    dispatch(infoSuccess(res.data));
    return res.data;
  } catch (err) {
    dispatch(infoFailure());
  }
};

export const getcure = async (dispatch, prompt) => {
  dispatch(infoStart());

  try {
    const res = await userRequest.post("/getdata/prompt", prompt);

    dispatch(infoSuccess(res.data));
    return res.data;
  } catch (err) {
    dispatch(infoFailure());
  }
};