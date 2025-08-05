function StreakCount({ streak, entryCount }) {
  return (
    <div className="glass-card stat-card">
      <div className="stat-number">{streak}</div>
      <div className="stat-label">Streak</div>

      <div className="stat-number" style={{ marginTop: "20px" }}>
        {entryCount}
      </div>
      <div className="stat-label">Total entries</div>
    </div>
  );
}

export default StreakCount;
