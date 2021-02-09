let randomNumber = Math.floor(Math.random() * 100);

/** @type {HTMLParagraphElement} */
const guesses = document.querySelector(".guesses");
/** @type {HTMLParagraphElement} */
const lastResult = document.querySelector(".lastResult");
/** @type {HTMLParagraphElement} */
const lowOrHi = document.querySelector(".lowOrHi");

/** @type {HTMLInputElement} */
const guessSubmit = document.querySelector(".guessSubmit");
/** @type {HTMLInputElement} */
const guessField = document.querySelector(".guessField");

let guessCount = 1;
let resetButton;
guessField.focus();

guessSubmit.addEventListener("click", checkGuess);

function checkGuess() {
	let UserGuess = Number(guessField.value);
	if (guessCount === 1) {
		guesses.textContent = "Previous guesses: ";
	}
	guesses.textContent += UserGuess + " ";

	if (UserGuess === randomNumber) {
		lastResult.textContent = "Congratulations! You got it right!";
		lastResult.style.backgroundColor = "green";
		lowOrHi.textContent = "";
		setGameOver();
	} else if (guessCount === 10) {
		lastResult.textContent = "!!!GAME OVER!!!";
		setGameOver();
	} else {
		lastResult.textContent = "Wrong";
		lastResult.style.backgroundColor = "red";
		if (UserGuess < randomNumber) {
			lowOrHi.textContent = "Last guess was too low!";
		} else {
			lowOrHi.textContent = "Last guess was too high!";
		}
	}
	guessCount++;
	guessField.value = "";
	guessField.focus();
}

function setGameOver() {
	guessField.disabled = true;
	guessSubmit.disabled = true;
	resetButton = document.createElement("button");
	resetButton.textContent = "Start New Game";
	document.body.appendChild(resetButton);
	resetButton.addEventListener("click", resetGame);
}

function resetGame() {
	guessCount = 1;

	const resetParas = document.querySelectorAll(".resultParas p");
	for (let i = 0; i < resetParas.length; i++) {
		resetParas[i].textContent = "";
	}

	resetButton.parentNode.removeChild(resetButton);

	guessField.disabled = false;
	guessSubmit.disabled = false;
	guessField.value = "";
	guessField.focus();

	lastResult.style.backgroundColor = "white";

	randomNumber = Math.floor(Math.random() * 100);
}
