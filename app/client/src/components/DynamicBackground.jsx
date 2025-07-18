import { useState, useEffect } from "react";
import {
  getTimeOfDay,
  getBackgroundImage,
  getWeatherIcon,
} from "../utils/timeOfDay";
import "../styles/dynamicBackground.css";

// Import background images
import daytimeBg from "../assets/images/homepageDaytime.png";
import nightBg from "../assets/images/HomepageNight.png";
import sunsetBg from "../assets/images/homepageSunsetSunrise.png";

const DynamicBackground = ({ children }) => {
  const [timeOfDay, setTimeOfDay] = useState(getTimeOfDay());
  const [backgroundImage, setBackgroundImage] = useState(() => {
    switch (timeOfDay) {
      case "daytime":
        return daytimeBg;
      case "night":
        return nightBg;
      case "sunrise":
      case "sunset":
        return sunsetBg;
      default:
        return daytimeBg;
    }
  });

  useEffect(() => {
    // Update time of day every minute
    const interval = setInterval(() => {
      const newTimeOfDay = getTimeOfDay();
      if (newTimeOfDay !== timeOfDay) {
        setTimeOfDay(newTimeOfDay);
        // Update background image based on new time
        switch (newTimeOfDay) {
          case "daytime":
            setBackgroundImage(daytimeBg);
            break;
          case "night":
            setBackgroundImage(nightBg);
            break;
          case "sunrise":
          case "sunset":
            setBackgroundImage(sunsetBg);
            break;
          default:
            setBackgroundImage(daytimeBg);
        }
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [timeOfDay]);

  return (
    <div
      className="dynamic-background"
      data-time={timeOfDay}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        transition: "background-image 1.5s ease-in-out",
      }}
    >
      {children}
    </div>
  );
};

export default DynamicBackground;
