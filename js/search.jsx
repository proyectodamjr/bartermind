import { useState } from "react";

import "../../css/search.css";
import { SearchBar } from "./components/SearchBar.jsx";
import { SearchResultsList } from "./components/SearchResultsList.jsx";

function App() {
  const [results, setResults] = useState([]);

  return (
    <div className="App">
      <div className="search-bar-container">
        <SearchBar setResults={setResults} />
        {results && results.length > 0 && <SearchResultsList results={results} />}
      </div>
    </div>
  );
}

export default App;