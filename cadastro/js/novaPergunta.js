window.addEventListener('load', () =>{
  showQuestionarios();
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

async function criarPergunta(){
  let id = document.querySelector('#idQuestionario');
  let pergunta = document.querySelector('#pergunta');
  console.log(id.value);
  const url = 'http://localhost:3001/pergunta';
  const result = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({titulo: pergunta.value, questionarioId: id.value})
  });
  //const json = await result.json();
}