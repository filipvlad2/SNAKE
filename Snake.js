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

let keyPressed = null;

let appleX, appleY;
let eatApple = false;
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
function randomizePos(canvasSize) {
	return Math.floor(Math.random() * (canvasSize - 25));
}

//This function checks for self collision
function checkSelfCollision(xPos, yPos) {
	if ((xPos === x) &&  
		(yPos === y) &&
		trailLength > 10) {
		gameOver();
	}
}

//This function checks if the snake collides with the borders
function checkBorderCollision(xPos, yPos) {
	if (xPos + snakeHeadWidth > canvas.width) {
		gameOver();
	} else if (xPos < 0) {
		gameOver();
	} else if (yPos < 0) {
		gameOver();
	} else if (yPos + snakeHeadHeight > canvas.height) {
		gameOver();
	}
}

//Setting a value to these two coordinates in order to generate the first apple
	appleX = randomizePos(canvas.width);
	appleY = randomizePos(canvas.height);

function moveSnake() {

	c.clearRect(0, 0, canvas.width, canvas.height);

//Creates the tail of the snake, and verifies for collision with itself
	for (let  i = 0; i < trail.length; i++) {
		c.fillStyle = '#00e600';
		c.fillRect(trail[i].xPos, trail[i].yPos, snakeHeadWidth, snakeHeadHeight);

		checkSelfCollision(trail[i].xPos, trail[i].yPos);
	}

//Generates the apples
	if (eatApple === false) {
		generateRandomApples(appleX, appleY);
	}

	drawSnakeHead();

	storeLastPosition(x, y);

//Keeps track on the key pressed, and verifies for collision with the borders	
	if (keyPressed === "Right") {
		x += dx;
		checkBorderCollision(x, y);

	} else if (keyPressed === "Left") {
		x -= dx;
		checkBorderCollision(x, y);

	} else if (keyPressed === "Up") {
		y -= dy;
		checkBorderCollision(x, y);

	} else if (keyPressed === "Down") {
		y += dy;
		checkBorderCollision(x, y);

	}

//Keeps track on the apples, and verifies for collision with them
	if ((appleX < x + snakeHeadWidth) && 
		(appleX + snakeHeadWidth > x) && 
		(appleY < y + snakeHeadHeight) && 
		(snakeHeadHeight + appleY > y)) {
		eatApple = true;
		applesEaten = applesEaten + 1;
		trailLength = trailLength + 10;
		appleX = randomizePos(canvas.width);
		appleY = randomizePos(canvas.height);
		eatApple = false;
	}

	drawScore();

}

//Introduces the keybindings as event listeners
document.addEventListener("keydown", keyDownHandler, false);
function keyDownHandler(e) {
	if (e.key == "Right" || e.key == "ArrowRight") {
		keyPressed = "Right";

	} else if (e.key == "Left" || e.key == "ArrowLeft") {
		keyPressed = "Left";

	} else if (e.key == "Up" || e.key == "ArrowUp") {
		keyPressed = "Up";

	} else if (e.key == "Down" || e.key == "ArrowDown") {
		keyPressed = "Down";

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

let interval = setInterval(moveSnake, 15);