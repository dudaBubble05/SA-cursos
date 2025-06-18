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

    /**
     * Remove um aluno do banco de dados baseado no ID fornecido.
     * @param req
     * @param res
     * @returns retorna uma promise que se true, a remoção foi bem sucedida, e false se não.
     * @throws Lança um erro caso ocorra um erro na execução da consulta
     */
    static async remover(req: Request, res: Response): Promise<any> {
        try {
            const idAluno = parseInt(req.params.idAluno as string);
            const respostaModelo = await Aluno.removerAluno
        } catch (error) {
            
        }
    }

    /**
     * Atualiza um aluno do banco de dados.
     * @param req
     * @param res
     * @returns retorna uma promise que se true, a remoção foi bem sucedida, e false se não.
     * @throws Lança um erro caso ocorra um erro na execução da consulta.
     */
    static async atualizar(req: Request, res: Response): Promise<any> {
        try {
            const AlunoRecebido: AlunoDTO = req.body;

            const idAlunoRecebido = parseInt(req.params.idAluno);

            const alunoAtualizado = new Aluno (
                AlunoRecebido.nome,
                AlunoRecebido.sobrenome,
                AlunoRecebido.dataNascimento,
                AlunoRecebido.endereco,
                AlunoRecebido.email,
                AlunoRecebido.celular
            );

            alunoAtualizado.setIdAluno(idAlunoRecebido);

            const respostaModelo = await Aluno.atualizarAluno(alunoAtualizado);

            if(respostaModelo) {
                return res.status(200).json({mensagem: "Aluno atualizado com sucesso!"});
            } else {
                return res.status(400).json({mensagem: "Não foi possível remover o aluno. Entre em contato com o administrador do sistema."});
            }
        } catch (error) {
            
        }
    }
}

export default AlunoController;