import "../css/SearchResultsList.css";
import { SearchResult } from "./SearchResult.jsx";

export const SearchResultsList = ({ results }) => {
  return (
    <div className="results-list">
      {results.map((result) => {
        return <SearchResult key={result.id} result={result} />;
      })}
    </div>
  );
};
