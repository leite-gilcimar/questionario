window.addEventListener('load', () =>{
  getQuestionarios();
});

async function getQuestionarios(){
  const url = 'http://localhost:3001/questionario';
  const result = await fetch(url);
  const json = await result.json()
  const qtd = json.length;
  const tagQtdQuest = document.querySelector('#qtdQuestionarios');
  tagQtdQuest.textContent = `Quantidade de questionários: ${qtd}`;
  const tagQtdSelecionado = document.querySelector('#qtdDesejado');
  tagQtdSelecionado.setAttribute('max', qtd);
}