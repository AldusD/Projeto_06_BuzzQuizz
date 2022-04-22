// Variaveis globais e constantes
const API = 'https://mock-api.driven.com.br/api/v6/buzzquizz';

let inputTitleValue = '';
let inputURLValue = '';
let inputAmountValue = 0;
let inputLevelValue = 0;

let quizzInfos = {};
let quizzData = {};
const questions = [];

// função para renderizar a página 1 da tela 3
function renderCreateQuizPage() {
  const containerDiv = document.querySelector('.container');
  const templateHTML = `
  <div class="screen-3-1">
    <h2 class="heading">Comece pelo começo</h2>

    <div class="form form-info">
      <input type="text" placeholder="Título do seu quizz" class="quizz-info" id="quizz-title">
      <input type="text" placeholder="URL da imagem do seu quizz" class="quizz-info" id="quizz-url">
      <input type="number" placeholder="Quantidade de perguntas do quizz" class="quizz-info" id="quizz-amount">
      <input type="number" placeholder="Quantidade de níveis do quizz" class="quizz-info" id="quizz-level">
    </div>

    <button type="button" class="btn" onclick="validateInputs()">
      Prosseguir pra criar perguntas
    </button>
  </div>
  `;

  containerDiv.innerHTML += templateHTML;
}

function validateInputs() {
  const inputTitle = document.getElementById('quizz-title');
  const inputURL = document.getElementById('quizz-url');
  const inputAmount = document.getElementById('quizz-amount');
  const inputLevel = document.getElementById('quizz-level');
  inputTitleValue = inputTitle.value;
  inputAmountValue = Number(inputAmount.value);
  inputLevelValue = Number(inputLevel.value);

  try {
    inputURLValue = new URL(inputURL.value);
  } catch (error) {
    showMessageError('Preencha os dados corretamente');
    return;
  }

  if (
    inputTitleValue.length < 20 ||
    inputTitleValue.length > 65 ||
    inputAmountValue < 3 ||
    inputLevelValue < 2
  ) {
    showMessageError('Preencha os dados corretamente');
    return;
  } else {
    console.log('td validado');

    quizzInfos = {
      title: inputTitleValue,
      image: inputURLValue.href,
      questionsAmount: inputAmountValue,
      levelsAmount: inputLevelValue,
    };

    console.log(quizzInfos);
    renderCreateQuizPage2();
  }
}

function showMessageError(message) {
  alert(message);
}

// função para renderizar a página 2 da tela 3
function renderCreateQuizPage2() {
  const containerDiv = document.querySelector('.container');
  const templateHTML = `
  <div class="screen-3-2">
    <h2 class="heading">Crie suas perguntas</h2>

    <div class="forms">
      <div class="form form-questions active">
        <div class="form-header" onclick="openCloseForm(this)">
          <h3 class="form-heading">Pergunta 1</h3>
          <img src="./images/edit.svg" alt="" class="edit-icon">
        </div>

        <div class="form-content">
          <div class="question-detail">
            <input type="text" placeholder="Texto da pergunta" id="quizz-text" class="quizz-input input-question-title">
            <input type="text" placeholder="Cor de fundo da pergunta" id="quizz-color" class="quizz-input input-question-color">
          </div>

          <div class="question-correct-answer answer">
            <h3 class="form-heading-correct-answer">Resposta correta</h3>
            <input type="text" placeholder="Resposta correta" id="quizz-correct-text" class="quizz-input input-correct-answer">
            <input type="text" placeholder="URL da imagem" id="quizz-correct-image" class="quizz-input input-correct-url">
          </div>

          <div class="question-incorrect-answers">
            <h3 class="form-heading-correct-answer">Respostas incorretas</h3>
            <div class="question-incorrect-answer answer">
              <input type="text" placeholder="Resposta incorreta 1" id="quizz-incorrect-text-one" class="quizz-input input-incorrect-answer">
              <input type="text" placeholder="URL da imagem 1" id="quizz-incorrect-image-one" class="quizz-input input-incorrect-url">
            </div>
            <div class="question-incorrect-answer answer">
              <input type="text" placeholder="Resposta incorreta 2" id="quizz-incorrect-text-two" class="quizz-input input-incorrect-answer">
              <input type="text" placeholder="URL da imagem 2" id="quizz-incorrect-image-two" class="quizz-input input-incorrect-url">
            </div>
            <div class="question-incorrect-answer answer">
              <input type="text" placeholder="Resposta incorreta 3" id="quizz-incorrect-text-three" class="quizz-input input-incorrect-answer">
              <input type="text" placeholder="URL da imagem 3" id="quizz-incorrect-image-three" class="quizz-input input-incorrect-url">
            </div>
          </div>
        </div>
      </div>
    </div>

    <button type="button" class="btn" onclick="validateQuestionsInputs()">
      Prosseguir pra criar níveis
    </button>
  </div>
  `;

  containerDiv.innerHTML += templateHTML;
  renderFormQuestions(quizzInfos.questionsAmount);
}

function openCloseForm(form) {
  form.parentNode.classList.toggle('active');
}

function validateQuestionsInputs() {
  getAllQuestionsInput();

  // terminar ainda validação toda
  const questionsListElement = Array.from(
    document.querySelectorAll('#quizz-text')
  );
  const questionsArray = questionsListElement.map(
    (questionElement) => questionElement.value
  );

  const hexadecimalRegExp = '/^#([0-9A-Fa-f]{3}){1,2}$/i';
}

