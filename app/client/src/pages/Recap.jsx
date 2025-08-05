import { useState, useEffect, useContext } from "react";
import axios from "axios";
import NavBar from "../components/homepage/NavBar";
import EntryCount from "../components/recap/entryCount";
import StreakCount from "../components/recap/streakCount";
import WeekReflection from "../components/recap/weekReflection";
import currentUserContext from "../context/current-user-context";
import "../styles/recap.css";

export default function WeeklyRecap() {
  const { currentUser } = useContext(currentUserContext);
  const [entries, setEntries] = useState([]);
  const [streak, setStreak] = useState(0);
  const [isSunday, setIsSunday] = useState(false);
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  // Calculate current week's date range (previous Sunday to current Saturday)
  useEffect(() => {
    const today = new Date();
    const isTodaySunday = today.getDay() === 0; // 0 = Sunday
    // const isTodaySunday = true; // 0 = Sunday
    setIsSunday(isTodaySunday);

    // Calculate current week (previous Sunday to current Saturday)
    const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    // Find the most recent Sunday (start of week)
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - currentDay);

    // Find the upcoming Saturday (end of week)
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + (6 - currentDay));

    setDateRange({
      start: startDate,
      end: endDate,
    });
  }, []);

  // Fetch user entries and streak
  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) return;

      try {
        // Fetch streak
        const streakResponse = await axios.get("/api/user/getStreak");
        setStreak(streakResponse.data.streak.current);

        // Fetch entries for the current week (always show entries)
        if (dateRange.start && dateRange.end) {
          const entriesResponse = await axios.get(
            `/api/journal/entries/user/${currentUser.id}`
          );
          const allEntries = entriesResponse.data;

          // Filter entries for the current week
          const weekEntries = allEntries.filter((entry) => {
            const entryDate = new Date(entry.created_at);
            return entryDate >= dateRange.start && entryDate <= dateRange.end;
          });

          setEntries(weekEntries);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentUser, dateRange]);

  // Copy entry data to clipboard
  const copyEntryData = async () => {
    const staticPrompt = `Please analyze the following journal entries and provide insights on patterns, emotions, and personal growth. Focus on recurring themes, mood trends, and areas of progress or challenge. Offer constructive feedback and suggestions for continued personal development.`;

    let formattedData = `${staticPrompt}\n\n`;

    entries.forEach((entry) => {
      const entryDate = new Date(entry.created_at).toLocaleDateString();
      formattedData += `Entry Date: ${entryDate}\n`;
      formattedData += `Title: ${entry.title}\n`;
      formattedData += `Body: ${entry.content}\n\n`;
    });

    try {
      await navigator.clipboard.writeText(formattedData);
      alert("Entry data copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy data:", error);
      alert("Failed to copy data to clipboard");
    }
  };

  // Save entry data to database
  const saveEntryData = async () => {
    const staticPrompt = `Please analyze the following journal entries and provide insights on patterns, emotions, and personal growth. Focus on recurring themes, mood trends, and areas of progress or challenge. Offer constructive feedback and suggestions for continued personal development.`;

    let formattedData = `${staticPrompt}\n\n`;

    entries.forEach((entry) => {
      const entryDate = new Date(entry.created_at).toLocaleDateString();
      formattedData += `Entry Date: ${entryDate}\n`;
      formattedData += `Title: ${entry.title}\n`;
      formattedData += `Body: ${entry.content}\n\n`;
    });

    try {
      await axios.post("/api/ai-insights", {
        user_id: currentUser.id,
        content: formattedData,
        week_start: dateRange.start.toISOString().split("T")[0],
        week_end: dateRange.end.toISOString().split("T")[0],
      });
      alert("Entry data saved successfully!");
    } catch (error) {
      console.error("Failed to save data:", error);
      alert("Failed to save entry data");
    }
  };

  return (
    <>
      <NavBar />
      <div className="recap-content">
        <div className="stats-grid">
          <EntryCount
            onCopyData={copyEntryData}
            onSaveData={saveEntryData}
            isSunday={isSunday}
          />
          <StreakCount streak={streak} entryCount={entries.length} />
        </div>

        <WeekReflection
          entries={entries}
          isSunday={isSunday}
          dateRange={dateRange}
        />
      </div>
    </>
  );
}
