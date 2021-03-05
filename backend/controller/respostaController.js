import { promises as fs } from "fs";

const { readFile, writeFile } = fs;

const create = async (fileName, resposta) => {
  try {
    const data = JSON.parse( await readFile(fileName));
    resposta = {
      id: data.nextId++,
      texto: resposta.texto,
      localizacao: resposta.localizacao,
      data: resposta.data,
      usuarioId: resposta.usuarioId,
      questionarioId: resposta.questionarioId
    };
    data.respostas.push(resposta);
    await writeFile(fileName, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.log(error);
  }
  return false;
}

const getAll = async (fileName) => {
  try {
    const data = JSON.parse( await readFile(fileName));
    if(data){
      const respostas = data.respostas;
      return respostas;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
}

const getAllUsuarioId = async (id, fileName) => {
  try {
    const data = JSON.parse(await readFile(fileName));
    if(data.respostas){  
      const respostas = data.respostas.filter(resposta => Number(resposta.usuarioId) === id);
      return respostas;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}
const getAllQuestionarioId = async (id, fileName) => {
  try {
    const data = JSON.parse(await readFile(fileName));
    if(data.respostas){  
      const respostas = data.respostas.filter(resposta => Number(resposta.questionarioId) === id);
      return respostas;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

export { create, getAll, getAllUsuarioId, getAllQuestionarioId };