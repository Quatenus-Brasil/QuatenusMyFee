const Proposal = ({ proposal, loading }) => {
  return (
    <table className="table table-bordered table-hover">
      <thead>
        <tr>
          {/* <th>Ativo</th> */}
          <th>Cód.</th>
          <th>Desc.</th>
          <th>QNT</th>
          <th>Pr. Unit.</th>
          <th>Val. Líquido</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan="12">Carregando proposta...</td>
          </tr>
        ) : (
          proposal &&
          proposal.map((item, index) => (
            <tr key={index}>
                {console.log(item.IsEnabled)}
              {/* <td>{item.IsEnabled === true ? "Sim" : "Não"}</td> */}
              <td>{item.QbmItemCode}</td>
              <td>{item.QbmItemDescription}</td>
              <td>{item.Quantity}</td>
              <td>{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(item.UnitPrice)}</td>
              <td>{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(item.NetValue)}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Proposal;
