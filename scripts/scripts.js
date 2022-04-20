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
