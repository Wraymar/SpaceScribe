function CalendarPreview({ entry, imageUrl, setSelectedEntry, setIsOpen }) {
  const openModal = () => {
    setSelectedEntry(entry ? entry : null);
    setIsOpen(true);
  };
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
      <div
        className="glass-card calender-preview preview-bg"
        // onClick={openModal}
      >
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
          backgroundImage: imageUrl
            ? `url(${imageUrl})`
            : "linear-gradient(135deg, #4545456c 0%, #ffffff66 100%)",
        }}
      >
        <div className="date-info">{`${month} ${dayNum}`}</div>
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

// <div className="glass-card calender-preview">
//   <div className="top-div">
//     <div className="preview-polaroid-container">
//       {imageUrl ? (
//         <img
//           className="polaroid-frame"
//           src="https://storage.needpix.com/rsynced_images/polaroid-2872834_1280.png"
//           alt="Polaroid frame"
//         />
//       ) : null}

//       {imageUrl && (
//         <img
//           className="polaroid-photo"
//           src={imageUrl}
//           alt="Uploaded entry"
//         />
//       )}
//     </div>
//   </div>

//   <div className="bottom-div">
//     <p>
//       {/* <strong>Title: </strong> */}
//       {entry.title}
//     </p>
//   </div>
//   <button onClick={openModal} className="btn-secondary">
//     View
//   </button>
// </div>
