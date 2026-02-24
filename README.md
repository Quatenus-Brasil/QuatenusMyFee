![Logo](https://i.imgur.com/FuwyIck.png)

O Quatenus MyFee é uma ferramenta interna da Quatenus Brasil, usada para simplificar o processo de cálculo de cancelamento de contrato.

## Screenshots

Página inicial:
![Screenshot](https://i.imgur.com/w6jZZM2.png)

## Stack utilizada

**Frontend:** React, Bootstrap

**Backend:** Node, Express 

## Pré-requisitos

- Conta ativa no Quatenus Business Monitoring (QBM)

## Instalação e execução

Clone o repositório:

```bash
git clone https://github.com/Quatenus-Brasil/QuatenusMyFee.git
cd quatenusmyfee
```

### Backend

Instale as dependências e inicie o servidor:

```bash
cd backend
npm install
npm run dev
```

Atenção: Você precisa criar um arquivo .env e preencher ele com base no arquivo .env.example.

O servidor estará rodando na porta configurada no .env ou na padrão: 5556.

### Frontend

Em outro terminal, navegue para a pasta do frontend e inicie a aplicação:

```bash
cd frontend
npm install
npm run dev
```

Atenção: Você precisa criar um arquivo .env e preencher ele com base no arquivo .env.example.

A aplicação estará disponível em `http://localhost:5173` (porta padrão do Vite).

## Configuração 

Ao abrir o Quatenus MyFee, você deve clicar em "Configuração" e colocar seu usuário e senha do QBM e selecionar a qual setor você faz parte, CS ou Financeiro. Essas informações serão salvas no localStorage.