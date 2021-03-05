import express from 'express';
import { promises as fs } from 'fs';
import cors from 'cors';
import usuarioRouter from './usuario/usuario.js';
import questionarioRouter from './questionario/questionario.js';
import perguntaRouter from './pergunta/pergunta.js';
import respostaRouter from './resposta/resposta.js';

const app = express();
const { readFile, writeFile } = fs; 

global.fileUsuario = "./usuario/usuarios.json";
global.fileQuestionario = "./questionario/questionarios.json";
global.filePergunta = "./pergunta/perguntas.json";
global.fileResposta = "./resposta/respostas.json";

app.set("PORT", 3001);
app.use(express.json());
app.use(cors());
console.log(`Api ${app.get("PORT")}`);

app.use('/usuario', usuarioRouter);
app.use('/questionario', questionarioRouter);
app.use('/pergunta', perguntaRouter);
app.use('/resposta', respostaRouter);

const initialJsonUsuarios = {
  nextId: 1,
  usuarios: []
};
const initialJsonQuestionarios = {
  nextId: 1,
  questionarios: []
};
const initialJsonPerguntas = {
  nextId: 1,
  perguntas: []
};
const initialJsonRespostas = {
  nextId: 1,
  respostas: []
};
app.listen(app.get('PORT'), async () => {
  try {
    await readFile(global.fileUsuario);
    await readFile(global.fileQuestionario);
    await readFile(global.filePergunta);
    await readFile(global.fileResposta);
    console.log('API Started.');
  } catch (error) {
    createJson(global.fileUsuario, initialJsonUsuarios);
    createJson(global.fileQuestionario, initialJsonQuestionarios);
    createJson(global.filePergunta, initialJsonPerguntas);
    createJson(global.fileResposta, initialJsonRespostas);
    console.log(error);
  }
});

const createJson = async (filename, jsonObject) => {
  try {
    await writeFile(filename, JSON.stringify(jsonObject));
  } catch (error) {
    console.log(error);
  }
}