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

    public constructor (nome: string, sobrenome: string, dataNascimento: Date, endereco: string, email: string, celular: string) {
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
    
}