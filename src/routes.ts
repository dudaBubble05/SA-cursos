import { Router } from "express"
import AlunoController from "./controller/AlunoController";
import CursoController from "./controller/CursoController";
import MatriculaController from "./controller/MatriculaController";



const router = Router();

router.get("/", (_req, res) => {
    res.json({ mensagem: "Bem-vindo ao SA Cursos" })
});


// CRUD Aluno
router.get("/listar/alunos", AlunoController.todos);  // rota de listagem de alunos


// CRUD Curso
router.get("/listar/cursos", CursoController.todos); // rota de listagem de cursos


// CRUD Matricula
router.get("/listar/matriculas", MatriculaController.todos);


export { router }