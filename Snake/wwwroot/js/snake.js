

const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");


const ground = new Image();
ground.src = "../img/ground.png";

const foodImg = new Image();
foodImg.src = "../img/food.png";

let dead = new Audio();
dead.src = "../audio/dead.mp3";
let eat = new Audio();
eat.src = "../audio/eat.mp3";
let up = new Audio();
up.src = "../audio/up.mp3";
let right = new Audio();
right.src = "../audio/right.mp3";
let down = new Audio();
down.src = "../audio/down.mp3";
let left = new Audio();
left.src = "../audio/left.mp3";


let box = 32;

let snake = [];

snake[0] = {
    x: 9 * box,
    y: 10 * box,
}

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

let score = 0;
let bestscore = 0;
let direction;
document.addEventListener("keydown", changeDirection)

function changeDirection(event) {
    console.log("stigam do tuk");
    let keydown = event.keyCode;
    if (keydown == 65 && direction != "RIGHT") {
        left.play();
        direction = "LEFT";
    } else if (keydown == 87 && direction != "DOWN") {
        direction = "UP";
        up.play();
    } else if (keydown == 68 && direction != "LEFT") {
        direction = "RIGHT";
        right.play();
    } else if (keydown == 83 && direction != "UP") {
        direction = "DOWN";
        down.play();
    }
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {

            return true;
        }
    }
    return false;
}

function draw() {

    ctx.drawImage(ground, 0, 0);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(foodImg, food.x, food.y);

    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // which direction
    if (direction == "LEFT") snakeX -= box;
    if (direction == "UP") snakeY -= box;
    if (direction == "RIGHT") snakeX += box;
    if (direction == "DOWN") snakeY += box;

    // if the snake eats the food
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        eat.play();
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
        // we don't remove the tail
    } else {
        // remove the tail
        snake.pop();
    }

    // add new Head

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // game over

    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)) {
        if (bestscore < score) {
            bestscore = score;
        }
        clearInterval(game);
        dead.play();
    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2 * box, 1.6 * box);
    ctx.fillText("Best Score", 126, 48);
    ctx.fillText(bestscore, 330, 51);
}

let game = setInterval(draw, 30);
