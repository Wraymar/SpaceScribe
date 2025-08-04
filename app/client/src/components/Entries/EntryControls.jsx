function EntryControls({ handleSubmit, handleReset }) {
  return (
    <>
      <div className="action-buttons">
        <span>Start Over:</span>
        <button className="btn btn-secondary btn-sm" onClick={handleReset}>
          Reset
        </button>
      </div>
      <button
        type="button"
        className="btn btn-primary btn-md submit-entry"
        onClick={handleSubmit}
      >
        Submit Entry
      </button>
    </>
  );
}

export default EntryControls;
