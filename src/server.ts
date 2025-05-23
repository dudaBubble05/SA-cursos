// importando mósulo 'express' para criar o servidor
import express from "express";

// importando o módulo 'cors' para permitrir requisições de outros domínios
import cors from "cors"

// importando as rotas
import { router } from "./routes";


// criando servidor express
const server = express();

// configurando o servidor para aceitar as requisições de outros domínios
server.use(cors());

// configurando o servidor para aceitar requisições JSON
server.use(express.json());

// configurando as rotas no servidor
server.use(router);

// definindo a porta do servidor
const PORT = process.env.PORT || 3332;

// iniciando o servidor na porta definida
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

//exportando o servidor para ser utilizado em outros arquivos
export {server};