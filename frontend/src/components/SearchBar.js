import { useState } from "react";
import "../styles/styles.css"; // Importing CSS

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value); // Pass search query to parent component
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for jobs..."
        value={query}
        onChange={handleChange}
      />
    </div>
  );
}
