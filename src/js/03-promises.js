const formButton = document.querySelector("form");

formButton.addEventListener("submit", onButtonClick);


function onButtonClick(evt) {
  evt.preventDefault();

  const { delay, step, amount } = evt.currentTarget.elements;
  let delayT = parseInt(delay.value);
  let stepT = parseInt(step.value);
  let amountT = parseInt(amount.value)
  console.log(typeof amount.value);
  
  if ((delayT < 0) || (stepT < 0) || (amountT <= 0)) {
    alert("You enter no corect values")
  } else {
    for (let i = 1; i <= amountT + 1; i++) {
      const fullDelay = delayT + ((i - 1) * stepT);
      console.log(fullDelay);
      createPromise(i, fullDelay);
    }
  }
  
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  
  if (shouldResolve) {
    // Fulfill
    console.log('Fulfill');
  } else {
    // Reject
    console.log('Reject');
  }
}


const fetchUserFromServer = username => {
  return new Promise((resolve, reject) => {
    console.log(`Fetching data for ${username}`);

    setTimeout(() => {
      // Change value of isSuccess variable to simulate request status
      const isSuccess = true;

      if (isSuccess) {
        resolve("success value");
      } else {
        reject("error");
      }
    }, 2000);
  });
};

fetchUserFromServer("Mango")
  .then(user => console.log(user))
  .catch(error => console.error(error));