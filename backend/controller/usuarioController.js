import { promises as fs } from "fs";

const { readFile, writeFile } = fs;

const create = async (fileName, usuario) => {
  try {
    const data = JSON.parse( await readFile(fileName));
    usuario = {
      id: data.nextId++,
      nome: usuario.nome
    };
    data.usuarios.push(usuario);
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
      const usuarios = data.usuarios;
      return usuarios;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
}

export { create, getAll };