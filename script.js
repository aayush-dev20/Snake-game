const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const box = 20;
let snake = [{ x: 9 * box, y: 10 * box }];
let direction = null;
let score = 0;

let food = {
  x: Math.floor(Math.random() * 19 + 1) * box,
  y: Math.floor(Math.random() * 19 + 1) * box,
};

// Keyboard controls
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

// Mobile controls
document.getElementById("up").onclick = () => {
  if (direction !== "DOWN") direction = "UP";
};
document.getElementById("down").onclick = () => {
  if (direction !== "UP") direction = "DOWN";
};
document.getElementById("left").onclick = () => {
  if (direction !== "RIGHT") direction = "LEFT";
};
document.getElementById("right").onclick = () => {
  if (direction !== "LEFT") direction = "RIGHT";
};

function collision(head, arr) {
  return arr.some((part) => part.x === head.x && part.y === head.y);
}

function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 400, 400);

  // Snake body
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#00ff7f" : "#1e90ff";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "LEFT") headX -= box;
  if (direction === "UP") headY -= box;
  if (direction === "RIGHT") headX += box;
  if (direction === "DOWN") headY += box;

  // Eat food
  if (headX === food.x && headY === food.y) {
    score++;
    document.getElementById("score").textContent = score;
    food = {
      x: Math.floor(Math.random() * 19 + 1) * box,
      y: Math.floor(Math.random() * 19 + 1) * box,
    };
  } else {
    snake.pop();
  }

  const newHead = { x: headX, y: headY };

  // Game over
  if (
    headX < 0 ||
    headY < 0 ||
    headX >= 400 ||
    headY >= 400 ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    alert("💀 Game Over! Your Score: " + score);
    location.reload();
  }

  snake.unshift(newHead);
}

const game = setInterval(draw, 120);
