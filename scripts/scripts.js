// função para renderizar a página 1 da tela 3
function renderCreateQuizPage() {
  const containerDiv = document.querySelector('.container');
  const templateHTML = `
  <div class="screen-3-1">
    <h2 class="heading">Comece pelo começo</h2>

    <div class="form form-info">
      <input type="text" placeholder="Título do seu quizz" class="quizz-info" id="quizz-title">
      <input type="text" placeholder="URL da imagem do seu quizz" class="quizz-info" id="quizz-url">
      <input type="text" placeholder="Quantidade de perguntas do quizz" class="quizz-info" id="quizz-amount">
      <input type="text" placeholder="Quantidade de níveis do quizz" class="quizz-info" id="quizz-level">
    </div>

    <button type="button" class="btn">
      Prosseguir pra criar perguntas
    </button>
  </div>
  `;

  containerDiv.innerHTML += templateHTML;
}

// função para renderizar a página 2 da tela 3
function renderCreateQuizPage2() {
  const containerDiv = document.querySelector('.container');
  const templateHTML = `
  <div class="screen-3-2">
    <h2 class="heading">Crie suas perguntas</h2>

    <div class="form form-questions active">
      <div class="form-header">
        <h3 class="form-heading">Pergunta 1</h3>
        <img src="./images/edit.svg" alt="" class="edit-icon">
      </div>

      <div class="form-content">
        <div class="question-detail">
          <input type="text" placeholder="Texto da pergunta" id="quizz-text" class="quizz-input">
          <input type="text" placeholder="Cor de fundo da pergunta" id="quizz-color" class="quizz-input">
        </div>

        <div class="question-correct-answer">
          <h3 class="form-heading-correct-answer">Resposta correta</h3>
          <input type="text" placeholder="Resposta correta" id="quizz-correct-text" class="quizz-input">
          <input type="text" placeholder="URL da imagem" id="quizz-correct-image" class="quizz-input">
        </div>

        <div class="question-incorrect-answers">
          <h3 class="form-heading-correct-answer">Respostas incorretas</h3>
          <div class="input-incorrect-answer">
            <input type="text" placeholder="Resposta incorreta 1" id="quizz-incorrect-text-one" class="quizz-input">
            <input type="text" placeholder="URL da imagem 1" id="quizz-incorrect-image-one" class="quizz-input">
          </div>
          <div class="input-incorrect-answer">
            <input type="text" placeholder="Resposta incorreta 2" id="quizz-incorrect-text-two" class="quizz-input">
            <input type="text" placeholder="URL da imagem 2" id="quizz-incorrect-image-two" class="quizz-input">
          </div>
          <div class="input-incorrect-answer">
            <input type="text" placeholder="Resposta incorreta 3" id="quizz-incorrect-text-three" class="quizz-input">
            <input type="text" placeholder="URL da imagem 3" id="quizz-incorrect-image-three" class="quizz-input">
          </div>
        </div>
      </div>
    </div>

    <button type="button" class="btn">
      Prosseguir pra criar perguntas
    </button>
  </div>
  `;

  containerDiv.innerHTML += templateHTML;
}
