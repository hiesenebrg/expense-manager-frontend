import axios from "axios";

const BASE_URL = "https://expense-manager-ezsi.onrender.com/api/";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser?.data;
const TOKEN = currentUser?.token;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
console.log(TOKEN);
export const userRequest = axios.create({
  baseURL: BASE_URL,

  headers: { Authorization: `Bearer ${TOKEN}` },
});

