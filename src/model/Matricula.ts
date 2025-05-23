import { DatabaseModel } from "./DatabaseModel";

// recupera conexão com o banco
const database = new DatabaseModel().pool

// Classe que representa uma matrícula
export class Matricula {
    private idMatricula: number = 0;
    private idAluno: number;
    private idCurso: number;
    private dataMatricula: Date;

    /**
     * Construtor da classe Matricula
     * 
     * @param idAluno
     * @param idCurso
     * @param dataMatricula
     */
    public constructor(idMatricula:number, idAluno:number, idCurso:number, dataMatricula:Date) {
        this.idMatricula   = idMatricula;
        this.idAluno       = idAluno;
        this.idCurso       = idCurso;
        this.dataMatricula = dataMatricula;
    }



    // MÉTODOS GET e SET

    /**
     * Retorna o id da matricula
     * @returns idMatricula 
     */
    public getIdMatricula(): number {
        return this.idMatricula;
    }

    /**
     * Atribui parâmetro ao idMatricula
     * 
     * @param idMatricula
     */
    public setIdMatricula(): number {
        return this.idMatricula;
    }

    /**
     * Retorna o id do aluno
     * @returns idAluno
     */
    public getIdAluno(): number {
        return this.idAluno;
    }
    
    /**
     * Atribui parâmetro ao idAluno
     * 
     * @param idAluno
     */
    public setIdAluno(): number {
        return this.idAluno;
    }

    /**
     * Retorna o id do curso
     * @return idCurso
     */
    public getIdCurso(): number {
        return this.idCurso;
    }

    /**
     * Atribui parâmetro ao idCurso
     * 
     * @param idCurso
     */
    public setIdCurso(): number {
        return this.idCurso;
    }

    /**
     * Retorna a data de matícula
     * @returns dataMatricula
     */
    public getDataMatricula(): Date {
        return this.dataMatricula;
    }

    /**
     * Atribui parâmetro ao dataMatricula
     * 
     * @param dataMatricula
     */
    public setDataMatricula(): Date {
        return this.dataMatricula;
    }

    /**
     * Retorna uma lista com todos as matriculas cadastradas no banco de dados
     * 
     * @returns Lista com todos as matriculas cadastradas no banco de dados
     */
    static async listarMatriculas(): Promise<Array<Matricula> | null> {
        // criando uma lista vazia para armazenar as matriculas
        let listaDeMatriculas: Array<Matricula> = [];

        // query de consulta do banco
        const querySelectMatriculas = 
            `SELECT m.id_matricula, m.id_aluno, m.id_curso, m.data_matricula,
                    a.ra, a.nome, a.sobrenome, a.celular,
                    c.nome_curso, c.numero_vagas, c.departamento
            FROM Matricula m
            JOIN Aluno a ON m.id_aluno = a.id_aluno
            JOIN Curso c on m.id_curso = c.id_curso;`
    
        try {

            // executa a query no banco de dados
            const respostaBD = await database.query(querySelectMatriculas);

            //verifica se há resultdos
            if(respostaBD.rows.length === 0) {
                return null;
            }

            // altera as duas ultinmas linhs retornadas
            respostaBD.rows.forEach((matricula: any) => {
                //monta o objeto de matricula com os dados do aluno e do livro
                const novaMatricula = {
                    idMatricula: matricula.id_matricula,
                    idAluno: matricula.id_aluno,
                    idCurso: matricula.id_curso,
                    dataMatricula: matricula.data_matricula,

                    aluno: {
                        ra: matricula.ra,
                        nome: matricula.nome,
                        sobrenome: matricula.sobrenome,
                        celular: matricula.celular
                    },

                    curso: {
                        nomeCurso: matricula.nome_curso,
                        numeroVagas: matricula.numero_vagas,
                        departamento: matricula.departamento
                    }
                };

                // adiciona o objeto á lista de matriculas
                listaDeMatriculas.push(novaMatricula as any);
            })

            return listaDeMatriculas;

        } catch (error) {
            console.log(`Erro ao acessar o model: ${error}`);
            return null
        }
    }

}