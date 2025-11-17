import { useState } from "react";
import Proposal from "./Proposal";
import axios from "axios";

const ContractAccodion = ({ contract }) => {
  const [proposalData, setProposalData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (AssociatedQbmDocumentId) => {
    if (!AssociatedQbmDocumentId) {
      alert("Este contrato não possui uma proposta associada.");
      return;
    }

    setLoading(true);
    const body = {
      documentId: AssociatedQbmDocumentId,
      cultureInfo: "pt-BR",
      timeZoneId: "E. South America Standard Time",
      userName: localStorage.getItem("qbmUsername"),
      password: localStorage.getItem("qbmPassword"),
    };

    try {
      const response = await axios.post("/api/quatenus10/QBMDats/Documents/Document.svc/GetExternalProposalsItems", body);
      console.log(response.data.Rows);
      setProposalData(response.data.Rows);
    } catch (error) {
      console.error(error);
      alert("Erro ao buscar contratos. Entre em contato com o suporte.");
      setProposalData("");
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

                <button className="btn btn-sm btn-qorange" onClick={(e) => handleSearch(contract.AssociatedQbmDocumentId)}>
                  Carregar Proposta
                </button>
                {/* <div className="vr position-absolute top-0 end-0 h-50"></div> */}
              </div>
              <div className="col-md-6 text-start ps-4">
                <p className="mb-2">
                  <strong>CS Responsável:</strong> {`${contract.FollowUpUserDescription ? contract.FollowUpUserDescription.split("-")[0] : "N/A"}`}
                </p>
                <p className="mb-2">
                  <strong>Data:</strong> {`${contract.DocumentDateToGrid || "N/A"}`}
                </p>
                <p className="mb-2">
                  <strong>Contrato:</strong> {`${contract.QbmDocumentId || "N/A"}`}
                </p>
                <p className="mb-2">
                  <strong>Proposta Associada:</strong> {`${contract.AssociatedQbmDocumentId || "N/A"}`}
                </p>
              </div>
              <div className="col-md-12 text-start ps-4 mt-2">
                <Proposal proposal={proposalData} loading={loading} />
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
