import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true, // 🔐 this tells Axios to send cookies
});

export default axiosInstance;
