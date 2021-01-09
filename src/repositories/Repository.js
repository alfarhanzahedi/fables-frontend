import axios from "axios";

const baseURL = "https://captainpool.co/api/";

let axiosInstance = axios.create({
  baseURL
});

axiosInstance.interceptors.request.use(
  async function(config) {
    const token = await localStorage.getItem("authToken");
    if (token) config.headers.Authorization = `Token ${token}`;
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);


export default axiosInstance;
