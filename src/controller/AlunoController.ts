import { Request, Response } from "express";
import { Aluno } from '../model/Aluno';

interface AlunoDTO {
    idAluno: number;
    ra: string;
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

    /**
     * Cadastro de um novo aluno.
     * @param req
     * @param res
     * @returns Mensagem de sucesso ou erro em JSON
     */
    static async cadastrar(req: Request, res: Response): Promise <any>{
        try {
            // desestruturando objeto d front-end
            const recebido: AlunoDTO = req.body;

            //Instanciando objeto aluno
            const novoAluno = new Aluno (
                recebido.ra,
                recebido.nome,
                recebido.sobrenome,
                recebido.dataNascimento,
                recebido.endereco ?? '',
                recebido.email ?? "",
                recebido.celular
            );

            // chama o método para o aluno no banco de dados
            const result = await Aluno.cadastradasAluno(novoAluno);

            // Verfica se a query foi executada com sucesso
            if(result) {
                return res.status(200).json(`Aluno cadastrado com sucesso`);
            } else {
                return res.status(404).json(`Não foi possível cadastrar o aluno no banco de dados`);
            }
        } catch (error) {
            console.log(`Erro ao cadastrar aluno: ${error}`)
            return  res.status(404).json(`Erro ao cadastrar aluno`);
        }
    }
}

export default AlunoController;