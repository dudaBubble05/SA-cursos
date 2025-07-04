import { Router } from "express"
import AlunoController from "./controller/AlunoController";
import CursoController from "./controller/CursoController";
import MatriculaController from "./controller/MatriculaController";
import { Aluno } from "./model/Aluno";



const router = Router();

router.get("/", (_req, res) => {
    res.json({ mensagem: "Bem-vindo ao SA Cursos" })
});


// CRUD Aluno
router.get("/listar/alunos", AlunoController.todos);  // rota de listagem de alunos
router.post("/novo/aluno", AlunoController.cadastrar); // Rota de cadastro de alunos
router.delete("/deletar/aluno/:idAluno", AlunoController.remover); // rota para deletar um aluno
router.put("/atualizar/aluno/:idAluno", AlunoController.atualizar) // rota que atualiza um aluno
 
// CRUD Curso
router.get("/listar/cursos", CursoController.todos); // rota de listagem de cursos
router.post("/novo/curso", CursoController.novo); // Rota de cadastro de cursos
router.delete("/deletar/curso/:idCurso", CursoController.remover); // rota para deletar um curso
router.put("/atualizar/curso/:idCurso", CursoController.atualizar) // rota que atualiza um curso
 

// CRUD Matricula
router.get("/listar/matriculas", MatriculaController.todos);


export { router }