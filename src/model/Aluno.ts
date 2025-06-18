import { DatabaseModel } from "./DatabaseModel";

// Recupera conexão com o banco 
const database = new DatabaseModel().pool

// Classe que representa um aluno no sistema
export class Aluno {
    private idAluno: number = 0;
    private ra: string = '';
    private nome: string;
    private sobrenome: string;
    private dataNascimento: Date;
    private endereco: string;
    private email: string;
    private celular: string;


    /**
     * Construtor da classe aluno
     * 
     * @param nome
     * @param sobrenome
     * @param dataNascimento
     * @param endereco
     * @param email
     * @param celular
     */

    constructor (nome: string, sobrenome: string, dataNascimento: Date, endereco: string, email: string, celular: string) {
        this.nome             = nome;
        this.sobrenome        = sobrenome;
        this.dataNascimento   = dataNascimento;
        this.endereco         = endereco;
        this.email            = email;
        this.celular          = celular;
    }


    // Métodos GET e SET 

    /**
     * Retona o id do aluno
     * @returns id: id aluno
     */
    public getIdAluno(): number {
        return this.idAluno;
    }

    /**
     * @param idAluno
     */
    public setIdAluno(idAluno: number): void{
        this.idAluno = idAluno;
    }
    
    /**
     * retona o RA do aluno
     * @returns 
     */
    public getRA(): string {
        return this.ra;
    }

    /**
     * @param ra
     */
    public setRA(ra: string): void{
        this.ra = ra;
    }

    /**
     * Retona o nome do aluno
     * @returns 
     */
    public getNome(): string {
        return this.nome;
    }

    /**
     * @param _sobrenome
     */
    public setSobrenome(_sobrenome: string): void{
        this.sobrenome = this.sobrenome;
    }

    /**
     * Retona o sobrenome do aluno
     * @returns 
     */
    public getSobrenome(): string {
        return this.sobrenome;
    }

    /**
     * @param nome
     */
    public setNome(nome: string): void{
        this.nome = nome;
    }

    /**
     * Retona o data de nascimento do aluno
     * @returns
     */
    public getDataNascimento(): Date {
        return this.dataNascimento;
    }

    /**
     * @param dataNascimento
     */
    public setDataNascimento(dataNascimento: Date): void{
        this.dataNascimento = dataNascimento;
    }

    /**
     * Retona o endereço do aluno
     * @returns
     */
    public getEndereco(): string {
        return this.endereco;
    }

    /**
     * @param endereco
     */
    public setEndereco(endereco: string): void{
        this.endereco = endereco;
    }

    /**
     * Retona o email do aluno
     * @returns 
     */
    public getEmail(): string {
        return this.email;
    }

    /**
     * @param email
     */
    public setEmail(email: string): void{
        this.email = email;
    }

    /**
     * Retona o celular do aluno
     * @returns 
     */
    public getCelular(): string {
        return this.celular;
    }

    /**
     * @param celular
     */
    public setCelular(celular: string): void{
        this.celular = celular;
    }


    // MÉTODOS CRUD

    /**
     * Retorna uma listagem com todos os alunos cadastrados no banco 
     * 
     * @returns Lista com todos os alunos cadastrados no banco de dados
     */

    static async listarAlunos(): Promise<Array<Aluno> | null> {
        // criando uma lista vazia para armazenar os alunos
        let listaDeAlunos: Array<Aluno> = [];

        try {
            const querySelectAluno = `SELECT * FROM Aluno;`

            const respostaBD = await database.query(querySelectAluno);


            respostaBD.rows.forEach((aluno: any) => {
                let novoAluno = new Aluno (
                    aluno.nome,
                    aluno.sobrenome,
                    aluno.data_nascimento,
                    aluno.endereco,
                    aluno.email,
                    aluno.celular
                );
                novoAluno.setIdAluno(aluno.id_aluno);
                novoAluno.setRA(aluno.ra);

                listaDeAlunos.push(novoAluno);
            });

            return listaDeAlunos;
        } catch (error) {
            console.log(`Erro ao acessar model: ${error}`);
            return null;
        }
    }
    
