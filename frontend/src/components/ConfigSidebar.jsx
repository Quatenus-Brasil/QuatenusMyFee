import { useState } from "react";

const ConfigSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [sector, setSector] = useState("CS");

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSave = () => {
    localStorage.setItem("qbmUsername", username);
    localStorage.setItem("qbmPassword", password);
    localStorage.setItem("sector", sector);
    alert("Usuário, senha e setor salvos.");
  };

  const handleClear = () => {
    localStorage.clear();
    alert("Credenciais removidas.");
  };

  return (
    <>
      <button className="btn btn-qblue position-fixed" style={{ top: "20px", right: "20px", zIndex: 1000 }} onClick={toggleSidebar}>
        Configuração
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
            <h5 className="mb-0">Configurações QBM</h5>
            <button className="btn btn-outline-secondary btn-sm" onClick={toggleSidebar}>
              ✕
            </button>
          </div>

          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              <strong>Usuário do QBM:</strong>
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Digite seu usuário QBM"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              <strong>Senha do QBM:</strong>
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Digite sua senha QBM"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="sector" className="form-label">
              <strong>Setor:</strong>
            </label>
            <select className="form-select form-select-sm" name="sector" id="sector" value={sector} onChange={(e) => setSector(e.target.value)}>
              <option value="CS">CS</option>
              <option value="Financeiro">Financeiro</option>
            </select>
          </div>

          <div className="d-grid gap-2">
            <button className="btn btn-qorange" onClick={handleSave} disabled={!username || !password}>
              Salvar
            </button>
            <button className="btn btn-secondary" onClick={handleClear}>
              Limpar
            </button>
          </div>

          <div className="mt-4 p-3 bg-info bg-opacity-10 rounded">
            <small className="text-muted">ℹ️ Essas credenciais serão usadas para a autenticação no QBM.</small>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfigSidebar;
