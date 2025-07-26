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
    { name: "Happy", value: 8, color: "#B9A1E3" },
    { name: "Stressed", value: 2, color: "#F7C59F" },
    { name: "Relaxed", value: 3, color: "#A3D9C9" },
    { name: "Anxious", value: 1, color: "#F49FB6" },
    { name: "Lonely", value: 1, color: "#B0B0B0" },
  ],
};

export default function UserPage() {
  return (
    <div className="userpage-root">
      <NavBar />
      <div className="userpage-content">
        <div className="userpage-left">
          <div className="userpage-weather">{/* <HomeWeather /> */}</div>
          <div className="userpage-mood-chart">
            <h3 style={{ textAlign: "center" }}>Your Mood Dashboard</h3>
            <MoodChart data={userData.moodBreakdown} />
            <div className="mood-dashboard-stats">
              <div>
                Most Tracked: <b>{userData.mostTrackedMood}</b>
              </div>
              <div>
                Last Month:{" "}
                <b>{userData.lastMonthData ? "Data Available" : "No Data"}</b>
              </div>
            </div>
            <div className="journal-reflect">
              <div>
                Journal Entries This Week:{" "}
                <b>{userData.journalEntriesThisWeek}</b>
              </div>
              <div>
                Days Since Last Journal: <b>{userData.daysSinceLastJournal}</b>
              </div>
            </div>
          </div>
        </div>
        <div className="userpage-right">
          <div className="user-info-card">
            <div className="user-info-header">
              <div className="user-avatar">
                <img src={userData.avatar} alt="User Avatar" />
              </div>
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
          </div>
        </div>
      </div>
    </div>
  );
}
