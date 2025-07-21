import NavBar from "../components/homepage/NavBar";
import HomeWeather from "../components/homepage/HomepageWeather";
import "../styles/recap.css";

export default function WeeklyRecap() {
  return (
    <>
      <NavBar />
      <div className="recap-content">
        {/* Dynamic Weather Card */}
        {/* <HomeWeather /> */}
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="glass-card stat-card">
            <div className="stat-number">1</div>
            <div className="stat-label">Entry this week</div>
          </div>
          <div className="glass-card stat-card">
            <div className="stat-number">25</div>
            <div className="stat-label">Daily Streak!</div>
          </div>
        </div>

        {/* Weekly Reflection */}
        <div className="glass-card weekly-reflection">
          <h3>Weekly Reflection 💛</h3>
          <div className="reflection-content">
            <p>
              This week has been a journey of self-discovery and growth. Here's
              what I've learned:
            </p>
            <ul>
              <li>Consistency is key to building lasting habits</li>
              <li>Small daily actions compound into significant results</li>
              <li>Taking time to reflect helps me stay grounded</li>
              <li>Gratitude practice has improved my overall mood</li>
            </ul>
            <p>
              Looking forward to continuing this journey of mindful living and
              personal development.
            </p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </div>
        </div>
      </div>
    </>
  );
}
