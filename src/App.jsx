import { useState } from "react";
import myFeeLogo from "/logo-laranja.png";
import Searchbar from "./components/Searchbar.jsx";

function App() {
  return (
    <>
      <div>
        <img src={myFeeLogo} className="logo" alt="Logo do MyFee" />
      </div>

      <div>
        <Searchbar />
      </div>

      <hr />

      <div>tabela de contratos aqui</div>
    </>
  );
}

export default App;
