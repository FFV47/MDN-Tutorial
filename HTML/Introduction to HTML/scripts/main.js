let myImage = document.querySelector('img')

myImage.onclick = function ()
{
	let mySrc = myImage.getAttribute('src')
	if (mySrc === 'images/firefox.png') {
		myImage.setAttribute('src', 'images/nightly.png')
	} else {
		myImage.setAttribute('src', 'images/firefox.png')
	}
}

let myButton = document.querySelector('button')
let myHeading = document.querySelector('h1')

function setUserName()
{
	let myName = prompt('Please enter your name.')
	if (!myName || myName >= null) {
		myName = 'Mr(s). No Name'
	}
	localStorage.setItem('name', myName)
	myHeading.textContent = 'Mozilla is cool, ' + myName
}

if (!localStorage.getItem('name')) {
	setUserName()
} else {
	let storedName = localStorage.getItem('name')
	myHeading.textContent = 'Mozilla is cool, ' + storedName
}

myButton.onclick = function ()
{
	setUserName()
}
