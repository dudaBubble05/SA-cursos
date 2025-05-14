-- Tabela da entidade Aluno
CREATE TABLE Aluno (
    id_aluno SERIAL PRIMARY KEY,
    ra VARCHAR(7) UNIQUE NOT NULL,
    nome VARCHAR(80) NOT NULL,
    sobrenome VARCHAR(80) NOT NULL,
    data_nascimento DATE,
    endereco VARCHAR(200),
    email VARCHAR(80),
    celular VARCHAR(13) NOT NULL
);

-- Tabela da entidade Curso
CREATE TABLE Curso (
    id_curso SERIAL PRIMARY KEY,
    nome_curso VARCHAR(100),
    carga_horaria_total INT NOT NULL,
    duracao_semestres INT NOT NULL,
    departamento VARCHAR(100) NOT NULL,
    turno VARCHAR(20) NOT NULL,
    numero_vagas INT NOT NULL
);

-- Tabela da entidade Matrícula
CREATE TABLE Matricula ( 
    id_matricula SERIAL PRIMARY KEY,
    id_aluno INT REFERENCES Aluno(id_aluno),
    id_curso INT REFERENCES Curso(id_curso),
    data_matricula DATE NOT NULL,
    status VARCHAR(20)
);


-- INSERT DAS TABELAS Aluno, Curso e Matrícula, respectivamente

INSERT INTO Aluno (ra, nome, sobrenome, data_nascimento, endereco, email, celular)
VALUES 
('1234567', 'Neil', 'Josten', '1988-01-19', 'Rua das Raposas, 10', 'neil.abram@email.com', '11987654321'),
('2345678', 'Andrew', 'Minyard', '1986-11-04', 'Av. café, 03', 'drew.minyard@email.com', '11981234567'),
('3456789', 'Renee', 'Walker', '1982-09-27', 'Rua das Flores, 789', 'nathalie.walker@email.com', '11984561234'),
('4567890', 'Alisson', 'Reynolds', '1985-07-16', 'Rua da Moda, 123', 'ally.reynolds@email.com', '11983456789');


INSERT INTO Curso (nome_curso, carga_horaria_total, duracao_semestres, departamento, turno, numero_vagas)
VALUES
('Engenharia de Software', 3200, 8, 'Tecnologia', 'Noturno', 60),
('Administração', 3000, 8, 'Gestão', 'Matutino', 50),
('Direito', 3600, 10, 'Ciências Jurídicas', 'Noturno', 80),
('Enfermagem', 4000, 10, 'Saúde', 'Integral', 40);


INSERT INTO Matricula (id_aluno, id_curso, data_matricula, status)
VALUES
(1, 1, '2024-02-01', 'Ativa'),
(2, 2, '2024-02-03', 'Ativa'),
(3, 1, '2024-02-05', 'Trancada'),
(4, 4, '2024-02-07', 'Ativa');


-- SELECT das Tabelas Aluno, Curso e Matrícula, respectivamente
SELECT * FROM Aluno;
SELECT * FROM Curso;
SELECT * FROM Matricula;