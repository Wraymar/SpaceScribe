import { useContext, useEffect, useMemo, useState } from "react";
import NavBar from "../components/homepage/NavBar";
import Calender from "../components/Calender/Calender";
import CalendarPreview from "../components/Calender/CalenderPreview";
import PreviewModal from "../components/Calender/PopUpModal";
import axios from "axios";
import currentUserContext from "../context/current-user-context";
import "../styles/calender.css";

export default function CalenderPage() {
  const [summary, setSummary] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { currentUser } = useContext(currentUserContext);

  //CALENDAR SUMMARY
  const getSummary = async () => {
    try {
      const calendarSummary = await axios.get("/api/calendar/summary");
      setSummary(calendarSummary.data);
    } catch (err) {
      console.log("failed to get summary", err);
    }
  };

  //modal
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const selectedDateStr = selectedDate.toLocaleDateString("en-CA"); // 'YYYY-MM-DD' in local time

  useEffect(() => {
    if (currentUser?.id) {
      // fetchEntries();
      getSummary(); //calendarSummary
    }
  }, [currentUser]);

  // Guard render AFTER all hooks
  if (!currentUser || !currentUser.id) return null;

  return (
    <>
      <NavBar />
      <div className="calender-content">
        {/* <div className="calender-controls"> */}
        <div className="polaroid-scroll-container">
          {summary[selectedDateStr]?.map((entry) => (
            <CalendarPreview
              key={entry.id}
              entry={entry}
              dateStr={selectedDateStr}
              setSelectedEntry={setSelectedEntry}
              setIsOpen={setIsOpen}
            />
          ))}
        </div>
        <div className="calendar-container">
          <Calender
            onDateSelect={setSelectedDate}
            //react calendar automatically give the date of each tile, callback params have access
            tileClassName={({ date }) => {
              const dateStr = date.toISOString().split("T")[0];
              return summary[dateStr] ? "has-entry" : "";
            }}
          />
        </div>
      </div>
      {selectedEntry && (
        <PreviewModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedEntry={selectedEntry}
          imageUrl={selectedEntry.preview_img || null}
        />
      )}
    </>
  );
}
