import { useState } from "react";
import ContractItems from "./ContractItems.jsx";
import axios from "axios";

const ContractAccodion = ({ contract }) => {
  const [contractItems, setContractItems] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (QbmDocumentId) => {
    if (!QbmDocumentId) {
      alert("Este contrato não possui itens da proposta associada.");
      return;
    }

    setLoading(true);
    const body = {
      documentId: QbmDocumentId,
      cultureInfo: "pt-BR",
      timeZoneId: "E. South America Standard Time",
      userName: localStorage.getItem("qbmUsername"),
      password: localStorage.getItem("qbmPassword"),
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/getExternalContractItems`, body);
      setContractItems(response.data.Rows);
    } catch (error) {
      console.error(error);
      alert("Erro ao buscar contratos. Entre em contato com o suporte.");
      setContractItems([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="accordion mb-1" id={`accordion-${contract.Id}`}>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapse-${contract.Id}`}
            aria-expanded="false"
            aria-controls={`collapse-${contract.Id}`}>
            Contrato: {contract.QbmDocumentId} | {`${contract.CustomerBusinessEntityDescription || "N/A"}`}
            <p className="ps-1 m-0"> | {contract.DocumentStateToGrid}</p>
          </button>
        </h2>
        <div id={`collapse-${contract.Id}`} className="accordion-collapse collapse" data-bs-parent={`#accordion-${contract.Id}`}>
          <div className="accordion-body">
            <div className="row">
              <div className="col-md-6 text-start position-relative">
                <p className="mb-2">
                  <strong>Status:</strong> {`${contract.DocumentStateToGrid || "N/A"}`}{" "}
                </p>
                <p className="mb-2">
                  <strong>Cliente:</strong> {`${contract.CustomerBusinessEntityDescription || "N/A"}`}
                </p>
                <p className="mb-2">
                  <strong>CNPJ:</strong> {`${contract.CustomerBusinessEntityNationalTaxNumber || "N/A"}`}
                </p>
                <p className="mb-2">
                  <strong>Vendedor(a):</strong> {`${contract.AccountUserDescription ? contract.AccountUserDescription.split("-")[0] : "N/A"}`}
                </p>
                <div className="vr position-absolute top-0 end-0" style={{ height: "95%" }}></div>
              </div>
              <div className="col-md-6 text-start ps-4">
                <p className="mb-2">
                  <strong>CS Responsável:</strong> {`${contract.FollowUpUserDescription ? contract.FollowUpUserDescription.split("-")[0] : "N/A"}`}
                </p>
                <p className="mb-2">
                  <strong>Data de Início:</strong> {`${contract.DocumentDateToGrid || "N/A"}`}
                </p>
                <p className="mb-2">
                  <strong>Contrato:</strong> {`${contract.QbmDocumentId || "N/A"}`}
                </p>
                <p className="mb-2">
                  <strong>Proposta Associada:</strong> {`${contract.AssociatedQbmDocumentId || "N/A"}`}
                </p>
              </div>
              <div>
                <button className="btn btn-sm btn-qorange float-start" onClick={(e) => handleSearch(contract.QbmDocumentId)}>
                  Carregar Items
                </button>
              </div>
              <div className="col-md-12 text-start p-2 mt-2">
                <ContractItems contractItems={contractItems} contract={contract} loading={loading} />
              </div>
            </div>

            <hr />
            <small className="text-muted">
              Modificado por {contract.LastUpdatedUserName} em {contract.LastUpdatedDateToGrid}.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractAccodion;
