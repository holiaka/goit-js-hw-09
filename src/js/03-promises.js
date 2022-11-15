// Load libraries
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Link on FORM
const formButton = document.querySelector('form');

// Her listeber
formButton.addEventListener('submit', onButtonClick);

// Func. on click
function onButtonClick(evt) {
  evt.preventDefault();

  const { delay, step, amount } = evt.currentTarget.elements;
  let delayT = parseInt(delay.value);
  let stepT = parseInt(step.value);
  let amountT = parseInt(amount.value);
  console.log(typeof amount.value);

  if (delayT < 0 || stepT < 0 || amountT <= 0) {
    Notify.failure('You enter no corect values');
  } else {
    for (let i = 1; i <= amountT + 1; i++) {
      const fullDelay = delayT + (i - 1) * stepT;
      console.log(fullDelay);
      createPromise(i, fullDelay).then(successCallback).catch(failureCallback);
    }
    Notify.success('It`s Ok!!!');
  }
}

// Func. with Promise
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// Callback func.
function successCallback({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function failureCallback({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
