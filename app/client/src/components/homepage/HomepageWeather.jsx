import { useState, useEffect } from "react";
import axios from "../../utils/axiosConfig";
import { getTimeOfDay, getWeatherIcon } from "../../utils/timeOfDay";

const HomeWeather = () => {
  const [weather, setWeather] = useState();
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
    const fetchWeather = async () => {
      try {
        const response = await axios.get("/api/weather");
        setWeather(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Failed to get weather");
        setWeather(null);
      }
    };

    fetchWeather();

    const refreshInterval = setInterval(fetchWeather, 30 * 60 * 1000); // every 30 minutes

    return () => clearInterval(refreshInterval);
  }, []);

  // const formatWeather = () => {
  //   // set the date to show in EST timezone
  //   let date = new Date();
  //   let timezoneOffset = date.getTimezoneOffset();
  //   let estOffset = 180; // this is the offset for the Eastern Standard Time timezone
  //   let adjustedTime = new Date(
  //     date.getTime() + (estOffset + timezoneOffset) * 60 * 1000
  //   );

  //   // display the date and time in EST timezone
  //   let options = {
  //     day: "numeric",
  //     month: "numeric",
  //     year: "numeric",
  //     hour: "numeric",
  //     minute: "numeric",
  //     second: "numeric",
  //     timeZone: "America/Los_Angeles",
  //   };

  //   let estDateTime = adjustedTime.toLocaleString("en-US", options);
  //   // console.log(estDateTime); // Output: 2/16/2022, 11:01:20 AM
  //   let splitDate = estDateTime.split(" ");

  //   return {
  //     date: splitDate[0],
  //     time: splitDate[1],
  //     TOD: splitDate[2],
  //   };
  // };

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const getTemperature = () => {
    if (!weather || !weather.current || !weather.current.temperature_2m)
      return "--°F";

    let hourlyTemp = `${Math.ceil(weather.current.temperature_2m)}°F`;
    return hourlyTemp;
  };

  return (
    <div className="glass-card weather-card">
      <div className="weather-info">
        <span className="weather-icon">{getWeatherIcon(timeOfDay)}</span>
        <div className="weather-details">
          <h3>{getTemperature()}</h3>
          <p>{formatDate(currentDate)}</p>
        </div>
      </div>
    </div>
  );
};

export default HomeWeather;
