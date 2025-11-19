const ContractItems = ({ contractsItems, loading }) => {
  return (
    <table className="table table-bordered table-hover" style={{ fontSize: "0.8rem" }}>
      <thead>
        <tr>
          <th></th>
          <th>Itens do Contrato</th>
          <th>QNT</th>
          <th>Pr. Unit.</th>
          <th>Val. Líquido</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan="12">Carregando itens...</td>
          </tr>
        ) : (
          contractsItems &&
          contractsItems.map((item, index) => (
            <tr key={index}>
              <td style={{ width: "5px" }}>{item.IsEnabled === true ? <div className="green-circle"></div> : <div className="red-circle"></div>}</td>
              <td>
                <div className="row ps-3">{item.QbmItemCode}:</div>
                <div className="row ps-3">{item.QbmItemDescription}</div>
              </td>
              <td style={{ width: "10px" }}>{item.Quantity}</td>
              <td style={{ width: "100px" }}>{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(item.UnitPrice)}</td>
              <td>{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(item.NetValue)}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default ContractItems;
