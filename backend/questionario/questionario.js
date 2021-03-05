import express from 'express';
import { create, getAll } from '../controller/questionarioController.js';

const router = express.Router();

router.post('/', (req,res) => {
  let questionario = req.body;
  if(!questionario.nome ){
    res.send('questionario.nome é obrigatório.');
  }
  if(create(global.fileQuestionario, questionario)){
    res.send('Questionário criado com sucesso.');
  }else{
    res.send('Error ao criar o questionário!');
  }
});

router.get('/', async (req, res) => {
  const questionarios = await getAll(global.fileQuestionario);
  console.log(questionarios);
  if(questionarios !== null){
    res.send(questionarios);
  }else{
    res.send('Error ao coletar os questionário.');
  }
});

export default router;