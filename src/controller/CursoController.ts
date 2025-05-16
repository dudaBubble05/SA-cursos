import { Request, Response } from "express";
import { Curso } from "../model/Curso";

interface CursoDTO {
    idCurso: number;
    nomeCurso: number;
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
}

export default CursoController;