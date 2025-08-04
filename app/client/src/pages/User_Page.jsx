import NavBar from "../components/homepage/NavBar";
import MoodChart from "../components/userpage/MoodChart";
import ExtendedWeather from "../components/userpage/extendedWeather";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import currentUserContext from "../context/current-user-context";
import "../styles/userpage.css";
import { useNavigate } from "react-router-dom";

// Dummy user stats
const userData = {
  username: "johndoe",
  email: "johndoe@email.com",
  avatar:
    "https://media.designrush.com/inspiration_images/797793/conversions/Real-Madrid-desktop.jpg",
  // avatar: "/src/assets/images/image.png",
  streakCount: 7,
  journalingGoal: "5 days/week",
  totalEntries: 42,
  journalEntriesThisWeek: 3,
  daysSinceLastJournal: 2,
  mostTrackedMood: "Greatful",
  lastMonthData: false,
  // Mood breakdown for chart
  moodBreakdown: [
    { name: "Greatful", value: 8, color: "#b297e0ff" },
    { name: "Happy", value: 2, color: "#0a8956ff" },
    { name: "Angry", value: 3, color: "#a72e2eff" },
    { name: "Sad", value: 1, color: "#003f6cff" },
    { name: "Anxious", value: 1, color: "#dba41aff" },
  ],
};

export default function UserPage() {
  const { currentUser, setCurrentUser } = useContext(currentUserContext);
  const [streakData, setStreakData] = useState({ current: 0, longest: 0 });
  const [totalEntries, setTotalEntries] = useState(0);
  const navigate = useNavigate();

  console.log(currentUser);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const streakRes = await axios.get("/api/user/getStreak", {
          withCredentials: true,
        });
        setStreakData(streakRes.data.streak);

        const entriesRes = await axios.get("/api/user/entries/count", {
          withCredentials: true,
        });
        setTotalEntries(entriesRes.data.total);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    if (currentUser) fetchUserData();
  }, [currentUser]);

  //update to unsign the jwt in the backend when logging out
  const handleLogout = async () => {
    try {
      await axios.post("/api/logout", {}, { withCredentials: true });
      setCurrentUser(null);
      navigate("/"); // redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="userpage-root">
      <NavBar />
      <div className="userpage-content">
        <div className="userpage-left">
          <ExtendedWeather />
          {/*  */}
          <div className="glass-card userpage-mood-chart">
            <h3 style={{ textAlign: "center" }}>Your Mood Dashboard</h3>
            <MoodChart data={userData.moodBreakdown} />
            <div className="mood-dashboard-stats">
              <div>
                Most Tracked: <b>{userData.mostTrackedMood}</b>
              </div>
              {/* <div>
                Last Month:{" "}
                <b>{userData.lastMonthData ? "Data Available" : "No Data"}</b>
              </div> */}
            </div>
            {/* <div className="journal-reflect">
              <div>
                Journal Entries This Week:{" "}
                <b>{userData.journalEntriesThisWeek}</b>
              </div>
              <div>
                Days Since Last Journal: <b>{userData.daysSinceLastJournal}</b>
              </div>
            </div> */}
          </div>
          {/*  */}
        </div>
        <div className="glass-card userpage-right">
          <div className="user-info-card">
            <div className="user-info-header">
              <div className="user-avatar">
                <img src={userData.avatar} alt="User Avatar" />
              </div>
              <br />
              <div className="user-credentials">
                <p className="username">Username: {currentUser?.username}</p>
                <p className="email">Email: {currentUser?.email}</p>
              </div>
            </div>
            <div className="user-stats">
              <p>Streak Count: {streakData.current} days</p>
              <p>Longest Streak: {streakData.longest} days</p>
              <p>Journaling Goal: {currentUser?.goal}</p>
              <p>Total Entries: {totalEntries}</p>
            </div>
            <div className="user-controls">
              <button>Edit Info</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
