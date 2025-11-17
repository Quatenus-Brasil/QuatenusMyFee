const ContractAccodion = ({ contract }) => {
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
              <div className="col-md-6 text-start">
                <p className="mb-2">
                  <strong>Status:</strong> {`${contract.DocumentStateToGrid || "N/A"}`}{" "}
                </p>
                <p className="mb-2">
                  <strong>Contrato:</strong> {`${contract.QbmDocumentId || "N/A"}`}
                </p>
                <p className="mb-2">
                  <strong>Cliente:</strong> {`${contract.CustomerBusinessEntityDescription || "N/A"}`}
                </p>
                <p className="mb-2">
                  <strong>CNPJ:</strong> {`${contract.CustomerBusinessEntityNationalTaxNumber || "N/A"}`}
                </p>
                <p className="mb-2">
                  <strong>CS Responsável</strong> {`${contract.FollowUpUserDescription ? contract.FollowUpUserDescription.split("-")[0] : "N/A"}`}
                </p>
                <p className="mb-2">
                  <strong>Data</strong> {`${contract.DocumentDateToGrid || "N/A"}`}
                </p>
              </div>
              <div className="vr m-0 p-0"></div>
              <div className="col-md-6 text-start"></div>
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
