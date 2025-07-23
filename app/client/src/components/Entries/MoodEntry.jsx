function MoodEntry({ emojis, username, setMood }) {
  return (
    <div className="glass-card mood-selection">
      <h3>Hi {username}!</h3>
      <p>Which emoji suits how you feel today?</p>
      <div className="emoji-grid">
        {emojis.map(([icon, label]) => (
          <button
            key={label}
            className="emoji-btn"
            onClick={() => setMood(label)}
          >
            {icon}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MoodEntry;
