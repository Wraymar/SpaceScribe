function CalendarPreview({ entry, imageUrl }) {
  //check to see if you received the dateStr first
  const dateStr = entry?.created_at
    ? new Date(entry.created_at).toDateString().split(" ")
    : [];
  const [day, month, dayNum, year] = dateStr.length
    ? dateStr
    : ["", "", "", ""];
  // const dateArr = dateStr.split(" ");
  // const [day, month, dayNum, year] = dateArr;
  // console.log(typeof new Date(entry.created_at).toDateString());

  if (!entry) {
    return (
      <div className="glass-card calender-preview preview-bg">
        <h3>No Entry</h3>
        <p>Select a date to view journal preview.</p>
      </div>
    );
  }

  return (
    <div className="glass-card calender-preview">
      <div className="top-div">
        <div className="preview-polaroid-container">
          <img
            className="polaroid-frame"
            src="https://storage.needpix.com/rsynced_images/polaroid-2872834_1280.png"
            alt="Polaroid frame"
          />
          {imageUrl && (
            <img
              className="polaroid-photo"
              src={imageUrl}
              alt="Uploaded entry"
            />
          )}
        </div>

        <div className="preview-date">
          <h3>{day}</h3>
          <p>{`${month}, ${dayNum}`}</p>
          <p>{year}</p>
        </div>
      </div>

      <div className="bottom-div">
        <p>
          <strong>Title: </strong>
          {entry.title}
        </p>
      </div>
    </div>
  );
}

export default CalendarPreview;
