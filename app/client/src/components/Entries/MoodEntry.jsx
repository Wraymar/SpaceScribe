function MoodEntry({ emojis, username, mood, setMood }) {
  return (
    <>
      <h3 className="glass-text">Hi {username}!</h3>
      <p>Which emoji describes your mood?</p>
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
      <input
        type="text"
        placeholder="None fits? Type your mood..."
        className="custom-mood-input"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
      />
    </>
  );
}

export default MoodEntry;
