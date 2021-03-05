import express from 'express';
import { create, getAll, getAllId } from '../controller/perguntaController.js';

const router = express.Router();

router.post('/', (req,res) => {
  let pergunta = req.body;
  if(!pergunta.titulo && pergunta.questionarioId){
    res.send("Título e questionarioId é obrigatório.");
  }
  if(create(global.filePergunta, pergunta)){
    res.send('pergunta criado com sucesso.');
  }else{
    res.send('Error ao criar o pergunta!');
  }
});

router.get('/', async (req, res) => {
  const perguntas = await getAll(global.filePergunta);
  console.log(perguntas);
  if(perguntas !== null){
    res.send(perguntas);
  }else{
    res.send('Error ao coletar os pergunta.');
  }
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  console.log(id);
  const info = await getAllId(id, global.filePergunta);
  res.send(info);
})

export default router;