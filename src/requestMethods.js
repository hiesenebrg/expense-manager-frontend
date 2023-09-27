// import axios from "axios";

// const BASE_URL = "https://localhost:8000/api/";




// const user = JSON.parse(localStorage.getItem("persist:root"));
// const currentUser =  user && JSON.parse(user.currentUser);

// let TOKEN;
//  TOKEN= currentUser?.data?.token;
// export const publicRequest = axios.create({
//   baseURL: BASE_URL,
// });

// export const userRequest = axios.create({
//   baseURL: BASE_URL,
//   headers: { Authorization: `Bearers ${TOKEN}` },
// });


import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { Authorization: `Bearer ${TOKEN}` },
});
