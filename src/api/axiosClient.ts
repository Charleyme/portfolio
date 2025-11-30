import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:4000/api",
});

// 🔥 Attach token automatically for every request
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;

