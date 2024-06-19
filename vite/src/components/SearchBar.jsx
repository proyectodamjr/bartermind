import { useState } from "react";
import { FaSearch } from "react-icons/fa";

import "../css/SearchBar.css";
import SelectCategory from "./SelectCategory";

export const SearchBar = ({ setResults, handleCategory, category }) => {
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
        setResults({ results: json.results, usuarios: json.usuarios });
      });
  };
  const handleChange = (value) => {
    setInput(value);
    if (value.trim() === "") {
      setResults({ results: [], usuarios: [] });
    } else {
      fetchData(value);
    }
  };

  const handleOnKeyDown = ({ key }) => {
    if (key === "Enter") {
        window.location.href = `/resultado.html?query=${input}&category=${category}`;
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
      <SelectCategory handleCategory={handleCategory} />
    </div>
  );
};