function getAllQuestionsInput() {
  const allFormElement = Array.from(
    document.querySelectorAll('.form-questions')
  );

  allFormElement.forEach((formElement) => {
    const questionTitle = formElement.querySelector('.input-question-title');
    const questionColor = formElement.querySelector('.input-question-color');

    const correctAnswerTitle = formElement.querySelector(
      '.input-correct-answer'
    );
    const correctAnswerURL = formElement.querySelector('.input-correct-url');

    const answers = [];

    const answerObject = {
      text: correctAnswerTitle.value,
      image: correctAnswerURL.value,
      isCorrectAnswer: true,
    };

    answers.push(answerObject);

    const allIncorrectAnswersElement = Array.from(
      formElement.querySelectorAll('.question-incorrect-answer')
    );

    allIncorrectAnswersElement.forEach((incorrectAnswer) => {
      const incorrectAnswerTitle = incorrectAnswer.querySelector(
        '.input-incorrect-answer'
      );
      const incorrectAnswerURL = incorrectAnswer.querySelector(
        '.input-incorrect-url'
      );

      const answerObject = {
        text: incorrectAnswerTitle.value,
        image: incorrectAnswerURL.value,
        isCorrectAnswer: false,
      };

      answers.push(answerObject);
    });

    const questionObject = {
      title: questionTitle.value,
      color: questionColor.value,
      answers,
    };
    questions.push(questionObject);
  });
}

function renderFormQuestions(questionsAmount) {
  const formsElement = document.querySelector('.forms');
  for (let i = 1; i < questionsAmount; i++) {
    const templateForm = `
    <div class="form form-questions">
      <div class="form-header" onclick="openCloseForm(this)">
        <h3 class="form-heading">Pergunta ${i + 1}</h3>
        <img src="./images/edit.svg" alt="" class="edit-icon">
      </div>
  
      <div class="form-content">
        <div class="question-detail">
          <input type="text" placeholder="Texto da pergunta" id="quizz-text" class="quizz-input input-question-title">
          <input type="text" placeholder="Cor de fundo da pergunta" id="quizz-color" class="quizz-input input-question-color">
        </div>
  
        <div class="question-correct-answer answer">
          <h3 class="form-heading-correct-answer">Resposta correta</h3>
          <input type="text" placeholder="Resposta correta" id="quizz-correct-text" class="quizz-input input-correct-answer">
          <input type="text" placeholder="URL da imagem" id="quizz-correct-image" class="quizz-input input-correct-url">
        </div>
  
        <div class="question-incorrect-answers">
          <h3 class="form-heading-correct-answer">Respostas incorretas</h3>
          <div class="question-incorrect-answer answer">
            <input type="text" placeholder="Resposta incorreta 1" id="quizz-incorrect-text-one" class="quizz-input input-incorrect-answer">
            <input type="text" placeholder="URL da imagem 1" id="quizz-incorrect-image-one" class="quizz-input input-incorrect-url">
          </div>
          <div class="question-incorrect-answer answer">
            <input type="text" placeholder="Resposta incorreta 2" id="quizz-incorrect-text-two" class="quizz-input input-incorrect-answer">
            <input type="text" placeholder="URL da imagem 2" id="quizz-incorrect-image-two" class="quizz-input input-incorrect-url">
          </div>
          <div class="question-incorrect-answer answer">
            <input type="text" placeholder="Resposta incorreta 3" id="quizz-incorrect-text-three" class="quizz-input input-incorrect-answer">
            <input type="text" placeholder="URL da imagem 3" id="quizz-incorrect-image-three" class="quizz-input input-incorrect-url">
          </div>
        </div>
      </div>
    </div>
    `;

    formsElement.innerHTML += templateForm;
  }
}

// função para renderizar a página 3 da tela 3
function renderCreateQuizPage3() {
  const containerDiv = document.querySelector('.container');
  const templateHTML = `
  <div class="screen-3-3">
    <h2 class="heading">Agora, decida os níveis</h2>

    <div class="form form-levels active">
      <div class="form-header">
        <h3 class="form-heading">Nível 1</h3>
        <img src="./images/edit.svg" alt="" class="edit-icon">
      </div>

      <div class="form-content">
        <input type="text" placeholder="Título do nível" id="quizz-level-title" class="quizz-input">
        <input type="text" placeholder="% de acerto mínima" id="quizz-level-porcentage" class="quizz-input">
        <input type="text" placeholder="URL da imagem do nível" id="quizz-level-url" class="quizz-input">
        <textarea placeholder="Descrição do nível" id="quizz-level-description" class="quizz-input"></textarea>
      </div>
    </div>

    <button type="button" class="btn">
      Finalizar Quizz
    </button>
  </div>
  `;

  containerDiv.innerHTML += templateHTML;
}

// função para renderizar a página 4 da tela 3
function renderCreateQuizPage4() {
  const containerDiv = document.querySelector('.container');
  const templateHTML = `
  <div class="screen-3-4">
    <h2 class="heading">Seu quizz está pronto!</h2>

    <div class="quizz-success-wrapper">
      <img src="./images/harry.png" alt="" class="quizz-success-image">
      <span class="quizz-success-text">O quão Potterhead é você?</span>
    </div>

    <button type="button" class="btn">
      Acessar Quizz
    </button>

    <button type="button" class="btn go-home">
      Voltar para home
    </button>
  </div>
  `;

  containerDiv.innerHTML += templateHTML;
}

// funções para renderizar seção todos os quizzes - tela inicial
function insertQuizz(quizz, section) {
  // console.log('teste', quizz, section, 'teste');
  section.innerHTML += `<img scr="${quizz.image}">`;
}

function renderAllQuizzes() {
  const quizzes = document.querySelector('.all-quizzes .quizzes');
  // console.log(quizzes);
  const promise = axios.get(`${API}/quizzes`);

  promise.then((response) =>
    response.data.map(insertQuizz.bind(null, quizzes))
  );
}

renderAllQuizzes();
