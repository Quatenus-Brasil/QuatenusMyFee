import { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Logo from "../assets/LogoQuatenus.png";

const DeviceSelectionModal = ({ show, onClose, calculatedData, contract, getCancelDate }) => {
  const [selectedDevices, setSelectedDevices] = useState({});
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const modalContentRef = useRef();

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

  const handleConfirm = async () => {
    const allValid = calculatedData.every((item) => {
      const selections = selectedDevices[item.itemId] || [];
      return selections.length === item.quantity && selections.every((selection) => selection.trim() !== "");
    });

    if (!allValid) {
      alert("Por favor, informe a placa do veículo ou N/A para todas as linhas.");
      return;
    }

    await generatePDF();
  };

  const generatePDF = async () => {
    setIsGeneratingPDF(true);

    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = 210;
      const margin = 15;

      const addHeader = () => {
        const logoWidth = 32; // largura da logo em mm
        const logoHeight = 10; // altura da logo em mm
        pdf.addImage(Logo, "PNG", pageWidth - margin - logoWidth, 8, logoWidth, logoHeight);

        pdf.setFontSize(16);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(0, 0, 0);
        pdf.text("MEMORIAL DE CANCELAMENTO", margin, 15);

        pdf.setDrawColor(220, 220, 220);
        pdf.setLineWidth(0.2);
        pdf.line(margin, 22, pageWidth - margin, 22);

        pdf.setTextColor(0, 0, 0);
      };

      addHeader();

      pdf.setFontSize(12);
      pdf.setFont("helvetica", "bold");
      let yPosition = 30;

      pdf.text(`${contract.CustomerBusinessEntityDescription}`, margin, yPosition);
      yPosition += 5;
      
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      
      pdf.text(`N° Contrato: ${contract.QbmDocumentId}`, margin, yPosition);
      yPosition += 10;

      pdf.setFont("helvetica", "bold");
      pdf.text("Data do Contrato:", margin, yPosition);
      pdf.setFont("helvetica", "normal");
      pdf.text(contract.DocumentDateToGrid.split(" ")[0], margin, yPosition + 5);

      pdf.setFont("helvetica", "bold");
      pdf.text("Data da Solicitação:", margin + 60, yPosition);
      pdf.setFont("helvetica", "normal");
      pdf.text(new Date().toLocaleDateString("pt-BR"), margin + 60, yPosition + 5);

      pdf.setFont("helvetica", "bold");
      pdf.text("Data de Encerramento:", margin + 120, yPosition);
      pdf.setFont("helvetica", "normal");
      pdf.text(getCancelDate().toLocaleDateString("pt-BR"), margin + 120, yPosition + 5);

      yPosition += 15;

      pdf.setFontSize(12);
      pdf.setFont("helvetica", "bold");
      pdf.text("Detalhamento das Licenças a Cancelar:", margin, yPosition);
      yPosition += 5;

      calculatedData.forEach((item, index) => {
        const rectStartY = yPosition;

        const contentHeight = 5 + 5 + 4 + 5; // espaçamento + título + quantidade + fidelidade

        // Desenha o retângulo de fundo
        pdf.setFillColor(248, 249, 250);
        pdf.rect(margin, rectStartY, pageWidth - margin * 2, contentHeight, "F");

        yPosition += 5;

        // Conteudo
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(0, 0, 0);
        pdf.text(`${item.QbmItemCode}`, margin + 3, yPosition);
        yPosition += 5;

        pdf.setFontSize(10);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(255, 107, 53);
        pdf.text(`Quantidade a cancelar: ${item.quantity}`, margin + 3, yPosition);
        yPosition += 4;

        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(10);
        pdf.text(`Fidelidade Restante: ${item.fidelityDisplay}`, margin + 3, yPosition);
        yPosition += 3;

        const tableData = [];
        const deviceSelections = selectedDevices[item.itemId] || [];

        for (let i = 0; i < item.quantity; i++) {
          tableData.push([
            new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(item.UnitPrice),
            `${item.percentage}%`,
            new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(item.finePerUnit),
            new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(item.fee),
            deviceSelections[i] || "N/A",
          ]);
        }

        autoTable(pdf, {
          startY: yPosition,
          head: [["Pr. Unitário", "Multa Contratual (%)", "Multa", "Taxa de Finalização", "Placa do Veículo"]],
          body: tableData,
          theme: "grid",
          styles: {
            fontSize: 9,
            cellPadding: 2,
          },
          headStyles: {
            fillColor: "#f36e21",
            textColor: 255,
            fontStyle: "bold",
          },
          margin: { left: margin, right: margin },
          pageBreak: "auto",
          showHead: "everyPage",
        });

        yPosition = pdf.lastAutoTable.finalY + 15;

        if (index < calculatedData.length - 1 && yPosition > 240) {
          pdf.addPage();
          yPosition = 25;
        }
      });

      const total = calculatedData.reduce((acc, item) => acc + item.total, 0);

      if (yPosition > 260) {
        pdf.addPage();
        yPosition = 25;
      }

      pdf.setFillColor("#f36e21");
      pdf.rect(margin, yPosition, pageWidth - margin * 2, 15, "F");

      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");
      pdf.text(`TOTAL: ${new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(total)}`, pageWidth / 2, yPosition + 10, {
        align: "center",
      });

      pdf.setTextColor(0, 0, 0);

      const now = new Date();
      const timestamp = now.toLocaleDateString("pt-BR").replace(/\//g, "-") + "_" + now.toLocaleTimeString("pt-BR").replace(/:/g, "-");
      const fileName = `Memorial_Cancelamento_${contract.QbmDocumentId}_${timestamp}.pdf`;

      pdf.save(fileName);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      alert("Erro ao gerar o PDF. Tente novamente.");
    } finally {
      setIsGeneratingPDF(false);
    }
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
          <div className="modal-content" ref={modalContentRef}>
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
              <button type="button" className="btn btn-sm btn-qorange" onClick={handleConfirm} disabled={isGeneratingPDF}>
                {isGeneratingPDF ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Gerando PDF...
                  </>
                ) : (
                  "Gerar Memorial"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeviceSelectionModal;
