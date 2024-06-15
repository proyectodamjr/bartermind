import { useState } from "react";
import { FaSearch } from "react-icons/fa";

import "../css/SearchBar.css";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    fetch("/search", {
      method: "POST",
      body: JSON.stringify({ query: value }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setResults(json.results); 
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  const handleOnKeyDown = ({ key }) => {
    if (key === "Enter") {
      window.location.href = `/resultado/${input}`;
    }
  };
//onKeyDown
  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Buscar..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleOnKeyDown}
      />
    </div>
  );
};
