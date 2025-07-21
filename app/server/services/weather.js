require("dotenv").config();

const getWeather = async (req, res) => {
  try {
    const response = await fetch(process.env.WEATHER_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
};

module.exports = getWeather;
