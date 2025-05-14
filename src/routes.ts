import { Router } from "express"
import AlunoController from "./controller/AlunoController";


const router = Router();

router.get("/", (_req, res) => {
    res.json({ mensagem: "Bem-vindo ao SA Cursos" })
});

router.get

// CRUD Aluno
router.get("/listar/alunos", AlunoController.todos);  // rota de listagem de alunos


export { router }