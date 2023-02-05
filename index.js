// Import stylesheets
import './style.css';

// Write Javascript code!
// Initialize canvas and game variables
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
let score = 0;
let snake = [];
let blockSize = 10;
let width = canvas.width;
let height = canvas.height;
let food = {
  x: Math.floor(Math.random() * (width / blockSize)) * blockSize,
  y: Math.floor(Math.random() * (height / blockSize)) * blockSize
};
let direction = "right";

// Initialize snake
for (let i = 5; i >= 0; i--) {
  snake.push({ x: i, y: 0 });
}

// Main game loop
setInterval(() => {
  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, blockSize, blockSize);

  // Move snake
  let x = snake[0].x;
  let y = snake[0].y;
  switch (direction) {
    case "right":
      x++;
      break;
    case "left":
      x--;
      break;
    case "up":
      y--;
      break;
    case "down":
      y++;
      break;
  }

  // Check for collision with wall or snake's body
  if (x === -1 || x === width / blockSize || y === -1 || y === height / blockSize || checkCollision(x, y, snake)) {
    alert(`Game Over. Your score is ${score}`);
    location.reload();
  }

  // If snake eats food, generate new food and increase score
  if (x === food.x / blockSize && y === food.y / blockSize) {
    score++;
    food = {
      x: Math.floor(Math.random() * (width / blockSize)) * blockSize,
      y: Math.floor(Math.random() * (height / blockSize)) * blockSize
    };
  } else {
    // Remove tail if food is not eaten
    snake.pop();
  }

  // Add new head
  let newHead = {
    x: x,
    y: y
  };
  snake.unshift(newHead);

  // Draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = "green";
    ctx.fillRect(snake[i].x * blockSize, snake[i].y * blockSize, blockSize, blockSize);
  }

  // Display score
  ctx.fillStyle = "white";
  ctx.font = "14px Arial";
  ctx.fillText(`Score: ${score}`, 5, height - 5);
}, 100);

// Check for collision with snake's body
function checkCollision(x, y, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].x === x && array[i].y === y) return true;
  }
  return false;
}

// Handle arrow key events to change direction
document.onkeydown = function(event) {
  switch (event.keyCode) {
    case 37:
      if (direction !== "right") direction = "left";
      break;
    case 38:
      if (direction !== "down") direction = "up";
      break;
    case 39:
      if (direction !== "left") direction = "right";
      break;
    case 40:
      if (direction !== "up") direction = "down";
      break;
  }
};
