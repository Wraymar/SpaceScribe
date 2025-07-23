import NavBar from "../components/homepage/NavBar";
import EntryCount from "../components/recap/entryCount";
import StreakCount from "../components/recap/streakCount";
import WeekReflection from "../components/recap/weekReflection";
import "../styles/recap.css";

export default function WeeklyRecap() {
  return (
    <>
      <NavBar />
      <div className="recap-content">
        <div className="stats-grid">
          <EntryCount />
          <StreakCount />
        </div>

        {/* Weekly Reflection */}
        <WeekReflection />
      </div>
    </>
  );
}
