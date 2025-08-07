import { useContext, useEffect, useMemo, useState } from "react";
import NavBar from "../components/homepage/NavBar";
import Calender from "../components/Calender/calender";
import CalendarPreview from "../components/Calender/CalenderPreview";
import PreviewModal from "../components/Calender/PopUpModal";
import axios from "axios";
import currentUserContext from "../context/current-user-context";
import "../styles/calender.css";

export default function CalenderPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [entries, setEntries] = useState([]);
  // const [previewImage, setPreviewImage] = useState(null);
  const [mediaMap, setMediaMap] = useState({});
  const { currentUser } = useContext(currentUserContext);

  //modal
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  // const selectedDateStr = selectedDate.toISOString().split("T")[0]; // 'YYYY-MM-DD'

  // //Use Memo helps to not constantly filter unnecessarily
  // //Since
  // const entriesForDate = useMemo(() => {
  //   return entries.filter((entry) =>
  //     entry.created_at.startsWith(selectedDateStr)
  //   );
  // }, [entries, selectedDateStr]);

  const selectedDateStr = selectedDate.toLocaleDateString("en-CA"); // 'YYYY-MM-DD' in local time

  const entriesForDate = useMemo(() => {
    return entries.filter((entry) => {
      const entryDateStr = new Date(entry.created_at).toLocaleDateString(
        "en-CA"
      );
      return entryDateStr === selectedDateStr;
    });
  }, [entries, selectedDateStr]);

  const fetchEntries = async () => {
    try {
      const response = await axios.get(
        `/api/journal/entries/user/${currentUser.id}`
      );
      if (response.data) {
        setEntries(response.data);
      }
    } catch (err) {
      console.log("failed to fetch entries");
    }
  };

  useEffect(() => {
    if (currentUser?.id) {
      fetchEntries();
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchAllMedia = async () => {
      const map = { ...mediaMap };
      await Promise.all(
        entriesForDate.map(async (entry) => {
          if (map[entry.id] !== undefined) return; // Already fetched or attempted
          try {
            const res = await axios.get(`/api/media/entry/${entry.id}`);
            if (res.data && res.data.cloudinary_url) {
              map[entry.id] = res.data.cloudinary_url;
            } else {
              map[entry.id] = null;
            }
          } catch {
            map[entry.id] = null;
          }
        })
      );
      setMediaMap(map);
    };

    if (entriesForDate.length > 0) {
      fetchAllMedia();
    }
  }, [entriesForDate]);

  // Guard render AFTER all hooks
  if (!currentUser || !currentUser.id) return null;

  // console.log("selectedEntry", selectedEntry);

  return (
    <>
      <NavBar />
      <div className="calender-content">
        {/* <div className="calender-controls"> */}
        <div className="polaroid-scroll-container">
          {entriesForDate.map((entry) => (
            <CalendarPreview
              key={entry.id}
              entry={entry}
              imageUrl={mediaMap[entry.id] || null}
              setSelectedEntry={setSelectedEntry}
              setIsOpen={setIsOpen}
            />
          ))}
        </div>
        {/* </div> */}
        <div className="calendar-container">
          {/* <Calender onDateSelect={setSelectedDate} /> */}
          <Calender
            onDateSelect={setSelectedDate}
            tileClassName={({ date }) => {
              const dateStr = date.toISOString().split("T")[0];
              return entries.some((entry) =>
                entry.created_at.startsWith(dateStr)
              )
                ? "has-entry"
                : "";
            }}
          />
        </div>
      </div>
      {selectedEntry && (
        <PreviewModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedEntry={selectedEntry}
          imageUrl={mediaMap[selectedEntry.id] || null}
        />
      )}
    </>
  );
}
