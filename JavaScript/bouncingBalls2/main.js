// setup canvas
// the context(ctx) is like the paper
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
	const num = Math.floor(Math.random() * (max - min + 1)) + min;
	return num;
}

// GEOSHAPE OBJECT BEGINS
function geoShape(x, y, velX, velY, exists) {
	this.x = x;
	this.y = y;
	this.velX = velX;
	this.velY = velY;
	this.exists = exists;
}
// GEOSHAPE OBJECT ENDS

// BALL OBJECT BEGINS
function Ball(x, y, velX, velY, exists, radius, color) {
	geoShape.call(this, x, y, velX, velY, exists);
	this.radius = radius;
	this.color = color;
}

Ball.prototype = Object.create(geoShape.prototype);

Object.defineProperty(Ball.prototype, "constructor", {
	value: Ball,
	enumerable: false,
	writable: true,
});

// method to draw the ball in the canvas
Ball.prototype.draw = function () {
	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
	ctx.fill();
};

Ball.prototype.updatePosition = function () {
	if (this.x + this.radius >= width) {
		this.velX = -this.velX;
	}

	if (this.x - this.radius <= 0) {
		this.velX = -this.velX;
	}

	if (this.y + this.radius >= height) {
		this.velY = -this.velY;
	}

	if (this.y - this.radius <= 0) {
		this.velY = -this.velY;
	}

	this.x += this.velX;
	this.y += this.velY;
};

Ball.prototype.collisionDetect = function () {
	for (let j = 0; j < balls.length; j++) {
		if (this !== balls[j] && balls[j].exists === true) {
			const dx = this.x - balls[j].x;
			const dy = this.y - balls[j].y;
			const distance = Math.sqrt(dx * dx + dy * dy);

			if (distance < this.radius + balls[j].radius) {
				balls[j].color = this.color =
					"rgb(" + random(0, 255) + "," + random(0, 255) + "," + random(0, 255) + ")";
			}
		}
	}
};
// BALL OBJECT ENDS

// EVILCIRCLE OBJECT BEGINS
class evilCircle extends geoShape {
	constructor(x, y, exists) {
		super(x, y, 20, 20, exists);
		this.radius = 10;
		this.color = "white";
	}
	draw() {
		ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.strokeStyle = this.color;
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctx.stroke();
	}
	updatePosition() {
		if (this.x + this.radius >= width) {
			this.x -= this.radius;
		}

		if (this.x - this.radius <= 0) {
			this.x += this.radius;
		}

		if (this.y + this.radius >= height) {
			this.y -= this.radius;
		}

		if (this.y - this.radius <= 0) {
			this.y += this.radius;
		}
	}
	setControls() {
		window.addEventListener("keydown", (e) => {
			switch (e.key) {
				case "a":
					this.x -= this.velX;
					break;
				case "d":
					this.x += this.velX;
					break;
				case "w":
					this.y -= this.velY;
					break;
				case "s":
					this.y += this.velY;
					break;
			}
		});
	}
	collisionDetect() {
		for (let j = 0; j < balls.length; j++) {
			if (balls[j].exists === true) {
				const dx = this.x - balls[j].x;
				const dy = this.y - balls[j].y;
				const distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < this.radius + balls[j].radius) {
					balls[j].exists = false;
				}
			}
		}
	}
}
// EVILCIRCLE OBJECT ENDS

let balls = [];

while (balls.length < 25) {
	let radius = random(10, 20);
	let ball = new Ball(
		// ball position always drawn at least one ball width
		// away from the edge of the canvas, to avoid drawing errors
		random(0 + radius, width - radius),
		random(0 + radius, height - radius),
		random(-7, 7),
		random(-7, 7),
		true,
		radius,
		`rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`
	);

	balls.push(ball);
}

// Create the evil circle
let circleEvil = new evilCircle(width / 2, height / 2, true);

// Set the controls for the created object
circleEvil.setControls();

const score = document.querySelector("p");

function loop() {
	// Draw semi-transparent background on loop, before drawing the balls
	// and the evil circle
	ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
	ctx.fillRect(0, 0, width, height);

	// Draw the balls that exists on loop
	let windowBalls = 0;
	for (let i = 0; i < balls.length; i++) {
		if (balls[i].exists === true) {
			balls[i].draw();
			balls[i].updatePosition();
			balls[i].collisionDetect();
			windowBalls++;
		}
	}

	score.textContent = "Ball count: " + windowBalls;

	if (windowBalls === 0) {
		let restart = prompt("Restart game (Y/N): ");
		if (restart.toLowerCase() === "y") {
			window.location.reload();
		} else {
			return;
		}
	}
	// Draw the evil circle on loop
	circleEvil.draw();
	circleEvil.updatePosition();
	circleEvil.collisionDetect();

	requestAnimationFrame(loop);
}

loop();
