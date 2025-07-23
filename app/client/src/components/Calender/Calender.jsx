// function Calender() {
//   return (
//     <>
//       <div className="calendar-header">
//         <h3>Jul 2024</h3>
//         <div className="calendar-nav">
//           <button className="btn btn-ghost btn-icon">‹</button>
//           <button className="btn btn-ghost btn-icon">›</button>
//         </div>
//       </div>
//       <div className="calendar-grid">
//         {/* Calendar days will be populated here */}
//         <div className="calendar-day-header">Sun</div>
//         <div className="calendar-day-header">Mon</div>
//         <div className="calendar-day-header">Tue</div>
//         <div className="calendar-day-header">Wed</div>
//         <div className="calendar-day-header">Thu</div>
//         <div className="calendar-day-header">Fri</div>
//         <div className="calendar-day-header">Sat</div>

//         {/* Calendar days */}
//         <div className="calendar-day prev-month">28</div>
//         <div className="calendar-day prev-month">29</div>
//         <div className="calendar-day prev-month">30</div>
//         <div className="calendar-day prev-month">31</div>
//         <div className="calendar-day">1</div>
//         <div className="calendar-day">2</div>
//         <div className="calendar-day">3</div>
//         <div className="calendar-day">4</div>
//         <div className="calendar-day current-day">5</div>
//         <div className="calendar-day">6</div>
//         <div className="calendar-day">7</div>
//         <div className="calendar-day">8</div>
//         <div className="calendar-day">9</div>
//         <div className="calendar-day">10</div>
//         <div className="calendar-day">11</div>
//         <div className="calendar-day">12</div>
//         <div className="calendar-day">13</div>
//         <div className="calendar-day">14</div>
//         <div className="calendar-day">15</div>
//         <div className="calendar-day">16</div>
//         <div className="calendar-day">17</div>
//         <div className="calendar-day">18</div>
//         <div className="calendar-day">19</div>
//         <div className="calendar-day">20</div>
//         <div className="calendar-day">21</div>
//         <div className="calendar-day">22</div>
//         <div className="calendar-day">23</div>
//         <div className="calendar-day">24</div>
//         <div className="calendar-day">25</div>
//         <div className="calendar-day">26</div>
//         <div className="calendar-day">27</div>
//         <div className="calendar-day">28</div>
//         <div className="calendar-day">29</div>
//         <div className="calendar-day">30</div>
//         <div className="calendar-day next-month">1</div>
//         <div className="calendar-day next-month">2</div>
//         <div className="calendar-day next-month">3</div>
//         <div className="calendar-day next-month">4</div>
//         <div className="calendar-day next-month">5</div>
//         <div className="calendar-day next-month">6</div>
//       </div>
//     </>
//   );
// }

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
