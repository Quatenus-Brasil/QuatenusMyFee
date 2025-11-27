import { useState, useEffect } from "react";

const DeviceSelectionModal = ({ show, onClose, calculatedData, contract, getCancelDate }) => {
  const [selectedDevices, setSelectedDevices] = useState({});

  useEffect(() => {
    if (show && calculatedData.length > 0) {
      initializeDeviceSelections();
    }
  }, [show, calculatedData]);

  const initializeDeviceSelections = () => {
    const initialSelections = {};
    calculatedData.forEach((item) => {
      initialSelections[item.itemId] = Array(item.quantity).fill("");
    });
    setSelectedDevices(initialSelections);
  };

  const handleDeviceChange = (itemId, index, deviceId) => {
    setSelectedDevices((prev) => {
      const newSelections = { ...prev };
      if (!newSelections[itemId]) {
        newSelections[itemId] = [];
      }
      newSelections[itemId][index] = deviceId;
      return newSelections;
    });
  };

  const handleConfirm = () => {
    const allValid = calculatedData.every((item) => {
      const selections = selectedDevices[item.itemId] || [];
      return selections.length === item.quantity && selections.every((selection) => selection.trim() !== "");
    });

    if (!allValid) {
      alert("Por favor, informe a placa do veículo ou N/A para todas as linhas.");
      return;
    }

    alert("Memorial de cobrança gerado com sucesso!");
  };

  const handleClose = () => {
    setSelectedDevices({});
    onClose();
  };

  if (!show) return null;

  const total = calculatedData.reduce((total, item) => total + item.total, 0);

  return (
    <>
      <div className="modal-backdrop fade show"></div>

      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Memorial de Cobrança - Contrato: {contract.QbmDocumentId}</h5>
              <button type="button" className="btn-close" onClick={handleClose}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3 p-3 bg-light rounded">
                <h6 className="mb-3">
                  <strong>Informações do Contrato</strong>
                </h6>
                <div className="row">
                  <div className="col-md-4">
                    <p className="mb-2">
                      <strong>Data do Contrato:</strong>
                      <br />
                      {contract.DocumentDateToGrid.split(" ")[0]}
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p className="mb-2">
                      <strong>Data da Solicitação:</strong>
                      <br />
                      {new Date().toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p className="mb-2">
                      <strong>Data de Encerramento:</strong>
                      <br />
                      {getCancelDate().toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>
              </div>

              <p className="mb-3">
                <strong>Detalhamento das Licenças a Cancelar:</strong>
              </p>

              {calculatedData.map((item) => {
                const deviceSelections = selectedDevices[item.itemId] || [];

                return (
                  <div key={item.itemId} className="mb-4 p-3 border rounded">
                    <div className="row mb-3">
                      <div className="col">
                        <strong>{item.QbmItemCode}</strong>
                        <div className="text-muted small">{item.QbmItemDescription}</div>
                        <div className="text-qorange small">Quantidade a cancelar: {item.quantity}</div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <table className="table table-sm table-bordered">
                          <thead>
                            <tr>
                              <th>Pr. Unitário</th>
                              <th>Multa Contratual (%)</th>
                              <th>Multa</th>
                              <th>Taxa de Finalização</th>
                              <th>Placa do Veículo</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Array.from({ length: item.quantity }, (_, index) => (
                              <tr key={index}>
                                <td className="align-middle">
                                  {new Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                  }).format(item.UnitPrice)}
                                </td>
                                <td className="align-middle text-center">{item.percentage}%</td>
                                <td className="align-middle">
                                  {new Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                  }).format(item.finePerUnit)}
                                </td>
                                <td className="align-middle">
                                  {new Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                  }).format(item.fee)}
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    value={deviceSelections[index] || ""}
                                    onChange={(e) => handleDeviceChange(item.itemId, index, e.target.value)}
                                    placeholder="Digite a placa ou N/A"
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        <div className="mt-2 p-2 bg-light rounded">
                          <div className="row">
                            <div className="col-md-6">
                              <small>
                                <strong>Fidelidade Restante:</strong> {item.fidelityDisplay}
                              </small>
                            </div>
                            <div className="col-md-6 text-end">
                              <small>
                                <strong>Total do Item:</strong>{" "}
                                {new Intl.NumberFormat("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                }).format(item.total)}
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="mt-4 p-3 bg-qorange text-white rounded text-center">
                <h5 className="mb-0">
                  <strong>
                    TOTAL:{" "}
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(total)}
                  </strong>
                </h5>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-sm btn-secondary" onClick={handleClose}>
                Voltar
              </button>
              <button type="button" className="btn btn-sm btn-qorange" onClick={handleConfirm}>
                Gerar Memorial
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeviceSelectionModal;
