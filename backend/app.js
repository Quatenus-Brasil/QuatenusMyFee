import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Origin", "Content-Type", "Accept", "Authorization", "X-Request-With"],
  })
);

app.post("/api/getExternalContractItems", async (request, response) => {
  try {
    const resData = await axios.post("https://qbm01.quatenus-system.com.br/quatenus10/QBMDats/Documents/Document.svc/GetExternalContractsItems", request.body);
    response.json(resData.data);
  } catch (error) {
    console.error("Erro (GetExternalContractsItems):", error.message);
    response.status(500).json({ error: "Erro ao consultar a API da Quatenus" });
  }
});

app.post("/api/getDocuments", async (request, response) => {
  try {
    const resData = await axios.post("https://qbm01.quatenus-system.com.br/quatenus10/QBMDats/Documents/Document.svc/json/GetDocuments", request.body);
    response.json(resData.data);
  } catch (error) {
    console.error("Erro (GetDocuments):", error.message);
    response.status(500).json({ error: "Erro ao consultar a API da Quatenus" });
  }
});

app.listen(5556, () => {
  console.log("Backend Rodando na porta 5556");
});
