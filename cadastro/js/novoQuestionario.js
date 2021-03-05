window.addEventListener('load', () =>{
  
});

async function criarNome(){
  const nome = document.querySelector('#nome');
  const url = 'http://localhost:3001/questionario';
  const result = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({nome: nome.value})
  });
  const json = await result.json();
  
}