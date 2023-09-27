import axios from "axios";

const BASE_URL = "https://kratin-care.onrender.com/api/";




const user = JSON.parse(localStorage.getItem("persist:root"));
const currentUser =  user && JSON.parse(user.currentUser);

let TOKEN;
 TOKEN= currentUser?.data?.token;
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearers ${TOKEN}` },
});