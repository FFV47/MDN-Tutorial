/** @type {HTMLVideoElement} */
const media = document.querySelector("video");
/** @type {HTMLDivElement} */
const controls = document.querySelector(".controls");

/** @type {HTMLButtonElement} */
const playBtn = document.querySelector(".play");
/** @type {HTMLButtonElement} */
const stopBtn = document.querySelector(".stop");
/** @type {HTMLButtonElement} */
const rwdBtn = document.querySelector(".rwd");
/** @type {HTMLButtonElement} */
const fwdBtn = document.querySelector(".fwd");

/** @type {HTMLDivElement} */
const timerWrapper = document.querySelector(".timer");
/** @type {HTMLSpanElement} */
const timer = document.querySelector(".timer span");
/** @type {HTMLDivElement} */
const timerBar = document.querySelector(".timer div");

// These two lines remove the default browser controls from the video, and make the custom controls visible.
media.removeAttribute("controls");
controls.style.visibility = "visible";

playBtn.addEventListener("click", playPauseMedia);

function playPauseMedia() {
	rwdBtn.classList.remove("active");
	fwdBtn.classList.remove("active");
	clearInterval(intervalRwd);
	clearInterval(intervalFwd);

	if (media.paused) {
		this.setAttribute("data-icon", "u");
		media.play();
	} else {
		this.setAttribute("data-icon", "P");
		media.pause();
	}
}

stopBtn.addEventListener("click", stopMedia);
media.addEventListener("ended", stopMedia);

function stopMedia() {
	rwdBtn.classList.remove("active");
	fwdBtn.classList.remove("active");
	clearInterval(intervalRwd);
	clearInterval(intervalFwd);
	media.pause();
	media.currentTime = 0;
	playBtn.setAttribute("data-icon", "P");
}

rwdBtn.addEventListener("click", mediaBackward);
fwdBtn.addEventListener("click", mediaForward);

let intervalFwd;
let intervalRwd;

function mediaBackward() {
	clearInterval(intervalFwd);
	fwdBtn.classList.remove("active");

	if (rwdBtn.classList.contains("active")) {
		rwdBtn.classList.remove("active");
		clearInterval(intervalRwd);
		media.play();
	} else {
		rwdBtn.classList.add("active");
		media.pause();
		intervalRwd = setInterval(windBackward, 200);
	}
}

function mediaForward() {
	clearInterval(intervalRwd);
	rwdBtn.classList.remove("active");

	if (fwdBtn.classList.contains("active")) {
		fwdBtn.classList.remove("active");
		clearInterval(intervalFwd);
		media.play();
	} else {
		fwdBtn.classList.add("active");
		media.pause();
		intervalFwd = setInterval(windForward, 200);
	}
}

function windBackward() {
	if (media.currentTime <= 3) {
		stopMedia();
	} else {
		media.currentTime -= 3;
	}
}

function windForward() {
	if (media.currentTime >= media.duration - 3) {
		stopMedia();
	} else {
		media.currentTime += 3;
	}
}

// Update the time bar
media.addEventListener("timeupdate", setTime);

function setTime() {
	let minutes = Math.floor(media.currentTime / 60);
	let seconds = Math.floor(media.currentTime - minutes * 60);
	let minuteValue;
	let secondValue;

	if (minutes < 10) {
		minuteValue = "0" + minutes;
	} else {
		minuteValue = minutes;
	}

	if (seconds < 10) {
		secondValue = "0" + seconds;
	} else {
		secondValue = seconds;
	}

	// let mediaTime = minuteValue + ":" + secondValue;
	timer.textContent = minuteValue + ":" + secondValue;

	let barLength = timerWrapper.clientWidth * (media.currentTime / media.duration);
	timerBar.style.width = barLength + "px";
}
