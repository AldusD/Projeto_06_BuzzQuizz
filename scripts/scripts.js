// Variaveis globais e constantes
const API = 'https://mock-api.driven.com.br/api/v6/buzzquizz';

let pontuation = 0;
let solvingQuizz;

let inputTitleValue = '';
let inputURLValue = '';
let inputAmountValue = 0;
let inputLevelValue = 0;

let levelURLValue = '';
let correctAnswerURLValue = '';
let incorrectAnswerURLValue = '';

let quizzInfos = {};
let quizzData = {};
const questions = [];
const levels = [];

let hasError = false;

let idQuizzUser = 0;
let userQuizzCreated = {};
const idQuizzUserArray = [];

// atulizando globalmente o array pra ter todos os ids do usuario
function getLocalIdQuizzUser() {
  const idsJSON = localStorage.getItem('idQuizz');
  const idsArray = JSON.parse(idsJSON);

  idQuizzUserArray.push(...idsArray);
}

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

  containerDiv.innerHTML = templateHTML;
  renderFormQuestions(quizzInfos.questionsAmount);
}

function openCloseForm(form) {
  form.parentNode.classList.toggle('active');
}

function validateQuestionsInputs() {
  getAllQuestionsInput();

  if (!hasError) {
    renderCreateQuizPage3();
  }
}

