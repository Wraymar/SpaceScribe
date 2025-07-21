import NavBar from "../components/homepage/NavBar";
import HomeWeather from "../components/homepage/HomepageWeather.jsx";
import "../styles/homepage.css";

export default function Homepage() {
  return (
    <>
      <NavBar />
      <div className="homepage-content">
        {/* Dynamic Weather Card */}
        <HomeWeather />

        {/* Stats Grid */}
        {/* <div className="stats-grid">
          <div className="glass-card stat-card">
            <div className="stat-number">1</div>
            <div className="stat-label">Entry this week</div>
          </div>
          <div className="glass-card stat-card">
            <div className="stat-number">25</div>
            <div className="stat-label">Daily Streak!</div>
          </div>
          <div className="glass-card stat-card">
            <div className="stat-number">7</div>
            <div className="stat-label">Days Active</div>
          </div>
        </div> */}

        {/* Content Sections */}
        {/* <div className="content-section">
          <h3>Recent Activity</h3>
          <div className="grid-2">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Latest Entry</h4>
                <span className="badge badge-primary">New</span>
              </div>
              <div className="card-content">
                <p>
                  Today was an amazing day filled with productivity and
                  creativity...
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Weekly Goals</h4>
                <span className="badge badge-success">3/5</span>
              </div>
              <div className="card-content">
                <p>Making great progress on your weekly objectives!</p>
              </div>
            </div>
          </div>
        </div> */}

        {/* Quick Actions */}
        {/* <div className="content-section">
          <h3>Quick Actions</h3>
          <div className="grid-3">
            <button className="btn btn-primary btn-lg">✍️ New Entry</button>
            <button className="btn btn-secondary btn-lg">📊 View Stats</button>
            <button className="btn btn-outline btn-lg">⚙️ Settings</button>
          </div>
        </div> */}
      </div>
    </>
  );
}
