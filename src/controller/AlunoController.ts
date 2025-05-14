import { Request, Response } from "express";
import { Aluno } from '../model/Aluno';

interface AlunoDTO {
    idAluno: number;
    ra: number;
    nome: string;
    sobrenome: string;
    dataNascimento: Date;
    endereco: string;
    email: string;
    celular: string;
}

// Controlador para operações relacionadas aos alunos
class AlunoController extends Aluno {
    static async todos(req: Request, res: Response) {
        try {
            const listaDeAlunos = await Aluno.listarAlunos();

            res.status(200).json(listaDeAlunos);
        } catch (error) {
            console.log(`Erro ao acessar métodos de listagem: ${error}`);

            res.status(400).json("Erro ao recuperar as informações do aluno.")
        }
    }
}

export default AlunoController;