    /**
     * Método de cadastrar um novo aluno no banco de dados
     * @param aluno objeto Aluno contendo as informações a serem cadastradas
     * @return Boolean indicando se o cadastro foi bem-sucedido
     */
    static async cadastrarAluno(aluno: Aluno): Promise<Boolean> {
        try {
            // Cria uma consulta para inserir o registro de um aluno no banco de dados
            const queryInsertAluno =   `INSERT INTO Aluno (ra, nome, sobrenome, data_nascimento, endereco, email, celular)
                                        VALUES ( '${aluno.getRA().toUpperCase()}',
                                                 '${aluno.getNome().toUpperCase()}',
                                                 '${aluno.getSobrenome().toUpperCase()}',
                                                 '${aluno.getDataNascimento()}',
                                                 '${aluno.getEndereco().toUpperCase()}',
                                                 '${aluno.getEmail().toLowerCase()}',
                                                '${aluno.getCelular()}'
                                        )
                                        RETURNING id_aluno;`
            
            // Executa a query no banco de dados e armazena o resultado
            const result = await database.query(queryInsertAluno);

            // verifica se a quantidade de linhas que foram inseridadas é maior que 0
            if(result.rows.length > 0) {
                //Exibe a mensagem de sucesso
                console.log(`Aluno cadastrado com sucesso. ID: ${result.rows[0].id_aluno}`);
                // retorna verdadeiro
                return true;
            }
            // caso a consulta não tenha tido sucesso, retorna falso
            return false

        // captura o error
        } catch (error) {
            // exibe mensagem com detalhes de erro no console
            console.error(`Erro ao cadastrar aluno: ${error}`);
            //retorna falso
            return false;
        }
    }

    /**
     * Remove um aluno do banco de dados baseado no ID fornecido.
     * @param idAluno - ID do aluno a ser removido.
     * @returns retorna uma promise que se true, a remoção foi bem sucedida, e false se não.
     * @throws Lança um erro caso ocorra um erro na execução da consulta
     */
    static async removerAluno(idAluno: number): Promise<any> {
        try {

            // cria uma consultapara remover aluno
            const queryDeleteAluno = `DELETE FROM aluno WHERE id_aluno = ${idAluno}`;
 
            const respostaBD = await database.query(queryDeleteAluno);

            // Executa a query de remoção de aluno e vefica se foi bem sucedida.
            if(respostaBD.rowCount != 0) {
                console.log(`Aluno removido com sucesso! ID removido: ${idAluno}`);
                return true;
            }

            return false;

        // captura qualquer erro que possa ocorrer    
        } catch (error) {
            console.log('Erro ao remover o aluno.')
            console.log(error);
            return false
        }
    }

    /**
     * Atualiza as informações de um aluno no banco de dados.
     * 
     * @param aluno - contem as informações atualizadas do aluno.
     * @returns envia uma promessa para verificar se foi, ou não, atualizado.
     * @throws Lança um erro se ocorrer um problema durante a atualização do aluno
     */
    static async atualizarAluno(aluno: Aluno): Promise<boolean> {
        try {
            const queryUpdateAluno = `UPDATE aluno SET 
                                      nome = '${aluno.getNome()}', 
                                      sobrenome = '${aluno.getSobrenome()}',
                                      data_nascimento = '${aluno.getDataNascimento()}',
                                      endereco = '${aluno.getEndereco()}',
                                      email = '${aluno.getEmail()}',
                                      celular = '${aluno.getCelular()}',
                                      WHERE id_aluno = ${aluno.getIdAluno()};`

            const respostaBD = await database.query(queryUpdateAluno);
            
            if(respostaBD.rowCount != 0) {
                console.log(`Aluno atualizado com sucesso. ID: ${aluno.getIdAluno()}`);
                return true;
            }

            return false;

        } catch (error) {
            console.log('Erro ao remover o aluno. Consulte o servidor para mais detalhes.');
            return false;
        }
    }
}