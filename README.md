![Logo](https://i.imgur.com/FuwyIck.png)

O Quatenus MyFee é uma ferramenta interna da Quatenus Brasil, usada para simplificar o processo de cálculo de cancelamento de contrato.

## Screenshots

Página inicial:
![Screenshot](https://i.imgur.com/w6jZZM2.png)

## Stack utilizada

**Frontend:** React, Bootstrap

**Backend:** Node, Express 

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/Quatenus-Brasil/QuatenusMyFee.git
```

Entre no diretório do projeto

```bash
  cd quatenusmyfee
```

Instale as dependências do backend

```bash
  cd backend
```

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```

Instale as dependências do frontend

```bash
  cd frontend
```

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```

## Configuração

Para usar essa aplicação, você precisar ter uma conta ativa na plataforma Quatenus Business Monitoring (QBM). 

Ao abrir o Quatenus MyFee, você deve clicar em "Configuração" e colocar seu usuário e senha do QBM e selecionar a qual setor você faz parte, CS ou Financeiro. Essas informações serão salvas no localStorage.