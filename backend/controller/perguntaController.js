import { promises as fs } from "fs";

const { readFile, writeFile } = fs;

const create = async (fileName, pergunta) => {
  try {
    const data = JSON.parse( await readFile(fileName));
    pergunta = {
      id: data.nextId++,
      titulo: pergunta.titulo,
      questionarioId: pergunta.questionarioId
    };
    data.perguntas.push(pergunta);
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
      const perguntas = data.perguntas;
      return perguntas;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
}

const getAllId = async (id, fileName) => {
  try {
    const data = JSON.parse(await readFile(fileName));
    if(data.perguntas){  
      const perguntas = data.perguntas.filter(pergunta => Number(pergunta.questionarioId) === id);
      return perguntas;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

export { create, getAll, getAllId };