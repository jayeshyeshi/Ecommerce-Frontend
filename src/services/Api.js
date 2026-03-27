import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8081",
});

// 🔥 Add interceptor
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;