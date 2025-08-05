function EntryCount({ onCopyData, onSaveData, isSunday }) {
  return (
    <div className="glass-card stat-card">
      <div className="stat-label">Copy the entry data</div>
      <button
        className="recap-btn copy-btn"
        onClick={onCopyData}
        disabled={!isSunday}
      >
        Copy
      </button>

      <div className="stat-label" style={{ marginTop: "20px" }}>
        Save entry data
      </div>
      <button
        className="recap-btn save-btn"
        onClick={onSaveData}
        disabled={!isSunday}
      >
        Save
      </button>

      {!isSunday && (
        <div className="access-notice">
          <p>Recap available on Sundays only</p>
        </div>
      )}
    </div>
  );
}

export default EntryCount;
