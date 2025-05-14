// importando módulo server
import {server} from './server';

// importando a classe DatabeseModel que gerencia a conexão com o banco de dados
import { DatabaseModel } from './model/DatabaseModel';

// Define a porta em que o servidor irá rodar
const port: number = 3333;

// Testando a conexão com o banco de dados antes iniciar o servidor
new DatabaseModel().testeConexao().then((resdb) => {
    //verifica a conexão com o banco
    if (resdb) {
        server.listen(port, () => {
            console.clear()
            console.log(`Endereço do servidor http://localhost:${port}`);
        });
    } else{
        console.log(`Erro ao conectar com o banco de dados.`);
    }
});