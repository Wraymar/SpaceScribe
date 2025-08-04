import axios from "../utils/axiosConfig";

const fetchWeather = async () => {
  try {
    const response = await axios.get("/api/weather");
    return response.data;
  } catch (err) {
    console.error("Failed to get weather");
  }
};

export default fetchWeather;
