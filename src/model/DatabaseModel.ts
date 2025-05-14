// Importa a biblioteca 'pg' para interagir com o banco de dados PostgreSQL
import pg from 'pg';

// Importa a biblioteca 'dotenv' para carregar variáveis de ambiente a partir de um arquivo .env
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();


// classe que representa o modelo de banco de dados
export class DatabaseModel {
    
    //Configuração para conexão com o banco de dados.
    private _config: object;

    //Pool de conexões com o banco de dados.
    private _pool: pg.Pool;

    //Cliente de conexão com o banco de dados.
    private _client: pg.Client;

    //Construtor da classe DatabaseModel.
    constructor() {
        // Define a configuração para conexão com o banco de dados, utilizando variáveis de ambiente
        this._config = {
            user: process.env.DB_USER,       // Nome do usuário
            host: process.env.DB_HOST,       // Endereço do servidor
            database: process.env.DB_NAME,   // Nome do banco
            password: process.env.DB_PASSWORD, // Senha do usuário do banco de dados
            port: process.env.DB_PORT,       // Porta de conexão com o banco
            max: 10,                         // Número máximo de conexões no pool
            idleTimoutMillis: 10000          // Tempo máximo de inatividade antes de fechar uma conexão (10 segundos)
        };

        // Cria um pool de conexões para otimizar a performance e permitir múltiplas conexões simultâneas
        this._pool = new pg.Pool(this._config);

        // Cria um cliente de conexão individual para interações diretas com o banco
        this._client = new pg.Client(this._config);
    }

    /**
     * Método para testar a conexão com o banco de dados.
     * @returns **true** se a conexão for bem-sucedida, **false** se houver falha.
     */
    public async testeConexao() {
        try {
            // Tenta estabelecer a conexão com o banco de dados
            await this._client.connect();
            console.log('Database connected!');

            // Encerra a conexão com o banco de dados após o teste
            this._client.end();
            return true;
        } catch (error) {
            // Em caso de erro, exibe mensagens de erro no console
            console.log('Error to connect database X( ');
            console.log(error);

            // Encerra a conexão para evitar problemas de conexão pendente
            this._client.end();
            return false;
        }
    }

    /**
     * Getter para acessar o pool de conexões.
     * Isso permite que outras partes da aplicação utilizem o pool para executar consultas ao banco.
     */
    public get pool() {
        return this._pool;
    }
}
