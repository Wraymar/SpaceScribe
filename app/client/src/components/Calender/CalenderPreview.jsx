// function CalendarPreview() {
//   return (
//     <div className="glass-card calender-preview preview-bg">
//       <h3>Jul 5</h3>
//       <p>Title: About Today!</p>
//       <p>
//         Body: today was so amazing, I finally got the opportunity to go run..
//       </p>
//     </div>
//   );
// }

// export default CalendarPreview;

function CalendarPreview({ entry, imageUrl }) {
  if (!entry) {
    return (
      <div className="glass-card calender-preview preview-bg">
        <h3>No Entry</h3>
        <p>Select a date to view journal preview.</p>
      </div>
    );
  }

  return (
    <div
      className="glass-card calender-preview preview-bg"
      style={{
        backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h3>{new Date(entry.created_at).toDateString()}</h3>
      <p>
        <strong>Title:</strong> {entry.title}
      </p>
      <p>
        <strong>Body:</strong> {entry.body.slice(0, 100)}...
      </p>
    </div>
  );
}

export default CalendarPreview;
