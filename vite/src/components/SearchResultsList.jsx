import "../css/SearchResultsList.css";
import { SearchResult } from "./SearchResult.jsx";

export const SearchResultsList = ({ results, usuarios }) => {
  return (
    <div className="results-list">
      {usuarios.map((usuario) => (
        <SearchResult key={usuario.id} result={usuario} type="usuario" />
      ))}
      {results.map((result) => (
        <SearchResult key={result.id} result={result} type="video" />
      ))}
    </div>
  );
};