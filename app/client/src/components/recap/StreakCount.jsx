function StreakCount({ streak, entryCount }) {
  return (
    <div className="glass-card streak-stat-card">
      <div className="stat-number">
        <span className="glass-text">{streak}</span>
      </div>
      <div className="stat-label">Streak</div>

      <div className="stat-number">
        <span className="glass-text">{entryCount}</span>
      </div>
      <div className="stat-label">Total entries</div>
    </div>
  );
}

export default StreakCount;
