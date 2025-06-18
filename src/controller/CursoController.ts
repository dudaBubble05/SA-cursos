import { Request, Response } from "express";
import { Curso } from "../model/Curso";

interface CursoDTO {
    idCurso: number;
    nomeCurso: string;
    cargaHorariaTotal: string;
    duracaoSemestres: string;
    departamento: string;
    turno: string;
    numeroVagas: number;
}

// Controlador para operações relacionadas aos cursos
class CursoController extends Curso {
    static async todos(req: Request, res: Response) {
        try {
            const listaDeCursos = await Curso.listarCursos();

            res.status(200).json(listaDeCursos);
        } catch (error) {
            console.log(`Erro ao acessar métodos de listagem: ${error}`);

            res.status(400).json("Erro ao recuperar as informações do curso.")
        }
    }

    /**
     * Método controller para cadastrar um curso.
     * @param req
     * @param res
     * @returns Mensagem de sucesso ou erro em JSON
     * @throws Lança um erro caso ocorra um erro na execução da consulta
     */
    static async novo(req: Request, res: Response): Promise<any> {
        try {
            // recupera as informações do corpo da requisição e colocando na interface cursoDTO
            const cursoRecebido: CursoDTO = req.body;

            // instanciando um objeto do tipo curso com as informações recebidas
            const novoCurso = new Curso (
                cursoRecebido.nomeCurso,
                cursoRecebido.cargaHorariaTotal,
                cursoRecebido.duracaoSemestres,
                cursoRecebido.departamento,
                cursoRecebido.turno,
                cursoRecebido.numeroVagas
            );

            // chama a função de cadastro passando como um parâmetro
            const respostaModelo = await Curso.cadastrarCurso(novoCurso);

            // verifica a resposta da função.
            if(respostaModelo) {
                return res.status(200).json({mensagem: "Curso cadastrado com sucesso."});
            } else {
                return res.status(400).json({mensagem: "Erro ao cadastrar o curso. Entre em contato com administrador do sistema."});
            }

        // tratando o possível erro do sistema    
        } catch (error) {
            console.log("Erro ao cadastrar o curso. ${error}");
            return res.status(400).json({mensagem: "Não foi possível cadastrar o curso."})
        }
    }

    /**
     * Remove um curso permanentemente do banco de dados.
     * @param req
     * @param res
     * @returns Mensagem de sucesso ou erro em JSON
     * @throws Lança um erro caso ocorra um erro na execução da consulta
     */
    static async remover(req: Request, res: Response): Promise<any> {
        try {
            // recupera o ID do curso a ser removido.
            const idCurso = parseInt(req.params.idLivro as string);

            // chama a função do modelo e armazena a resposta 
            const respostaModelo = await Curso.removerCurso(idCurso);

            // verifica se a resposta do modelo foi verdadeira
            if(respostaModelo) {
                return res.status(200).json({mensagem: "Curso rmovido com sucesso."});
            } else {
                return res.status(400).json({mensagem: "Erro ao remover o curso. Entre em contato com administrador do sistema."});
            }
        // trata de qualquer erro que aconteça durante o processo   
        } catch (error) {
            console.log(`Erro ao remover curso. ${error}`);
            return res.status(400).json({mensagem: "Erro ao remover o curso. Entre em contato com administrador do sistema."});
        }
    }
}

export default CursoController;