import axios from "axios";

//axios.create helps to create a new instance of axios with a custom configuration
const axiosInstance = axios.create({
  withCredentials: true, //this tells Axios to send cookies
});

export default axiosInstance;
