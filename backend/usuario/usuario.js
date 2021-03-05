import express from 'express';
import { create, getAll } from '../controller/usuarioController.js';

const router = express.Router();

router.post('/', (req,res) => {
  let usuario = req.body;
  if(!usuario.nome){
    res.send('usuario.nome é obrigatório.');
  }
  if(create(global.fileUsuario, usuario)){
    res.send('Usuario criado com sucesso.');
  }else{
    res.send('Error ao criar o usuário!');
  }
});

router.get('/', async (req, res) => {
  const usuarios = await getAll(global.fileUsuario);
  console.log(usuarios);
  if(usuarios !== null){
    res.send(usuarios);
  }else{
    res.send('Error ao coletar os usuários.');
  }
});

export default router;