function CalendarPreview({ entry, dateStr, setSelectedEntry, setIsOpen }) {
  const openModal = () => {
    setSelectedEntry(entry ? entry : null);
    setIsOpen(true);
  };

  let month = "";
  let dayNum = "";
  if (dateStr) {
    const [y, m, d] = dateStr.split("-");
    month = m;
    dayNum = d;
  }

  if (!entry) {
    return (
      <div className="glass-card calender-preview preview-bg">
        <h3>No Entry</h3>
        <p>Select a date to view journal preview.</p>
      </div>
    );
  }

  return (
    <div className="glass-card calender-preview" onClick={openModal}>
      <div
        className="top-div"
        style={{
          backgroundImage: entry.preview_img
            ? `url(${entry.preview_img})`
            : "linear-gradient(135deg, #4545456c 0%, #ffffff66 100%)",
        }}
      >
        <div className="date-info">{`${month}-${dayNum}`}</div>
      </div>
      <div className="bottom-div">
        <p>
          {/* <strong>Title: </strong> */}
          {entry.title}
        </p>
        {/* <button onClick={openModal} className="btn-primary">
          View
        </button> */}
      </div>
    </div>
  );
}

export default CalendarPreview;
