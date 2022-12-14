// HTML links
const ref = {
  body: document.querySelector('body'),
  startButton: document.querySelector('button[data-start]'),
  stopButton: document.querySelector('button[data-stop]'),
};

// Add Event Listener
ref.startButton.addEventListener('click', onStartButtonClick);
ref.stopButton.addEventListener('click', onStopButtonClick);

// Support code
ref.stopButton.setAttribute('disabled', true);
let intervalId;

// Functions
function onStartButtonClick() {
  ref.stopButton.removeAttribute('disabled');
  ref.startButton.setAttribute('disabled', true);
  intervalId = setInterval(changeBodyColor, 1000);
}

function onStopButtonClick() {
  ref.startButton.removeAttribute('disabled');
  ref.stopButton.setAttribute('disabled', true);
  clearInterval(intervalId);
}

function changeBodyColor() {
  ref.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// class Colors {
//   // Синтаксис объявления метода класса
//   constructor(ref) {
//     // Инициализация свойств экземпляра
//     this.body = ref.body;
//     this.startButtton = ref.startButtton;
//   }

//   create() {
//     console.log(body)
//   }

//   get body() {
//     return this.body;
//   }
// }
