function EntryCount({ onCopyData, onSaveData, isSunday }) {
  return (
    <div className="glass-card stat-card">
      {/* <div className="stat-label">Copy data</div> */}
      <button
        className="btn copy-btn"
        onClick={onCopyData}
        disabled={!isSunday}
      >
        Copy
      </button>

      {/* <div className="stat-label">Save entry data</div> */}
      <button
        className="btn save-btn"
        onClick={onSaveData}
        disabled={!isSunday}
      >
        Save
      </button>

      {!isSunday && (
        <div className="access-notice">
          <p>Reminder: Recap controls only available on Sundays</p>
        </div>
      )}
    </div>
  );
}

export default EntryCount;
