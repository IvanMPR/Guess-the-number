let message = document.getElementById('high-or-low');
let button = document.getElementById('btn');
let input = document.getElementById('user-input');
let remGuess = document.getElementById('remaining-guesses');
let prevGuess = document.getElementById('previous-guesses');
let previousGuesses = [];
//Modal related elements
let rules = document.getElementById('info');
let modalBg = document.querySelector('.modal-background');
let modalHolder = document.querySelector('.modal-holder');
let x = document.querySelector('.close-window');
//Game sounds
const guessTone = document.getElementById('guess-tone');
const lostTone = document.getElementById('lost-tone');
const winTone = document.getElementById('win-tone');

function playOnGuess() {
  guessTone.play();
}

function playOnGameLost() {
  lostTone.play();
}

function playOnGameWon() {
  winTone.play();
}

// Event listeners
input.addEventListener('keyup', checkInput);
button.addEventListener('click', compareGuess);
button.addEventListener('click', guessesContainer);

rules.addEventListener('click', function () {
  setTimeout(() => {
    modalBg.classList.toggle('hidden');
    modalHolder.classList.toggle('hidden');
  }, 150);
});

x.addEventListener('click', function () {
  setTimeout(() => {
    modalBg.classList.toggle('hidden');
    modalHolder.classList.toggle('hidden');
  }, 150);
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !modalBg.classList.contains('hidden')) {
    setTimeout(() => {
      modalBg.classList.toggle('hidden');
      modalHolder.classList.toggle('hidden');
    }, 150);
  }
});

modalBg.addEventListener('click', function () {
  modalBg.classList.toggle('hidden');
  modalHolder.classList.toggle('hidden');
});

button.addEventListener('click', function () {
  setTimeout(() => {
    button.blur();
    input.focus();
  }, 100);
});

input.addEventListener('keyup', function (event) {
  // event.preventDefault();
  if (event.key === 'Enter') {
    button.click();
    playOnGuess();
  }
});

function checkInput() {
  // Checking if the input is less than 100, and is the input valid (numerical) value
  let userGuess = input.value;
  if (isNaN(userGuess)) {
    message.innerHTML = 'Error ! Enter numeric value !';
    button.disabled = true;
  } else if (userGuess > 100) {
    message.innerHTML = 'Enter number less than 100 !';
    button.disabled = true;
  } else {
    message.innerHTML = "Click on 'Submit Guess' or press 'Enter'";
    button.disabled = false;
  }
}

let remainingGuesses = 10;
let initRandNum = Math.floor(Math.random() * 100) + 1; // Creating a random number, comparing it with players guess, displaying instructions to player

function compareGuess() {
  let userGuess = input.value;

  if (userGuess == initRandNum && remainingGuesses >= 0) {
    message.innerHTML = 'Congratulations. Number was ' + initRandNum;
    input.disabled = true;
    input.placeholder = 'Refresh Page to Play Again';
    button.disabled = true;
    remainingGuesses--;
    remGuess.innerHTML = remainingGuesses;
    setTimeout(() => {
      playOnGameWon();
    }, 100);
  } else if (userGuess === '' || userGuess.charAt(0) == 0) {
    alert('Please enter valid numeric value !');
  } else if (userGuess !== initRandNum && remainingGuesses === 1) {
    message.innerHTML = 'You Lost ! Number was ' + initRandNum;
    input.disabled = true;
    input.placeholder = 'Refresh Page to Play Again';
    button.disabled = true;
    remainingGuesses--;
    remGuess.innerHTML = remainingGuesses;
    setTimeout(() => {
      playOnGameLost();
    }, 100);
  } else if (userGuess > initRandNum && remainingGuesses > 0) {
    message.innerHTML = 'To High ! Try again !';
    remainingGuesses--;
    remGuess.innerHTML = remainingGuesses;
  } else if (userGuess < initRandNum && remainingGuesses > 0) {
    message.innerHTML = 'To Low ! Try again !';
    remainingGuesses--;
    remGuess.innerHTML = remainingGuesses;
  } else {
    message.innerHTML = 'You Lost ! Number was ' + initRandNum;
    input.disabled = true;
    button.disabled = true;
    remainingGuesses--;
    remGuess.innerHTML = remainingGuesses;
    setTimeout(() => {
      playOnGameLost();
    }, 100);
  }
}

function guessesContainer() {
  // Storing previous guesses in an array and displaying them
  let userGuess = input.value;

  if (userGuess === '' || userGuess.charAt(0) == 0) {
    prevGuess.innerHTML = previousGuesses;
    input.value = '';
  } else {
    prevGuess.innerHTML = previousGuesses.push(userGuess);
    prevGuess.innerHTML = previousGuesses;
    input.value = '';
    playOnGuess();
  }
}
