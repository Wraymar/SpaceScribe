import { useState, useEffect } from "react";
import {
  getTimeOfDay,
  getWeatherIcon,
  getTimeOfDayLabel,
} from "../../utils/timeOfDay";

const HomeWeather = () => {
  const [timeOfDay, setTimeOfDay] = useState(getTimeOfDay());
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Update time of day and date every minute
    const interval = setInterval(() => {
      setTimeOfDay(getTimeOfDay());
      setCurrentDate(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const getTemperature = (timeOfDay) => {
    // Simulate different temperatures based on time of day
    switch (timeOfDay) {
      case "daytime":
        return "84°F";
      case "night":
        return "72°F";
      case "sunrise":
        return "68°F";
      case "sunset":
        return "78°F";
      default:
        return "75°F";
    }
  };

  return (
    <div className="glass-card weather-card">
      <div className="weather-info">
        <span className="weather-icon">{getWeatherIcon(timeOfDay)}</span>
        <div className="weather-details">
          <h3>{getTemperature(timeOfDay)}</h3>
          <p>{formatDate(currentDate)}</p>
        </div>
      </div>
    </div>
  );
};

export default HomeWeather;
