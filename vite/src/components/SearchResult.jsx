import "../css/SearchResult.css";

export const SearchResult = ({ result, type }) => {
  const handleClick = () => {
    if (type === 'usuario') {
      window.location.href = `/perfilUsuario.html?id=${result.id}`;
    } else if (type === 'video') {
      window.location.href = `/resultado.html?id=${result.id}`;
    }
  };

  return (
    <div className="search-result" onClick={handleClick}>
      {type === 'usuario' ? result.nombre : result.titulo}
    </div>
  );
};
