// HTML links
ref = {
  body: document.querySelector('body'),
  startButton: document.querySelector('button[data-start]'),
  stopButton: document.querySelector('button[data-stop]'),
};

ref.startButton.addEventListener('click', onStartButtonClick);
ref.stopButton.addEventListener('click', onStopButtonClick);

ref.stopButton.setAttribute('disabled', '');

let intervalId;

function onStartButtonClick() {
  ref.stopButton.removeAttribute('disabled');
  ref.startButton.setAttribute('disabled', '');
  intervalId = setInterval(changeBodyColor, 1000);
}

function onStopButtonClick() {
  ref.startButton.removeAttribute('disabled');
  ref.stopButton.setAttribute('disabled', '');
  clearInterval(intervalId);
}

function changeBodyColor() {
  ref.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
