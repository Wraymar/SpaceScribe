function SearchAndFilter() {
  return (
    <div className="glass-card preview-controls">
      <div className="filter-search">
        <h3>Search for an entry:</h3>
        <input
          type="text"
          id="searchInput"
          // onkeyup=""
          placeholder="Search..."
        />
        <input
          type="text"
          id="filterInput"
          // onkeyup=""
          placeholder="--Filter--"
        ></input>
      </div>
      <div className="preview-control-btns">
        <button>Reset</button>
        <button>Edit</button>
      </div>
    </div>
  );
}

export default SearchAndFilter;
