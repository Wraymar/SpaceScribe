import { useState, useEffect } from "react";
import { getTimeOfDay, getBackgroundImage } from "../utils/timeOfDay";
import "../styles/dynamicBackground.css";

const DynamicBackground = ({ children }) => {
  const [timeOfDay, setTimeOfDay] = useState(getTimeOfDay());
  const [backgroundImage, setBackgroundImage] = useState(
    getBackgroundImage(timeOfDay)
  );

  useEffect(() => {
    // Update time of day every minute
    const interval = setInterval(() => {
      const newTimeOfDay = getTimeOfDay();
      if (newTimeOfDay !== timeOfDay) {
        setTimeOfDay(newTimeOfDay);
        setBackgroundImage(getBackgroundImage(newTimeOfDay));
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
        // backgroundSize: "cover",
        // backgroundPosition: "center",
        // backgroundRepeat: "no-repeat",
        backdropFilter: "blur(10px)",
        minHeight: "100vh",
        transition: "background-image 1.5s ease-in-out",
      }}
    >
      {children}
    </div>
  );
};

export default DynamicBackground;
