import { useState } from "react";
import "../../styles/SearchAndFilter.css";

function SearchAndFilter({ entries, setSelectedEntry }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEntries = entries.filter((entry) =>
    entry.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="glass-card preview-controls">
      <div className="filter-search">
        <h3>Search for an entry:</h3>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
        />
      </div>
      {filteredEntries.length === 0 ? (
        <p> No entry found </p>
      ) : (
        <ul>
          {filteredEntries.map((entry) => (
            <li key={entry.id}>
              <a onClick={() => setSelectedEntry(entry.created_at)}>
                {entry.title}
              </a>
            </li>
          ))}
        </ul>
      )}
      <div className="preview-control-btns">
        <button>Reset</button>
        <button>Edit</button>
      </div>
    </div>
  );
}

export default SearchAndFilter;
