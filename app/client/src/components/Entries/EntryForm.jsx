import { useState } from "react";

function EntryForm({ title, setTitle, content, setContent, handleSubmit }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      month: "short",
      day: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options).split(" ");
    const day = formattedDate[0],
      month = formattedDate[1],
      dayNum = formattedDate[2];

    return [day, month, dayNum];
  };

  const date = formatDate(currentDate);

  return (
    <>
      <form id="entry-form" name="entry-form" onSubmit={handleSubmit}>
        <div className="date-header">
          <h3>{date[0]}</h3>
          <h3>{date[1]}</h3>
          <h3>{date[2]}</h3>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-input"
            placeholder="What's on your mind today?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <textarea
            name="content"
            className="form-input form-textarea"
            placeholder="Share your thoughts, feelings, or experiences..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </form>
    </>
  );
}

export default EntryForm;
