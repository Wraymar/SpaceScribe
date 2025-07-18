import NavBar from "../components/homepage/NavBar";
import HomeWeather from "../components/homepage/HomeWeather";
import "../styles/homepage.css";

export default function Entries() {
  return (
    <>
      <NavBar />
      <div className="homepage-content">
        {/* Dynamic Weather Card */}
        <HomeWeather />

        {/* Entry Creation Section */}
        <div className="entry-creation-section">
          {/* Left Side - Mood Selection */}
          <div className="glass-card mood-selection">
            <h3>Which emoji suits how you feel today?</h3>
            <div className="emoji-grid">
              <button className="emoji-btn">😎</button>
              <button className="emoji-btn">😐</button>
              <button className="emoji-btn">😟</button>
              <button className="emoji-btn">😠</button>
              <button className="emoji-btn">🤩</button>
            </div>
            <div className="action-buttons">
              <span>Start Over:</span>
              <button className="btn btn-secondary btn-sm">Reset</button>
            </div>
            <button className="btn btn-primary btn-lg submit-entry">
              Submit Entry
            </button>
          </div>

          {/* Right Side - Entry Form */}
          <div className="glass-card entry-form">
            <div className="entry-header">
              <h3>Saturday 5 JUN</h3>
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-input"
                placeholder="What's on your mind today?"
              />
            </div>
            <div className="form-group">
              <textarea
                className="form-input form-textarea"
                placeholder="Share your thoughts, feelings, or experiences..."
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
