import { useState, useEffect } from "react";

const ContractItems = ({ contractItems, contract, loading }) => {
  const [selectedContractItems, setSelectedContractItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [fidelity, setFidelity] = useState(0);
  const [monthsLeft, setMonthsLeft] = useState(0);

  const getFidelity = (contractItems) => {
    if (!contractItems || contractItems.length === 0) return 0;

    if (selectedContractItems.length === 0) return 0;

    for (const item of contractItems) {
      const description = item.QbmItemDescription || "";
      const match = description.match(/(\d+)\s*meses?/i);
      if (match) {
        const months = parseInt(match[1]);

        if ([12, 24, 36, 48, 60].includes(months)) {
          return months;
        }
      }
    }
    return 0;
  };

  const getMonthsLeft = (fidelity, contractDate) => {
    if (fidelity === 0) return 0;

    const contractStartDate = new Date(contractDate.split(" ")[0].split("/").reverse().join("-"));
    const contractEndDate = new Date(contractStartDate.getFullYear(), contractStartDate.getMonth() + fidelity, contractStartDate.getDate());
    const currentDate = new Date();
    const monthsDifference = (contractEndDate.getFullYear() - currentDate.getFullYear()) * 12 + (contractEndDate.getMonth() - currentDate.getMonth());

    return monthsDifference > 0 ? monthsDifference : 0;
  };

  useEffect(() => {
    if (selectedContractItems && selectedContractItems.length > 0) {
      const calculatedFidelity = getFidelity(selectedContractItems);
      setFidelity(calculatedFidelity);

      const calculatedMonthsLeft = getMonthsLeft(calculatedFidelity, contract.DocumentDateToGrid);
      setMonthsLeft(calculatedMonthsLeft);
    } else if (selectedContractItems.length === 0) {
      setFidelity(0);
      setMonthsLeft(0);
    }
  }, [selectedContractItems, contract.DocumentDateToGrid]);

  const getCancelDate = () => {
    let cancelDate = new Date();

    if (localStorage.getItem("sector") === "CS") {
      const nextMonth = new Date(cancelDate.getFullYear(), cancelDate.getMonth() + 1, cancelDate.getDate());
      cancelDate = nextMonth;
    }

    return cancelDate.toLocaleDateString("pt-BR");
  };

  const handleCheckboxChange = (e, item) => {
    if (e.target.checked) {
      setSelectedContractItems([...selectedContractItems, item]);
    } else {
      setSelectedContractItems(selectedContractItems.filter((i) => i !== item));
    }
  };

  const handleClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <table className="table table-bordered table-hover" style={{ fontSize: "0.8rem" }}>
        <thead>
          <tr>
            <th></th>
            <th>Itens do Contrato</th>
            <th>QNT</th>
            <th>Pr. Unit.</th>
            <th>Val. Líquido</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="12">Carregando itens...</td>
            </tr>
          ) : (
            contractItems &&
            contractItems.map((item, index) => (
              <tr key={index}>
                <td style={{ width: "5px" }}>{item.IsEnabled === true ? <div className="green-circle"></div> : <div className="red-circle"></div>}</td>
                <td>
                  <div className="row ps-3">{item.QbmItemCode}:</div>
                  <div className="row ps-3">{item.QbmItemDescription}</div>
                </td>
                <td style={{ width: "10px" }}>{item.Quantity}</td>
                <td style={{ width: "100px" }}>{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(item.UnitPrice)}</td>
                <td>{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(item.NetValue)}</td>
                <td style={{ width: "5px" }}>
                  <input type="checkbox" name={`checkbox-${index}`} id={`checkbox-${index}`} onChange={(e) => handleCheckboxChange(e, item)} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <button className="btn btn-sm btn-qorange float-end" onClick={handleClick}>
        Memorial de Cobrança
      </button>

      {showModal && (
        <>
          <div className="modal-backdrop fade show"></div>

          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Memorial de Cobrança - Contrato: {contract.QbmDocumentId}</h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  <p>
                    <strong>Data do Contrato:</strong> {contract.DocumentDateToGrid.split(" ")[0]} <strong>Fidelidade:</strong>{" "}
                    {fidelity > 0 ? `${fidelity} meses` : `${fidelity} mês`}
                  </p>
                  <p>
                    <strong>Data da Solicitação:</strong> {new Date().toLocaleDateString("pt-BR")} <strong>Data de Encerramento:</strong> {getCancelDate()}{" "}
                    <strong>Fidelidade Restante:</strong> {monthsLeft} meses
                  </p>
                  <p>
                    <strong>Itens Selecionados:</strong> {selectedContractItems.length}
                  </p>

                  {selectedContractItems.length > 0 && (
                    <div className="table-responsive">
                      <table className="table table-sm table-bordered table-hover">
                        <thead>
                          <tr>
                            <th>Itens do Contrato</th>
                            <th>QNT</th>
                            <th>Pr. Unit.</th>
                            <th>Val. Líquido</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedContractItems.map((item, index) => (
                            <tr key={index}>
                              <td>
                                <div className="row ps-3">{item.QbmItemCode}:</div>
                                <div className="row ps-3">{item.QbmItemDescription}</div>
                              </td>
                              <td style={{ width: "10px" }}>{item.Quantity}</td>
                              <td style={{ width: "100px" }}>
                                {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(item.UnitPrice)}
                              </td>
                              <td>{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(item.NetValue)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {selectedContractItems.length === 0 && <div className="alert alert-warning">Nenhum item selecionado para o memorial.</div>}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-sm btn-secondary" onClick={closeModal}>
                    Cancelar
                  </button>
                  <button type="button" className="btn btn-sm btn-qorange" disabled={selectedContractItems.length === 0}>
                    Gerar Memorial
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ContractItems;
