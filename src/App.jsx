import { useState } from "react";
import myFeeLogo from "/logo-laranja.png";
import Searchbar from "./components/Searchbar.jsx";
import ContractAccodion from "./components/ContractAccodion.jsx";
import ConfigSidebar from "./components/ConfigSidebar.jsx";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLogoClick = () => {
    const newCount = count + 1;
    setCount(newCount);

    if (newCount === 10) {
      window.open("https://cataas.com/cat", "_blank");
      setCount(0);
    }
  };

  const handleSearch = async () => {
    if (!search) {
      alert("Por favor, insira um termo na pesquisa.");
      return;
    }

    setLoading(true);
    const body = {
      cultureInfo: "pt-BR",
      filter: search,
      isHistory: "false",
      pageNumber: 0,
      rowsPerPage: "999",
      specialArgs: `{"Data":[{"Key":"startDate","Value":"2011/07/01"},{"Key":"finishDate","Value":"${
        new Date().toISOString().split("T")[0]
      }"},{"Key":"DocType","Value":"Contract"}]}`,
      timeZoneId: "E. South America Standard Time",
      userName: localStorage.getItem("qbmUsername"),
      password: localStorage.getItem("qbmPassword"),
    };

    try {
      const response = await axios.post("/api/quatenus10/QBMDats/Documents/Document.svc/json/GetDocuments", body);
      setContracts(response.data.d.Rows);
    } catch (error) {
      console.error(error);
      alert("Erro ao buscar contratos. Entre em contato com o suporte.");
      setContracts("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ConfigSidebar />

      <div>
        <img src={myFeeLogo} className="logo" alt="Logo do MyFee" onClick={handleLogoClick} style={{ cursor: "pointer" }} />
      </div>

      <div>
        <Searchbar search={search} setSearch={setSearch} handleSearch={handleSearch} loading={loading} />
      </div>

      <hr />

      <div>
        {loading && <p>Carregando...</p>}
        {contracts.length > 0 && (
          <div>
            <h3>Contratos encontrados ({contracts.length}):</h3>
            {contracts.map((contract) => (
              <ContractAccodion key={contract.Id} contract={contract} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
