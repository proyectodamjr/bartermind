import { useState } from "react";
import { SearchBar } from "./components/SearchBar.jsx";
import { SearchResultsList } from "./components/SearchResultsList.jsx";

function App() {
  const [results, setResults] = useState({ results: [], usuarios: [] });

  return (
    <div className="App">
      <div className="search-bar-container">
        <SearchBar setResults={setResults} />
        {results && (results.results.length > 0 || results.usuarios.length > 0) && (
          <SearchResultsList results={results.results} usuarios={results.usuarios} />
        )}
      </div>
    </div>
  );
}

export default App;
