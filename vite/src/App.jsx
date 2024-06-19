import { useState } from "react";
import { SearchBar } from "./components/SearchBar.jsx";
import { SearchResultsList } from "./components/SearchResultsList.jsx";

function App() {
  const [results, setResults] = useState({ results: [], usuarios: [] });
  const [category, setCategory] = useState(0);
 const handleCategory = (category) => {
    setCategory(category)
 }
  return (
    <div className="App">
      <div className="search-bar-container">
        <SearchBar setResults={setResults} handleCategory={ handleCategory} category={category} />
        {results && (results.results.length > 0 || results.usuarios.length > 0) && (
          <SearchResultsList results={results.results} usuarios={results.usuarios} category={category} />
        )}
      </div>
    </div>
  );
}

export default App;
