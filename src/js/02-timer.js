import flatpickr from "flatpickr";

ref = {
    activateButton: document.querySelector('button[data-start]'),
    daysIndicator: document.querySelector('span[data-days]'),
    hoursIndicator: document.querySelector('span[data-hours]'),
    minutesIndicator: document.querySelector('span[data-minutes]'),
    secondsIndicator: document.querySelector('span[data-seconds]'),
}

ref.activateButton.setAttribute('disabled', true);
ref.activateButton.addEventListener("click", onActivateBottonClick)

let SELECTEDTIME;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {      
      if ((selectedDates[0].getTime() - options.defaultDate.getTime()) <= 0) {
        alert("Please choose a date in the future");
      } else{
        SELECTEDTIME = selectedDates[0].getTime();
        ref.activateButton.removeAttribute('disabled');
      }
  },
};

flatpickr('input#datetime-picker', options);

let intervalId;

function onActivateBottonClick(){
  if ((SELECTEDTIME - (new Date()).getTime()) <= 0) {
    alert("The selected time has expired")
  } else {
    calculateDiffTime(SELECTEDTIME);
    intervalId = setInterval(calculateDiffTime, 1000, SELECTEDTIME);
    }    
}

function calculateDiffTime(selectedTime) {
  if ((selectedTime - (new Date()).getTime()) < 0) {
    clearInterval(intervalId);
  } else {
    ref.activateButton.setAttribute('disabled', true);

    let getTimeIndicator = convertMs(selectedTime - (new Date()).getTime())
    ref.daysIndicator.textContent = addLeadingZero(getTimeIndicator.days);
    ref.hoursIndicator.textContent = addLeadingZero(getTimeIndicator.hours);
    ref.minutesIndicator.textContent = addLeadingZero(getTimeIndicator.minutes);
    ref.secondsIndicator.textContent = addLeadingZero(getTimeIndicator.seconds);    
  }
}

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
    value = value.padStart("0", 2)
  }
  
  return value;
}