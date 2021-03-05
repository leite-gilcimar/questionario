import { promises as fs } from "fs";

const { readFile, writeFile } = fs;

const create = async (fileName, questionario) => {
  try {
    const data = JSON.parse( await readFile(fileName));
    questionario = {
      id: data.nextId++,
      nome: questionario.nome
    };
    data.questionarios.push(questionario);
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
      const questionarios = data.questionarios;
      return questionarios;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
}

export { create, getAll };