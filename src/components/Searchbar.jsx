import { useContext } from "react";
import axios from "axios";

const Searchbar = () => {
  return (
    <div className="input-group mb-3 mt-2">
      <input type="search" className="form-control" placeholder="Pesquise aqui contrato ou empresa" />
      <button className="btn btn-qorange" type="button">
        Pesquisar
      </button>
    </div>
  );
};

export default Searchbar;
