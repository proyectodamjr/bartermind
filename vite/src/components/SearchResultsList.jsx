import "../css/SearchResultsList.css";
import { SearchResult } from "./SearchResult.jsx";

export const SearchResultsList = ({ results, usuarios, category = 0 }) => {
  var filteredResult = results;
  if (category != 0){
    filteredResult = results.filter( result => parseInt(result.categoria_id) === parseInt(category))
  }  
  return (
    <div className="results-list">
      {( parseInt(category) === 0) && usuarios.map((usuario) => (
        <SearchResult key={usuario.id} result={usuario} type="usuario" />
      ))}
      {filteredResult.map((result) => { 
        return ( 
        <SearchResult key={result.id} result={result} type="video" />
      )}
      )}
    </div>
  );
};