// export default Calender;

import { useState, useEffect } from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../styles/custom-calender.css";

function Calender({ onDateSelect }) {
  const [value, setValue] = useState(new Date());

  const handleChange = (date) => {
    setValue(date);
    onDateSelect(date); // Send selected date up
  };

  return (
    <div>
      <Calendar
        onChange={handleChange}
        value={value}
        tileClassName={({ date }) => {
          const today = new Date();
          if (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
          ) {
            return "calendar-day current-day";
          }
          return "calendar-day";
        }}
      />
    </div>
  );
}

export default Calender;
