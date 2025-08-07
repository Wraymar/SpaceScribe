// export default Calender;

import { useState, useEffect } from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../styles/custom-calender.css";

function Calender({ onDateSelect, tileClassName }) {
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
        tileClassName={tileClassName}
      />
    </div>
  );
}

export default Calender;
