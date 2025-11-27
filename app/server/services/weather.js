//import the redis file
const redis = require("../redis/client");
require("dotenv").config();

//format the data
const formatWeather = require("../utilities/formatWeather");

const getWeather = async (req, res) => {
  try {
    const cacheKey = `weather`;
    const cached = await redis.get(cacheKey);
    if (cached) {
      console.log("Weather fetched from cache");
      return res.json(JSON.parse(cached));
    }

    const response = await fetch(process.env.WEATHER_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const formattedData = formatWeather(data);

    //cache the formatted weather
    console.log("No weather cache found, fetching from API!");
    await redis.set(cacheKey, JSON.stringify(formattedData), "EX", 60 * 30);

    res.status(200).json(formattedData);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
};

module.exports = getWeather;
