window.addEventListener('load', start);

const questionarios = [
  { "nome": "javascript", "questionario" : [
    { 0: "Nome real?", "resposta": ''},
    { 1: "Qual é a versão atual?", "resposta": ''}
  ]}
];

function start() {

  preventForm();
}

function preventForm(){
  function handleForm(event){
    event.PreventDefault();
  }
  let form = document.querySelector("form");
  form.addEventListener("submit", handleForm);
}

function handleQuest(){
  let qtd = 0;
  let nome = document.querySelector("#nome");
  let pergunta = document.querySelector("#pergunta");
  let existQuest = questionarios.find( questionario => questionario.nome === nome.value);
  console.log(existQuest);
  if(existQuest instanceof Object){
    console.log("achou");
  }else{
    console.log("Criando novo questionário.");
  }
  
  console.log(questionarios);
}