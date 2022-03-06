/** @type {HTMLImageElement} */
const displayedImage = document.querySelector(".displayed-img");
/** @type {HTMLDivElement} */
const thumbBar = document.querySelector(".thumb-bar");

/** @type {HTMLButtonElement} */
const btn = document.querySelector("button");
/** @type {HTMLDivElement} */
const overlay = document.querySelector(".overlay");

/* Looping through images */

for (let i = 1, len = 5; i <= len; i++) {
	const newImage = document.createElement("img");
	newImage.setAttribute("src", `images/pic${i}.jpg`);
	newImage.addEventListener("click", function () {
		displayedImage.setAttribute("src", `images/pic${i}.jpg`);
	});
	thumbBar.appendChild(newImage);
}

// EVENT DELEGATION
// thumbBar.addEventListener("click", function (e) {
// 	displayedImage.setAttribute("src", e.target.getAttribute("src"));
// });

/* Wiring up the Darken/Lighten button */
btn.addEventListener("click", function () {
	if (btn.getAttribute("class") === "dark") {
		overlay.setAttribute("class", "overlay light");
		btn.setAttribute("class", "light");
		btn.textContent = "Darken";
	} else {
		overlay.setAttribute("class", "overlay dark");
		btn.setAttribute("class", "dark");
		btn.textContent = "Lighten";
	}
});
