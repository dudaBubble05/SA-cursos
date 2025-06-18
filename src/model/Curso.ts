import { DatabaseModel } from "./DatabaseModel";

// Recupera conexão com o banco 
const database = new DatabaseModel().pool

// Classe que representa um curso no sistema
export class Curso {
    private idCurso: number = 0;
    private nomeCurso: string;
    private cargaHorariaTotal: string;
    private duracaoSemestres: string;
    private departamento: string;
    private turno: string;
    private numeroVagas: number = 0;


    /**
     * Construtor da classe Curso
     * 
     * @param nomeCurso
     * @param cargaHorariaTotal
     * @param duracaoSemestres
     * @param departamento
     * @param turno
     * @param numeroVagas
     */

    public constructor (nomeCurso: string, cargaHorariaTotal: string, duracaoSemestres: string, departamento: string, turno: string, numeroVagas: number) {
        this.nomeCurso            = nomeCurso;
        this.cargaHorariaTotal    = cargaHorariaTotal;
        this.duracaoSemestres     = duracaoSemestres;
        this.departamento         = departamento;
        this.turno                = turno;
        this.numeroVagas          = numeroVagas;
    }

    // MÉTODOS GET e SET

    /**
     * Retorna o idCurso
     * @returns
     */
    public getIdCurso(): number {
        return this.idCurso;
    }

    /**
     * Atribui o parâmetro ao atributo 
     * @param idCurso
     */
    public setIdCurso(idCurso: number): void {
        this.idCurso = idCurso;
    }

    /**
     * Retorna o nomeCurso
     * @returns
     */
    public getNomeCurso(): string {
        return this.nomeCurso;
    }

    /**
     * Atribui o parâmetro ao atributo 
     * @param nomeCurso
     */
    public setNomeCurso(nomeCurso: string): void {
        this.nomeCurso = nomeCurso;
    }

    /**
     * Retorna a cargaHorariaTotal
     * @returns
     */
    public getCargaHorariaTotal(): string {
        return this.cargaHorariaTotal;
    }

    /**
     * Atribui o parâmetro ao atributo 
     * @param cargaHorariaTotal
     */
    public setCargaHorariaTotal(cargaHorariaTotal: string): void {
        this.cargaHorariaTotal = cargaHorariaTotal;
    }

    /**
     * Retorna o duracaoSemestres
     * @returns
     */
    public getDuracaoSemestres(): string {
        return this.duracaoSemestres;
    }

    /**
     * Atribui o parâmetro ao atributo 
     * @param duracaoSemestres
     */
    public setDuracaoSemestres(duracaoSemestres: string): void {
        this.duracaoSemestres = duracaoSemestres;
    }

    /**
     * Retorna o departamento
     * @returns
     */
    public getDepartamento(): string {
        return this.departamento;
    }

    /**
     * Atribui o parâmetro ao atributo 
     * @param departamento
     */
    public setDepartamento(departamento: string): void {
        this.departamento = departamento;
    }

    /**
     * Retorna o turno
     * @returns
     */
    public getTurno(): string {
        return this.turno;
    }

    /**
     * Atribui o parâmetro ao atributo 
     * @param turno
     */
    public setTurno(turno: string): void {
        this.turno = turno;
    }

    /**
     * Retorna o numeroVagas
     * @returns
     */
    public getNumeroVagas(): number {
        return this.numeroVagas;
    }

    /**
     * Atribui o parâmetro ao atributo 
     * @param numeroVagas
     */
    public setNumeroVagas(numeroVagas: number): void {
        this.numeroVagas = numeroVagas;
    }



    // MÉTODOS PARA ACESSAR O BANCO DE DADOS - CRUD
    
    /**
     * Retorna uma lista com todos os cursos cadstrados no banco de dados
     * 
     * @returns Lista com todos os cursos do banco
     */
    static async listarCursos(): Promise<Array<Curso> | null> {
        let listaDeCursos: Array<Curso> = [];

        try {
            const querySelectCurso = `SELECT * FROM Curso;`;

            // executa a query de consulta no banco
            const respostaBD = await database.query(querySelectCurso);

            //Percorr cada resultado retornado pelo banco de dados
            respostaBD.rows.forEach((curso) => {
                //crinado objeto curso
                let novoCurso = new Curso(
                    curso.nome,
                    curso.carga_horaria_total,
                    curso.duracao_semestres,
                    curso.departamento,
                    curso.turno,
                    curso.numero_vagas
                );
                // adicionando ID ao objeto
                novoCurso.setIdCurso(curso.id_curso);

                // adicionando um curso a lista 
                listaDeCursos.push(novoCurso);
            });

            // retornando a lista de cursos para quem chamou a função
            return listaDeCursos;
    
        } catch (error) {
            // exibe detalhes do erro
            console.log(`Erro ao acessar o model: ${error}`);
            // retorna um valor nulo
            return null;        
        }
    }

    /**
     * Realiza o cadastro de um curso no banco de dados.
     * 
     * @param curso obejto que contem as infromações de um curso.
     * @returns Boolean que indica se o cadastro foi bem sucedido
     */
    static async cadastrarCurso(curso: Curso): Promise<boolean> {
        try {
            // Cria uma consulta para inserir o registro de um aluno no banco de dados.
            const queryInsertCurso = `INSERT INTO curso (nomeCurso, cargaHorariaTotal, duracaoSemestres, departamento, turno, numeroVagas)
                                      VALUES ('${curso.getNomeCurso().toUpperCase()}}',
                                              '${curso.getCargaHorariaTotal().toUpperCase()}',
                                              '${curso.getDuracaoSemestres().toUpperCase()}',
                                              '${curso.getDepartamento().toUpperCase()}',
                                              '${curso.getTurno().toUpperCase()}',
                                              '${curso.getNumeroVagas()}) 
                                      RETURNING id_curso;`
            
            // executa a query no banco de dados e armazena a resposta 
            const respostaBD = await database.query(queryInsertCurso);

            // verifica se a quantidade de linahs modificadas é diferente de 0
            if(respostaBD.rowCount != 0) {
                console.log(`Curso cadastrado com sucesso! ID do Curso: ${respostaBD.rows[0].id_curso}`);
                // 'true' para cadastro bem-sucedido
                return true;
            }
            // 'false' para cadastro não feito
            return false;

          // tratando o erro.  
        } catch (error) {
            console.log('Erro ao cadastrar o curso. Verifique os logs para mais detalhes.');
            console.log(error);
            return false;
        }
    }

    
}