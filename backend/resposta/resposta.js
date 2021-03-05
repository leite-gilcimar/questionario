import express from 'express';
import { create, getAll, getAllUsuarioId, getAllQuestionarioId } from '../controller/respostaController.js';

const router = express.Router();

router.post('/', (req,res) => {
  let resposta = req.body;
  const { texto , localizacao, data, usuarioId, questionarioId } = resposta;
  if(!texto && !localizacao && !data, !usuarioId && !questionarioId){
    res.send('Texto, localicazação, data, id usuario, id questionario obrigatório.');
  }
  if(create(global.fileResposta, resposta)){
    res.send('Resposta criado com sucesso.');
  }else{
    res.send('Error ao criar o resposta!');
  }
});

router.get('/', async (req, res) => {
  const respostas = await getAll(global.fileResposta);
  console.log(respostas);
  if(respostas !== null){
    res.send(respostas);
  }else{
    res.send('Error ao coletar os resposta.');
  }
});

router.get('/usuario/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const info = await getAllUsuarioId(id, global.fileResposta);
  res.send(info);
});
router.get('/questionario/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const info = await getAllQuestionarioId(id, global.fileResposta);
  res.send(info);
});

export default router;