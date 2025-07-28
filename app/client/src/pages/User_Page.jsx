import React from "react";
import NavBar from "../components/homepage/NavBar";
import HomeWeather from "../components/homepage/HomepageWeather";
import MoodChart from "../components/userpage/MoodChart";
import "../styles/userpage.css";

// Dummy user stats
const userData = {
  username: "johndoe",
  email: "johndoe@email.com",
  avatar: "/src/assets/images/image.png",
  streakCount: 7,
  journalingGoal: "5 days/week",
  totalEntries: 42,
  journalEntriesThisWeek: 3,
  daysSinceLastJournal: 2,
  mostTrackedMood: "Happy",
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
  return (
    <div className="userpage-root">
      <NavBar />
      <div className="userpage-content">
        <div className="userpage-left">
          <div className="glass-card userpage-weather">
            {/* <HomeWeather /> */}
            <h1>Weather Goes Here</h1>
          </div>
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
                <p className="username">Username: {userData.username}</p>
                <p className="email">Email: {userData.email}</p>
              </div>
            </div>
            <div className="user-stats">
              <p>Streak Count: {userData.streakCount} days</p>
              <p>Journaling Goal: {userData.journalingGoal}</p>
              <p>Total Entries: {userData.totalEntries}</p>
            </div>
            <div className="user-controls">
              <button>Edit Info</button>
              <button>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
