window.addEventListener('load', () =>{
  showQuestionarios();
  document.getElementById('formButton').addEventListener('click', (event) =>{
    event.preventDefault();
  });
});

async function showQuestionarios(){
  const url = 'http://localhost:3001/questionario';
  const result = await fetch(url);
  const json = await result.json()
  const tagSelect = document.querySelector('#idQuestionario');
  for(let i = 0; i < json.length; i++){
    let option = document.createElement('option');
    option.value = json[i].id;
    option.text = json[i].nome;
    tagSelect.appendChild(option);
  }

}

async function responder(){
  let id = document.getElementById('idQuestionario');
  const url = `http://localhost:3001/pergunta/${id.value}`;
  const result = await fetch(url);
  const json = await result.json();
  console.log(json);
  const perguntas = document.getElementById('idPerguntas');
  for(let i = 0; i < json.length; i++){
    let div = document.createElement('div');
    div.innerHTML = `
      <div class="form-row" >
        <label for="pergunta">${json[i].titulo}</label>
        <input type="text" class="form-control" id="resposta${i}">
      </div>
    `;
    perguntas.appendChild(div);
  }
  
}
async function aplicar(){
  let idQuestionario = document.getElementById('idQuestionario');
  const url = `http://localhost:3001/pergunta/${idQuestionario.value}`;
  const result = await fetch(url);
  const json = await result.json();
  for(let i = 0; i < json.length; i++){
    let resposta = document.getElementById(`resposta${i}`);
    console.log(resposta.value);
    navigator.geolocation.getCurrentPosition((position) => {
      responderPergunta(1, idQuestionario.value, resposta.value, new Array({latitude: position.coords.latitude, longitude: position.coords.longitude}));
    });
  }
}

async function responderPergunta(usuarioId, questionarioId, texto, localizacao){
  
  const url = 'http://localhost:3001/resposta';
  const result = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      texto: texto, 
      localizacao: localizacao, 
      data: new Date(), usuarioId: usuarioId, questionarioId: questionarioId})
  });
  //const json = await result.json();
}

async function visualizar(){
  let id = document.getElementById('idQuestionario');
  const url = `http://localhost:3001/pergunta/${id.value}`;
  const result = await fetch(url);
  const perguntasJson = await result.json();
  
  const url2 = `http://localhost:3001/resposta/usuario/1`;
  const result2 = await fetch(url2);
  const respostasJson = await result2.json();
  const respostas = respostasJson.filter( resposta => resposta.questionarioId === id.value);
  console.log(perguntasJson);
  const perguntas = document.getElementById('idPerguntas');
  for(let i = 0; i < perguntasJson.length; i++){
    let div = document.createElement('div');
    div.innerHTML = `
      <div class="form-row" >
        <label for="pergunta">${perguntasJson[i].titulo}</label>
        <input type="text" class="form-control" id="resposta${i}" value="${respostas[i].texto}">
      </div>
    `;
    perguntas.appendChild(div);
  }
}