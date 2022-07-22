const elements = {
  startBtn: document.querySelector(".start"),
  timeRemaining: document.querySelector(".timer"),
  score: document.querySelector(".score"),
  questionArea: document.querySelector(".question-area"),
  optionsArea: document.querySelector(".options-area"),
};

const correctSound = new Audio("/sounds/correctAnswer.mp3");
const wrongSound = new Audio("/sounds/wrongAnswer.mp3");
const clapingSound = new Audio("/sounds/claps.mp3");

function startTimer() {
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  const intervalId = setInterval(() => {
    elements.timeRemaining.innerHTML = `${hours}hrs ${minutes}mins ${seconds}s`;

    seconds++;

    if (seconds == 60) {
      seconds = 0;
      minutes++;
    }

    if (minutes == 60) {
      minutes = 0;
      hours++;
    }
  }, 1000);

  return intervalId;
}

export { elements, correctSound, wrongSound, clapingSound, startTimer };
