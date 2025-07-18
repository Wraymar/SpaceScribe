// Time of day utility functions
export const getTimeOfDay = () => {
  const hour = new Date().getHours();

  // Sunrise: 5:00 AM - 8:00 AM
  if (hour >= 5 && hour < 8) {
    return "sunrise";
  }
  // Daytime: 8:00 AM - 5:00 PM
  else if (hour >= 8 && hour < 17) {
    return "daytime";
  }
  // Sunset: 5:00 PM - 8:00 PM
  else if (hour >= 17 && hour < 20) {
    return "sunset";
  }
  // Night: 8:00 PM - 5:00 AM
  else {
    return "night";
  }
};

export const getBackgroundImage = (timeOfDay) => {
  switch (timeOfDay) {
    case "daytime":
      return "/src/assets/images/homepageDaytime.png";
    case "night":
      return "/src/assets/images/HomepageNight.png";
    case "sunrise":
    case "sunset":
      return "/src/assets/images/homepageSunsetSunrise.png";
    default:
      return "/src/assets/images/homepageDaytime.png";
  }
};

export const getWeatherIcon = (timeOfDay) => {
  switch (timeOfDay) {
    case "daytime":
      return "☀️";
    case "night":
      return "🌙";
    case "sunrise":
      return "🌅";
    case "sunset":
      return "🌇";
    default:
      return "☀️";
  }
};

export const getTimeOfDayLabel = (timeOfDay) => {
  switch (timeOfDay) {
    case "daytime":
      return "Day";
    case "night":
      return "Night";
    case "sunrise":
      return "Sunrise";
    case "sunset":
      return "Sunset";
    default:
      return "Day";
  }
};
