function EntryControls({ handleSubmit }) {
  return (
    <div className="glass-card action-div">
      <div className="action-buttons">
        <span>Start Over:</span>
        <button className="btn btn-secondary btn-sm">Reset</button>
      </div>
      <button
        type="button"
        className="btn btn-primary btn-lg submit-entry"
        onClick={handleSubmit}
      >
        Submit Entry
      </button>
    </div>
  );
}

export default EntryControls;
