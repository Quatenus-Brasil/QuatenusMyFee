const MemorialModal = ({contractsItems, contract}) => {
  const handleClick = (contractsItems, contract) => {
    console.log(contractsItems, contract);
  };
  return (
    <button className="btn btn-sm btn-danger float-end" onClick={(e) => handleClick(contractsItems, contract)}>
      Criar Memorial
    </button>
  );
};

export default MemorialModal;
