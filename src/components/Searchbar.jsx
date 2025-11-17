const Searchbar = ({ search, setSearch, handleSearch, loading }) => {
  return (
    <div className="input-group mb-3 mt-2">
      <input
        type="search"
        className="form-control"
        placeholder="Pesquise aqui contrato ou empresa"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="btn btn-qorange" type="button" onClick={() => handleSearch()} disabled={loading}>
       Pesquisar
      </button>
    </div>
  );
};

export default Searchbar;
