require("dotenv").config();
const formatWeather = require("../utilities/formatWeather");

const getWeather = async (req, res) => {
  try {
    const response = await fetch(process.env.WEATHER_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // console.log(formatWeather(data));
    const formattedData = formatWeather(data);
    res.status(200).json(formattedData);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
};

module.exports = getWeather;
