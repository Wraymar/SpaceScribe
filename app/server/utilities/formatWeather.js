const formatWeather = (w) => {
  return {
    current: {
      temperature: w.current.temperature_2m,
      wind_speed: w.current.wind_speed_10m,
      humidity: w.current.relative_humidity_2m,
    },
    current_units: {
      speed: w.current_units.wind_speed_10m,
      temperature: w.current_units.temperature_2m,
      humidity: w.current_units.relative_humidity_2m,
    },

    daily: {
      sunrise: w.daily.sunrise,
      sunset: w.daily.sunset,
      max_temp: w.daily.temperature_2m_max,
      min_temp: w.daily.temperature_2m_min,
    },
  };
};

module.exports = formatWeather;
