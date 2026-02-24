import { useState } from "react";

const QuestionsButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="btn btn-qblue position-fixed" style={{ top: "20px", right: "150px", zIndex: 1000 }} onClick={toggleSidebar}>
        ?
      </button>

      {isOpen && (
        <div className="position-fixed w-100 h-100" style={{ top: 0, left: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1040 }} onClick={toggleSidebar} />
      )}

      <div
        className={`position-fixed h-100 bg-light border-start shadow ${isOpen ? "translate-x-0" : "translate-x-100"}`}
        style={{
          top: 0,
          right: 0,
          width: "350px",
          zIndex: 1050,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease-in-out",
        }}>
        <div className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="mb-0">Dúvidas?</h5>
            <button className="btn btn-outline-secondary btn-sm" onClick={toggleSidebar}>
              ✕
            </button>
          </div>

          <div className="mb-3">
            <a href={import.meta.env.VITE_LINK_CANCELAMENTO_CONTRATUAL} target="_blank" rel="noopener noreferrer">
              Processo de Cancelamento Contratual
            </a>
          </div>

          <div className="mb-3">
            <a href={import.meta.env.VITE_LINK_CANCELAMENTO_PARCIAL} target="_blank" rel="noopener noreferrer">
              Processo de Cancelamento PARCIAL - Cancelamento de Licença
            </a>
          </div>

          <div className="mb-3">
            <a href={import.meta.env.VITE_LINK_CANCELAMENTO_INADIMPLENCIA} target="_blank" rel="noopener noreferrer">
              Processo de Cancelamento Contratual por Inadimplência
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionsButton;
