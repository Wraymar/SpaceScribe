// import NavBar from "../components/homepage/NavBar";
// import Calender from "../components/Calender/calender";
// import CalendarPreview from "../components/Calender/CalenderPreview";
// import SearchAndFilter from "../components/Calender/SearchAndFilter";
// import "../styles/calender.css";

// export default function CalenderPage() {
//   return (
//     <>
//       <NavBar />
//       <div className="calender-content">
//         <div className="calender-controls">
//           <CalendarPreview />
//           <SearchAndFilter />
//         </div>

//         {/* Calendar Section */}
//         <div className="glass-card calendar-container">
//           <Calender />
//         </div>
//       </div>
//     </>
//   );
// }

import { useEffect, useState } from "react";
import NavBar from "../components/homepage/NavBar";
import Calender from "../components/Calender/calender";
import CalendarPreview from "../components/Calender/CalenderPreview";
import SearchAndFilter from "../components/Calender/SearchAndFilter";
import "../styles/calender.css";
import axios from "axios";

export default function CalenderPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [entries, setEntries] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    // Fetch all entries once and store locally
    axios.get("/api/journal/entries/user/2").then((res) => {
      console.log(entries);
      setEntries(res.data);
    });
  }, []);

  //searches the database for an entry that matches the given date
  const getEntryForDate = (date) => {
    const formatted = date.toISOString().split("T")[0]; // 'YYYY-MM-DD'
    return entries.find((entry) => entry.created_at.startsWith(formatted));
  };

  //preview entry is the found entry inside of the db
  const previewEntry = getEntryForDate(selectedDate);

  useEffect(() => {
    if (previewEntry) {
      // Fetch image for the selected entry
      axios
        //the media should get the journal entry id and comapre to the media.journal_entry_id
        .get(`/api/media/entry/${previewEntry.id}`)
        .then((res) => {
          if (res.data && res.data.s3_url) {
            setPreviewImage(res.data.s3_url);
          } else {
            setPreviewImage(null);
          }
        })
        .catch(() => setPreviewImage(null));
    } else {
      setPreviewImage(null);
    }
  }, [previewEntry]);

  return (
    <>
      <NavBar />
      <div className="calender-content">
        <div className="calender-controls">
          <CalendarPreview entry={previewEntry} imageUrl={previewImage} />
          <SearchAndFilter />
        </div>
        <div className="glass-card calendar-container">
          <Calender onDateSelect={setSelectedDate} />
        </div>
      </div>
    </>
  );
}
