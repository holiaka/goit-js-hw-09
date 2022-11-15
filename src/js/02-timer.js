// Load libraries
import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Links on HTML elements
const ref = {
  activateButton: document.querySelector('button[data-start]'),
  daysIndicator: document.querySelector('span[data-days]'),
  hoursIndicator: document.querySelector('span[data-hours]'),
  minutesIndicator: document.querySelector('span[data-minutes]'),
  secondsIndicator: document.querySelector('span[data-seconds]'),
};

// Added special operators
ref.activateButton.setAttribute('disabled', true);
ref.activateButton.addEventListener('click', onActivateBottonClick);

let SELECTEDTIME;
let intervalId;

// Options for "flatpickr" lib.
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (
      selectedDates[0].getTime() - options.defaultDate.getTime() <= 0 &&
      intervalId === undefined
    ) {
      // alert("Please choose a date in the future");
      Notify.failure('Please, choose a date in the future!!!');
      ref.activateButton.setAttribute('disabled', true);
    } else if (
      selectedDates[0].getTime() - options.defaultDate.getTime() > 0 &&
      intervalId === undefined
    ) {
      SELECTEDTIME = selectedDates[0].getTime();
      ref.activateButton.removeAttribute('disabled');
      Notify.success('The time has been successfully selected!!!');
    } else {
      Notify.warning('!!! The timer is now running !!!');
    }
  },
};

flatpickr('input#datetime-picker', options);

//***** Here function list*****/ 
// If click on button
function onActivateBottonClick() {
  if (SELECTEDTIME - new Date().getTime() <= 0) {
    // alert("The selected time has expired")

    Notify.warning('The selected time has expired!!!');
  } else {
    ref.activateButton.setAttribute('disabled', true);
    ref.activateButton.removeEventListener('click', onActivateBottonClick);

    calculateDiffTime(SELECTEDTIME);
    intervalId = setInterval(calculateDiffTime, 1000, SELECTEDTIME);
    Notify.success('Time countdown start!!!');
  }
}

// Calculate time tange
function calculateDiffTime(selectedTime) {
  if (selectedTime - new Date().getTime() < 0) {
    clearInterval(intervalId);
  } else {
    let getTimeIndicator = convertMs(selectedTime - new Date().getTime());
    ref.daysIndicator.textContent = addLeadingZero(getTimeIndicator.days);
    ref.hoursIndicator.textContent = addLeadingZero(getTimeIndicator.hours);
    ref.minutesIndicator.textContent = addLeadingZero(getTimeIndicator.minutes);
    ref.secondsIndicator.textContent = addLeadingZero(getTimeIndicator.seconds);
  }
}

// Mandatory functions
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  if (value.lenght >= 2) {
    value = value.padStart('0', 2);
  }
  return value;
}
