let canvas = document.getElementById("grid");
let c = canvas.getContext("2d");

let x = canvas.height / 2;
let y = canvas.width / 4;

let dx = 1;
let dy = 1;

let snakeHeadWidth = 15;
let snakeHeadHeight = 10;

let trail = [];
let trailLength = 10;
let objectTrail;

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

let eatApple = false;
let randomXPosition = Math.floor(Math.random() * (canvas.width - 25));
let randomYPosition = Math.floor(Math.random() * (canvas.height - 25));
let applesEaten = 0;


//This function draws the snakes head
function drawSnakeHead() {
	c.fillStyle = '#00b300';
	c.fillRect(x, y, snakeHeadWidth, snakeHeadHeight);
}

//This function stores the last position of the snake
function storeLastPosition(xPos, yPos) {
	trail.push({xPos, yPos});

	if (trail.length > trailLength) {
		trail.shift();
	}
}

//This function generates apples
function generateRandomApples(appleX, appleY) {
	c.fillStyle = 'red';
	c.fillRect(appleX, appleY, 15, 10);
}

//This function randomizes the coords for the apple
function randomizePos() {
	randomXPosition = Math.floor(Math.random() * (canvas.width - 25));
	randomYPosition = Math.floor(Math.random() * (canvas.height - 25));
}


function draw() {
	c.clearRect(0, 0, canvas.width, canvas.height);

//Creates the tail of the snake, and verifies for collision with itself
	for (let  i = 0; i < trail.length; i++) {
		c.fillStyle = '#00e600';
		c.fillRect(trail[i].xPos, trail[i].yPos, snakeHeadWidth, snakeHeadHeight);

		if ((trail[i].xPos === x) &&  
			(trail[i].yPos === y) &&
			trailLength > 10) {
			gameOver();
		}
	}

//Generates the apples
	if (eatApple === false) {
		generateRandomApples(randomXPosition, randomYPosition);
	}

	drawSnakeHead();

	storeLastPosition(x, y);

//Keeps track on the key pressed, and verifies for collision with the borders	
	if (rightPressed) {
		x += dx;
		if (x + snakeHeadWidth > canvas.width) {
			gameOver();
		}
	} else if (leftPressed) {
		x -= dx;
		if (x < 0) {
			gameOver();
		}
	} else if (upPressed) {
		y -= dy;
		if (y < 0) {
			gameOver();
		}
	} else if (downPressed) {
		y += dy;
		if (y + snakeHeadHeight > canvas.height) {
			gameOver();
		}
	}

//Keeps track on the apples, and verifies for collision with them
	if ((randomXPosition < x + snakeHeadWidth) && 
		(randomXPosition + snakeHeadWidth > x) && 
		(randomYPosition < y + snakeHeadHeight) && 
		(snakeHeadHeight + randomYPosition > y)) {
		eatApple = true;
		applesEaten = applesEaten + 1;
		trailLength = trailLength + 10;
		randomizePos();
		eatApple = false;
	}

	drawScore();

}

//Introduces the keybindings as event listeners
document.addEventListener("keydown", keyDownHandler, false);
function keyDownHandler(e) {
	if (e.key == "Right" || e.key == "ArrowRight") {
		rightPressed = true;
		leftPressed = false;
		upPressed = false;
		downPressed = false;
	} else if (e.key == "Left" || e.key == "ArrowLeft") {
		leftPressed = true;
		rightPressed = false;
		upPressed = false;
		downPressed = false;
	} else if (e.key == "Up" || e.key == "ArrowUp") {
		upPressed = true;
		downPressed = false;
		leftPressed = false;
		rightPressed = false;
	} else if (e.key == "Down" || e.key == "ArrowDown") {
		downPressed = true;
		upPressed = false;
		rightPressed = false;
		leftPressed = false;
	}
}

function gameOver() {
	document.getElementById('gameOver').innerHTML += `
		<p class="fw-bold">GAME OVER !</p>
		<button type="button" class="btn btn-danger" onclick= "restartGame()">RESTART</button>
	`
	clearInterval(interval);
}

function restartGame() {
	document.location.reload();
}

function drawScore() {
	c.font = "10px Arial";
	c.fillStyle = "#00b300";
	c.fillText("Score: " +applesEaten, 250, 10);
}

let interval = setInterval(draw, 15);