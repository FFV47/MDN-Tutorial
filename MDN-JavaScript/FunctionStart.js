function displayMessage(msgText = "This is a message box") {
	const html = document.querySelector("html");

	const panel = document.createElement("div");
	panel.setAttribute("class", "msgBox");
	html.appendChild(panel);

	const msg = document.createElement("p");
	msg.textContent = msgText;
	panel.appendChild(msg);

	const closeBtn = document.createElement("button");
	closeBtn.textContent = "x";
	panel.appendChild(closeBtn);

	closeBtn.onclick = function () {
		panel.parentNode.removeChild(panel);
	};
}

const btn = document.querySelector("button");
/** @type {HTMLInputElement} */
const msg = document.getElementById("msg");

btn.onclick = function () {
	if (msg.value === "") {
		displayMessage();
	} else {
		displayMessage(msg.value);
	}

	msg.focus();
};
