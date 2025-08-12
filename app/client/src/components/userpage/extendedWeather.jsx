import { useState, useEffect } from "react";
import { getTimeOfDay, getWeatherIcon } from "../../utils/timeOfDay";
import fetchWeather from "../../adapters/fetchWeather";
import "../../styles/extendedWeather.css";

import cloudy from "../../assets/icons/cloudy.png";
import night from "../../assets/icons/quarterMoon.png";
import sunny from "../../assets/icons/sunny.png";

const ExtendedWeather = () => {
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

  // Utility function for time formatting
  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getTemperature = (weather) => {
    if (!weather || !weather.current || !weather.current.temperature)
      return "--";

    return `${Math.ceil(weather.current.temperature)}°F`;
  };

  return (
    <div className="glass-card userpage-weather-card">
      {weather ? (
        <>
          <div className="weather-div-top">
            {/* LEFT: Icon + Temp + Details */}
            <div className="top-div-left">
              <div className="icon-and-temp">
                <img src={cloudy} alt="Cloudy" className="weather-icon" />
                <span className="temperature">{getTemperature(weather)}</span>
                {/* <span className="unit">{weather.current_units.temperature}</span> */}
                {/* <span className="unit-alt">|°C</span> */}
              </div>
              <div className="weather-details">
                <p>Humidity: 92%</p>
                <p>
                  Wind: {weather.current.wind_speed}{" "}
                  {weather.current_units.speed}
                </p>
                <span>L: {Math.ceil(weather.daily.min_temp)} </span>
                <span>H: {Math.ceil(weather.daily.max_temp)} </span>
              </div>
            </div>

            {/* RIGHT: Weather Title + Time + Condition */}
            <div className="top-div-right">
              <h2 className="weather-title">Weather</h2>
              <p className="weather-time">{formatDate(currentDate)}</p>
              <p className="weather-condition">Cloudy</p>
            </div>
          </div>
          <div className="weather-div-bottom">
            <div className="bottom-div-right">
              <span> Sunrise:</span>
              <span> {formatTime(weather.daily.sunrise)}</span>
              <span> Sunset:</span>
              <span> {formatTime(weather.daily.sunset)}</span>
            </div>
          </div>
        </>
      ) : (
        //static data
        <>
          <div className="weather-div-top">
            {/* LEFT: Icon + Temp + Details */}
            <div className="top-div-left">
              <div className="icon-and-temp">
                <img src={sunny} alt="quarterMoon" className="weather-icon" />
                <span className="temperature">75</span>
                {/* <span className="unit">{weather.current_units.temperature}</span> */}
                {/* <span className="unit-alt">|°C</span> */}
              </div>
              <div className="weather-details">
                <p>Humidity: 92%</p>
                <p>Wind: 17 mph</p>
                <span>L: 68 </span>
                <span>H: 80 </span>
              </div>
            </div>

            {/* RIGHT: Weather Title + Time + Condition */}
            <div className="top-div-right">
              <h2 className="weather-title">Weather</h2>
              <p className="weather-time">Thursday Aug 7</p>
              <p className="weather-condition">Clear Skies</p>
            </div>
          </div>
          <div className="weather-div-bottom">
            <div className="bottom-div-right">
              <span> Sunrise:</span>
              <span> 5:59 am</span>
              <span> Sunset:</span>
              <span> 8:03 pm</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExtendedWeather;
