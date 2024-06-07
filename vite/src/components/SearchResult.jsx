import "../css/SearchResult.css";

export const SearchResult = ({ result }) => {
  const handleClick = () => {
    // Redirige a la página de perfil con el id del usuario
    window.location.href = `/perfilUsuario.html?id=${result.id}`;
  };

  return (
    <div className="search-result" onClick={handleClick}>
      {result.nombre}
    </div>
  );
};
