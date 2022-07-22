import {
  elements,
  correctSound,
  wrongSound,
  clapingSound,
  startTimer,
} from './utils.js';
import { quizData } from './quiz-data.js';

const { startBtn, score, questionArea, optionsArea } = elements;

const numberOfQuestions = quizData.length;
let currentQuestion = 0;

let intervalId;
function startQuiz() {
  intervalId = startTimer();
  startBtn.classList.add('hide-element');
  document.querySelector('.quiz-area').classList.remove('hide-element');
  loadQuestion();
}
startBtn.addEventListener('click', startQuiz);

let index = 0; // Keeps track of the current question
function loadQuestion() {
  const { question, options, answer } = quizData[index];
  questionArea.innerHTML = `<p id="question">${question}</p>`;

  optionsArea.innerHTML = '';
  options.forEach((option) => {
    optionsArea.innerHTML += `<button class="option-btn">${option}</button>`;
  });

  const optionBtns = document.querySelectorAll('.option-btn');
  optionBtns.forEach((option) => {
    option.addEventListener('click', () => {
      checkAnswer(option.textContent, answer);
    });
  });
}

let scoreCounter = 0;

function checkAnswer(userAnswer, correctAnswer) {
  if (userAnswer === correctAnswer) {
    correctSound.play();
    scoreCounter++;
    score.textContent = scoreCounter;
  } else wrongSound.play();

  currentQuestion++;
  index++;
  if (currentQuestion === numberOfQuestions) {
    if (scoreCounter / quizData.length >= 0.5) clapingSound.play(); // Clapping for scores above 50%
    document.querySelector('.quiz-area').classList.add('hide-element');
    displayScore();
    return;
  }
  loadQuestion();
}

function displayScore() {
  const scoreArea = document.querySelector('.score-area');
  scoreArea.innerHTML = ''; // Prevents a duplication of
  scoreArea.innerHTML += `
    <h1 class="final-score">Score: ${scoreCounter} / ${quizData.length}</h1>
    <h3 class="time-taken">You took ${elements.timeRemaining.textContent} to finish</h3>`;
  scoreArea.appendChild(restartBtn());
  resets();
}

const restartBtn = () => {
  const button = document.createElement('button');
  button.classList.add('play-again');
  button.textContent = 'Play Again';
  button.addEventListener('click', playAgain);

  return button;
};

const playAgain = () => {
  document.querySelector('.score-area').classList.add('hide-element');
  startQuiz();
};

//Performing resets to the score and timer after restarting the quiz
const resets = () => {
  index = 0;
  currentQuestion = 0;
  scoreCounter = 0;
  score.textContent = scoreCounter;
  document.querySelector('.score-area').classList.remove('hide-element');

  clearInterval(intervalId);
};