function getAllQuestionsInput() {
  hasError = false;
  const questionsData = [];
  const allFormElement = Array.from(
    document.querySelectorAll('.form-questions')
  );

  for (let i = 0; i < allFormElement.length; i++) {
    const questionTitle = allFormElement[i].querySelector(
      '.input-question-title'
    ).value;
    const questionColor = allFormElement[i].querySelector(
      '.input-question-color'
    ).value;

    const correctAnswerTitle = allFormElement[i].querySelector(
      '.input-correct-answer'
    ).value;
    const correctAnswerURL =
      allFormElement[i].querySelector('.input-correct-url').value;

    const hexadecimalRegExp = /^#[0-9A-Fa-f]{6}$/i;
    if (
      questionTitle < 20 ||
      !hexadecimalRegExp.test(questionColor) ||
      correctAnswerTitle.length <= 0
    ) {
      hasError = true;
      showMessageError('Preencha os dados corretamente 1');
      break;
    }

    try {
      correctAnswerURLValue = new URL(correctAnswerURL);
    } catch (error) {
      hasError = true;
      showMessageError('Preencha os dados corretamente 1 url');
      break;
    }

    const answers = [];

    const answerObject = {
      text: correctAnswerTitle,
      image: correctAnswerURLValue.href,
      isCorrectAnswer: true,
    };

    answers.push(answerObject);

    const allIncorrectAnswersElement = Array.from(
      allFormElement[i].querySelectorAll('.question-incorrect-answer')
    );

    const firstIncorrectAnswerTitle =
      allIncorrectAnswersElement[0].querySelector(
        '.input-incorrect-answer'
      ).value;
    const firstIncorrectAnswerURL = allIncorrectAnswersElement[0].querySelector(
      '.input-incorrect-url'
    ).value;
    try {
      incorrectAnswerURLValue = new URL(firstIncorrectAnswerURL);
    } catch (error) {
      hasError = true;
      showMessageError('Preencha os dados corretamente');
      break;
    }

    if (firstIncorrectAnswerTitle.length <= 0) {
      break;
    }

    const incorrectAnswerObject = {
      text: firstIncorrectAnswerTitle,
      image: incorrectAnswerURLValue.href,
      isCorrectAnswer: false,
    };

    answers.push(incorrectAnswerObject);

    for (let i = 1; i < allIncorrectAnswersElement.length; i++) {
      // falta permitir 1, 2 ou 3 respostas incorretas em vez de 4
      const incorrectAnswerTitle = allIncorrectAnswersElement[i].querySelector(
        '.input-incorrect-answer'
      ).value;
      const incorrectAnswerURL = allIncorrectAnswersElement[i].querySelector(
        '.input-incorrect-url'
      ).value;

      if (incorrectAnswerTitle.length > 0 || incorrectAnswerURL.length > 0) {
        if (incorrectAnswerTitle.length <= 0) {
          hasError = true;
          showMessageError('Preencha os dados corretamente');
          break;
        }

        if (incorrectAnswerURL.length > 0) {
          try {
            incorrectAnswerURLValue = new URL(incorrectAnswerURL);
          } catch (error) {
            hasError = true;
            showMessageError('Preencha os dados corretamente');
            break;
          }
        } else {
          hasError = true;
          showMessageError('Preencha os dados corretamente');
          break;
        }

        const answerObject = {
          text: incorrectAnswerTitle,
          image: incorrectAnswerURLValue.href,
          isCorrectAnswer: false,
        };

        answers.push(answerObject);
      }
    }

    if (hasError) break;

    const questionObject = {
      title: questionTitle,
      color: questionColor,
      answers,
    };
    questionsData.push(questionObject);
  }
  if (!hasError) {
    questions.push(...questionsData);
  }
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

    <div class="forms">
      <div class="form form-levels active">
        <div class="form-header" onclick="openCloseForm(this)">
          <h3 class="form-heading">Nível 1</h3>
          <img src="./images/edit.svg" alt="" class="edit-icon">
        </div>

        <div class="form-content">
          <input type="text" placeholder="Título do nível" id="quizz-level-title" class="quizz-input input-level-title">
          <input type="text" placeholder="% de acerto mínima" id="quizz-level-percentage" class="quizz-input input-level-percentage">
          <input type="text" placeholder="URL da imagem do nível" id="quizz-level-url" class="quizz-input input-level-url">
          <textarea placeholder="Descrição do nível" id="quizz-level-description" class="quizz-input input-level-description"></textarea>
        </div>
      </div>
    </div>

    <button type="button" class="btn" onclick="getAllLevelsInput()">
      Finalizar Quizz
    </button>
  </div>
  `;

  containerDiv.innerHTML = templateHTML;
  renderFormLevels(quizzInfos.levelsAmount);
}

function getAllLevelsInput() {
  validateLevelsInputs();

  if (!hasError) {
    // enviar as perguntas e dados pra api e depois renderizar a pagina 4
    sendQuizz();
    setTimeout(renderCreateQuizPage4, 750);
  }
}

function validateLevelsInputs() {
  hasError = false;
  const levelsData = [];

  const levelPercentageElements = Array.from(
    document.querySelectorAll('.input-level-percentage')
  );
  const levelPercentageArray = levelPercentageElements.map(
    (element) => element.value
  );
  const hasPercentageZero = levelPercentageArray.includes('0');
  if (!hasPercentageZero) {
    hasError = true;
    showMessageError('Precisa ter um nível 0%');
    return;
  }

  const allFormElement = Array.from(document.querySelectorAll('.form-levels'));
  for (let i = 0; i < allFormElement.length; i++) {
    const levelTitle =
      allFormElement[i].querySelector('.input-level-title').value;
    const levelPercentage = Number(
      allFormElement[i].querySelector('.input-level-percentage').value
    );
    const levelUrl = allFormElement[i].querySelector('.input-level-url').value;
    const levelDescription = allFormElement[i].querySelector(
      '.input-level-description'
    ).value;

    try {
      levelURLValue = new URL(levelUrl);
    } catch (error) {
      hasError = true;
      showMessageError('Preencha os dados corretamente');
      break;
    }

    if (
      levelTitle.length < 10 ||
      levelPercentage < 0 ||
      levelPercentage >= 100 ||
      levelDescription < 30 ||
      isNaN(levelPercentage)
    ) {
      hasError = true;
      showMessageError('Preencha os dados corretamente');
      break;
    }

    const levelsObject = {
      title: levelTitle,
      image: levelURLValue.href,
      text: levelDescription,
      minValue: levelPercentage,
    };

    levelsData.push(levelsObject);
  }
  if (!hasError) {
    levels.push(...levelsData);
  }
}

function renderFormLevels(levelsAmount) {
  const formsElement = document.querySelector('.forms');
  for (let i = 1; i < levelsAmount; i++) {
    const templateForm = `
    <div class="form form-levels">
      <div class="form-header" onclick="openCloseForm(this)">
        <h3 class="form-heading">Nível ${i + 1}</h3>
        <img src="./images/edit.svg" alt="" class="edit-icon">
      </div>

      <div class="form-content">
        <input type="text" placeholder="Título do nível" id="quizz-level-title" class="quizz-input input-level-title">
        <input type="text" placeholder="% de acerto mínima" id="quizz-level-percentage" class="quizz-input input-level-percentage">
        <input type="text" placeholder="URL da imagem do nível" id="quizz-level-url" class="quizz-input input-level-url">
        <textarea placeholder="Descrição do nível" id="quizz-level-description" class="quizz-input input-level-description"></textarea>
      </div>
    </div>
    `;

    formsElement.innerHTML += templateForm;
  }
}

function sendQuizz() {
  quizzData = {
    title: quizzInfos.title,
    image: quizzInfos.image,
    questions,
    levels,
  };

  // post pra api e retorna id
  // idQuizzUser = idRetornado
  postQuizz();
}

function postQuizz(quizzObject) {
  // objeto de teste
  const object = {
    title: 'Título do quizz',
    image: 'https://http.cat/411.jpg',
    questions: [
      {
        title: 'Título da pergunta 1',
        color: '#123456',
        answers: [
          {
            text: 'Texto da resposta 1',
            image: 'https://http.cat/411.jpg',
            isCorrectAnswer: true,
          },
          {
            text: 'Texto da resposta 2',
            image: 'https://http.cat/412.jpg',
            isCorrectAnswer: false,
          },
        ],
      },
      {
        title: 'Título da pergunta 2',
        color: '#123456',
        answers: [
          {
            text: 'Texto da resposta 1',
            image: 'https://http.cat/411.jpg',
            isCorrectAnswer: true,
          },
          {
            text: 'Texto da resposta 2',
            image: 'https://http.cat/412.jpg',
            isCorrectAnswer: false,
          },
        ],
      },
      {
        title: 'Título da pergunta 3',
        color: '#123456',
        answers: [
          {
            text: 'Texto da resposta 1',
            image: 'https://http.cat/411.jpg',
            isCorrectAnswer: true,
          },
          {
            text: 'Texto da resposta 2',
            image: 'https://http.cat/412.jpg',
            isCorrectAnswer: false,
          },
        ],
      },
    ],
    levels: [
      {
        title: 'Título do nível 1',
        image: 'https://http.cat/411.jpg',
        text: 'Descrição do nível 1',
        minValue: 0,
      },
      {
        title: 'Título do nível 2',
        image: 'https://http.cat/412.jpg',
        text: 'Descrição do nível 2',
        minValue: 50,
      },
    ],
  };

  const data = axios
    .post('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes', object)
    .then(({ data }) => {
      userQuizzCreated = data;
      console.log(userQuizzCreated);
      idQuizzUserArray.push(data.id);

      const idsArray = JSON.stringify(idQuizzUserArray);
      localStorage.setItem('idQuizz', idsArray);
    });
}

// função para renderizar a página 4 da tela 3
function renderCreateQuizPage4() {
  const containerDiv = document.querySelector('.container');
  const templateHTML = `
  <div class="screen-3-4">
    <h2 class="heading">Seu quizz está pronto!</h2>

    <div class="quizz-success-wrapper">
      <img src="${userQuizzCreated.image}" alt="" class="quizz-success-image">
      <span class="quizz-success-text">${userQuizzCreated.title}</span>
    </div>

    <button type="button" class="btn" onclick="renderQuizz(${userQuizzCreated.id})">
      Acessar Quizz
    </button>

    <button type="button" class="btn go-home" onclick="renderInitialScreen()">
      Voltar para home
    </button>
  </div>
  `;

  containerDiv.innerHTML = templateHTML;
}

// função renderizando primeira pagina
function renderInitialScreen() {
  // getLocalIdQuizzUser();

  const container = document.querySelector('.container');

  container.innerHTML = `
  <div class="screen-1">
    <div class="your-quizzes">
      <div class="placeholder">FOR TEST PURPOSES ONLY, WILL BE REMOVED</div>
    </div>

    <div class="all-quizzes">
      <h2>Todos os Quizzes</h2>
      <div class="quizzes"></div>
    </div>
  </div>
  `;

  renderAllQuizzes();
}

// funções para renderizar seção todos os quizzes - tela 1
function insertQuizzes(response, section) {
  const quizzList = response.data;

  for (let i = 0; i < Object.keys(quizzList).length; i++) {
    section.innerHTML += `
    <div class="quizz" onclick="renderQuizz(${quizzList[i].id})">
      <img src=${quizzList[i].image} alt="quizz">
      <h3>${quizzList[i].title}</h3>
    </div>`;
  }
}

function renderAllQuizzes() {
  const quizzes = document.querySelector('.all-quizzes .quizzes');
  quizzes.innerHTML = '';
  const promise = axios.get(`${API}/quizzes`);

  promise.then((response) => insertQuizzes(response, quizzes));
}

// funções para carregar um quizz - tela 2
function compare() {
  return Math.random() - 0.5;
}


function loadQuizz() {
  pontuation = 0; 
  let quizzHTML = '<div class="screen-2">';

  let quizzTitle = `
    <div class="quizz-title">
      <img src="${solvingQuizz.image}" alt="quizz">
      <h2>${solvingQuizz.title}</h2>
    </div>`;

  let quizzQuestions = '';
  quizzQuestions += `<div class="questions">`;
  for (let i = 0; i < solvingQuizz.questions.length; i++) {
    quizzQuestions += `
    <div class="question">
      <h3 style="background-color: ${solvingQuizz.questions[i].color}">${solvingQuizz.questions[i].title}</h3>
      <div class="answers">`;

    // randomizando as respostas
    solvingQuizz.questions[i].answers.sort(compare);

    for (let j = 0; j < solvingQuizz.questions[i].answers.length; j++) {
      quizzQuestions += `
      <div onclick="selectAnswer(this)" class="not-selected answer ${solvingQuizz.questions[i].answers[j].isCorrectAnswer}">
        <img src="${solvingQuizz.questions[i].answers[j].image}" alt="answer">
        <p>${solvingQuizz.questions[i].answers[j].text}</p>
      </div>`;
    }
    quizzQuestions += `
      </div>
    </div>`;
  }
  quizzQuestions += `
    </div>
  </div>`;

  quizzHTML += quizzTitle + quizzQuestions;
  return quizzHTML;
}

function renderQuizz(id) {
  const container = document.querySelector('.container');
  const promise = axios.get(`${API}/quizzes/${id}`);
  promise.then((response) => {
    solvingQuizz = response.data;
    container.innerHTML = loadQuizz();
    document.querySelector(".quizz-title").scrollIntoView();
  });
}

// funções para resolver e finalizar um quizz

function whichLevel(percentual) {
  const levels = solvingQuizz.levels;
  let level;
  let levelMinValue = -1
  for(let i = 0; i < levels.length; i++) {
    // tem pontuacao para estar nesse nivel && esta num nivel inferior ao novo
    if(percentual >= levels[i].minValue && levels[i].minValue >= levelMinValue) {
      level = levels[i];
      levelMinValue = levels[i].minValue;
    }
  }
  return level;
}

function loadQuizzResults() {
  const screen = document.querySelector('.screen-2');
  const questions = document.querySelectorAll('.question');
  console.log(pontuation, questions.length)
  const correctPercentual = Math.round((pontuation / questions.length) * 100);
  const myLevel = whichLevel(correctPercentual);
  console.log(myLevel)
  screen.innerHTML += `
  <div class="quizz-results">
    <h3>${correctPercentual}% de acerto: ${myLevel.title}</h3>
    <div class="img-text">
      <img src=${myLevel.image} alt="que nível!">
      <p>${myLevel.text}</p>
    </div>
  </div>
  <button class="reload" onclick="renderQuizz(${solvingQuizz.id})">Reiniciar Quizz</button>
  <button class="back" onclick="renderInitialScreen()">Voltar pra home</button>`;
}

function isQuizzFinished(quizzQuestions) {
  let finished = true;
  for(let i = 0; i < quizzQuestions.length; i++) {
    if(quizzQuestions[i].classList.contains("question-answered") === false) {
      finished = false;
    }
  }
  if(finished){
    loadQuizzResults()
  }
}

function selectAnswer(answer) {
  const question = answer.parentNode.parentNode;
  const existSelected = !!(question.querySelector(".selected-answer"));
  const questions = document.querySelectorAll(".question")
  let index;

  for(let i = 0; i < questions.length; i++) {
    if(question === questions[i]) {
      index = i;
    }
  }
  if(!existSelected){
    answer.classList.add('selected-answer');
    answer.classList.remove('not-selected');
    question.classList.add('question-answered');
    if(index + 1 < questions.length){
      setTimeout(()=>questions[index+1].scrollIntoView(), 2000);
    }
    
    if(answer.classList.contains('true') ===  true) {
      pontuation ++;
    }
    console.log(pontuation)
    isQuizzFinished(questions);
  }
}


// inicializando funções
renderInitialScreen()
// setTimeout(renderCreateQuizPage, 1000);