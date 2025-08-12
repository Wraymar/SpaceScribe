import { useState, useEffect } from "react";
import { getTimeOfDay, getWeatherIcon } from "../../utils/timeOfDay";
import fetchWeather from "../../adapters/fetchWeather";

import moon from "../../assets/icons/quarterMoon.png";
import sunny from "../../assets/icons/sunny.png";

const HomeWeather = () => {
  const [weather, setWeather] = useState(null);
  const [timeOfDay, setTimeOfDay] = useState(getTimeOfDay());
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Update time of day and date every minute
    const interval = setInterval(() => {
      setTimeOfDay(getTimeOfDay());
      setCurrentDate(new Date());
    }, 60000);

    //clean up function that useEffect has
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchAndSetWeather = async () => {
      const fetchedWeather = await fetchWeather();
      console.log(fetchedWeather);
      setWeather(fetchedWeather);
    };

    fetchAndSetWeather();

    const refreshInterval = setInterval(fetchAndSetWeather, 30 * 60 * 1000); // every 30 minutes
    return () => clearInterval(refreshInterval);
  }, []);

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const getTemperature = () => {
    if (!weather || !weather.current || !weather.current.temperature)
      // return "--°F";
      return "75°F";

    return `${Math.ceil(weather.current.temperature)}°F`;
  };

  return (
    <div className="glass-card weather-card">
      <div className="weather-info">
        <span className="weather-icon">{getWeatherIcon(timeOfDay)}</span>
        <div className="weather-details">
          <h3>{getTemperature() || "77"}</h3>
          <p>{formatDate(currentDate)}</p>
        </div>
      </div>
    </div>
  );
};

export default HomeWeather;
