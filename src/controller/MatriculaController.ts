import { Matricula } from "../model/Matricula";
import { Request, Response } from "express";

/**
 * Interface DTO Matricula
 * Define os atributos a serem recebidos nas requisições
 */
interface MatriculaDTO {
    idMatricula: number;
    idAluno: number;
    idCurso: number;
    dataMatricula: Date;
}

class MatriculaController {
    /**
     * Método para lsitar todos as matriculas.
     * Retorna um array de matriculas com informações de alunos e livros.
     */
    static async todos(req: Request, res: Response): Promise<any> {
        try {
            // chama o método listarMatricula
            const listaDeMatriculas = await Matricula.listarMatriculas();

            // Verifica se houver retorno de dados
            if (!listaDeMatriculas || listaDeMatriculas.length == 0) {
                return res.status(404).json({ message: 'Nenhuma matrícula encontrada'});
            }

            //retorna lista de matriculas com status 200 (ok)
            return res.status(200).json(listaDeMatriculas)

        } catch (error) {
            // em caso de erro, retorna o erro com status 500 (erro do servidor)
            console.error('Erro ao lista matriculas', error);
            return res.status(500).json({ message: 'Erro ao listar matrículas.' });
        }
    }
}

export default MatriculaController;