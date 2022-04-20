// Variaveis globais e constantes
const API = "https://mock-api.driven.com.br/api/v6/buzzquizz";

// função para renderizar a página 1 da tela 3
function renderCreateQuizPage() {
  const containerDiv = document.querySelector('.container');
  const templateHTML = `
  <h2 class="heading">Comece pelo começo</h2>

  <div class="form-start">
    <input type="text" placeholder="Título do seu quizz" class="quizz-title" id="quizz-title">
    <input type="text" placeholder="URL da imagem do seu quizz" class="quizz-url" id="quizz-url">
    <input type="text" placeholder="Quantidade de perguntas do quizz" class="quizz-amount" id="quizz-amount">
    <input type="text" placeholder="Quantidade de níveis do quizz" class="quizz-level" id="quizz-level">
  </div>

  <button type="button" class="btn">
    Prosseguir pra criar perguntas
  </button>
  `;

  containerDiv.innerHTML += templateHTML;
}

// funções para renderizar seção todos os quizzes - tela inicial
function insertQuizz (quizz, section) {
  console.log("teste", quizz, section, "teste");
  section.innerHTML += `<img scr="${quizz.image}">`;
}

function renderAllQuizzes() {
  const quizzes = document.querySelector(".all-quizzes .quizzes");
  console.log(quizzes);
  const promise = axios.get(`${API}/quizzes`);

  promise.then(response => response.data.map(insertQuizz.bind(null, quizzes)));
}

renderAllQuizzes()