const Searchbar = ({ search, setSearch, setState, handleSearch, loading }) => {
  return (
    <div className="input-group mb-3 mt-2">
      <div className="me-1">
        <select className="form-select" aria-label="Estado do contrato" onChange={(e) => setState(e.target.value)}>
          <option defaultValue value="0,14,1,2,3">Todos</option>
          <option value="0">Preliminar</option>
          <option value="14">Aguardando assinatura</option>
          <option value="1">Emitido</option>
          <option value="2">Cancelado</option>
          <option value="3">Rejeitado</option>
        </select>
      </div>
      <input
        type="search"
        className="form-control"
        placeholder="Pesquise aqui o contrato ou empresa"
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
