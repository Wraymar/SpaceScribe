function WeekReflection({ entries, isSunday, dateRange }) {
  const formatDateRange = () => {
    if (!dateRange.start || !dateRange.end) return "";

    const startDate = new Date(dateRange.start);
    const endDate = new Date(dateRange.end);

    const startStr = startDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
    const endStr = endDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    console.log("StartStr: ", startStr, "EndStr ", endStr);
    console.log(startStr - endStr);

    return `${startStr} - ${endStr}`;
  };

  return (
    <div className="glass-card weekly-reflection">
      <h3>Welcome to weekly recap</h3>
      <div className="reflection-content">
        <p>
          {isSunday
            ? "Here is a list of your entries this week. To get an insight recap of what you wrote, click copy entry data, paste it into an AI model. For best results, do not edit the text."
            : "Here is a list of your entries for the current week. Weekly recap functionality (copy/save entry data) is only available on Sundays."}
        </p>

        {dateRange.start && dateRange.end && (
          <div className="date-range">{formatDateRange()}</div>
        )}

        <div className="entries-container">
          {entries.length > 0 ? (
            <div className="entries-scroll">
              {entries.map((entry) => (
                <div key={entry.id} className="entry-card">
                  <div
                    className="entry-background"
                    style={{
                      backgroundImage: entry.image_url
                        ? `url(${entry.image_url})`
                        : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    }}
                  >
                    <div className="date-badge">
                      {new Date(entry.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div className="blur-section">
                      <div className="entry-title">{entry.title}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-entries">
              {isSunday
                ? "No entries found for this week."
                : "No entries found for the current week."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WeekReflection;
