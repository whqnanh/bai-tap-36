const basket = document.getElementById('basket');
const apple = document.getElementById('apple');
const scoreEl = document.getElementById('score');
const livesEl = document.getElementById('lives');
const startBtn = document.getElementById('start-btn');
const gameOverEl = document.getElementById('game-over');

let score = 0;
let lives = 3;
let speed = 3;
let basketX = 210;
let appleX = 238;
let appleY = 0;
let running = false;
let gameLoopId = null;
const keys = {};

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    e.preventDefault();
    keys[e.key] = true;
  }
});

window.addEventListener('keyup', (e) => {
  keys[e.key] = false;
});

function resetApple() {
  appleY = 0;
  appleX = Math.floor(Math.random() * (500 - 24));
  apple.style.top = appleY + 'px';
  apple.style.left = appleX + 'px';
}

function update() {
  if (!running) return;

  if (keys['ArrowLeft'] && basketX > 0) {
    basketX = Math.max(0, basketX - 7);
  }
  if (keys['ArrowRight'] && basketX < 500 - 80) {
    basketX = Math.min(500 - 80, basketX + 7);
  }
  basket.style.left = basketX + 'px';

  appleY += speed;
  apple.style.top = appleY + 'px';

  const basketTop = basket.offsetTop;
  if (
    appleY + 24 >= basketTop &&
    appleY <= basketTop + 25 &&
    appleX + 24 >= basketX &&
    appleX <= basketX + 80
  ) {
    score++;
    scoreEl.textContent = score;
    speed += 0.3;
    resetApple();
  } else if (appleY + 24 >= 400) {
    lives--;
    livesEl.textContent = lives;
    if (lives <= 0) {
      running = false;
      cancelAnimationFrame(gameLoopId);
      gameOverEl.style.display = 'flex';
      return;
    }
    resetApple();
  }

  gameLoopId = requestAnimationFrame(update);
}

startBtn.addEventListener('click', () => {
  if (gameLoopId) cancelAnimationFrame(gameLoopId);
  score = 0;
  lives = 3;
  speed = 3;
  basketX = 210;
  basket.style.left = basketX + 'px';
  scoreEl.textContent = score;
  livesEl.textContent = lives;
  gameOverEl.style.display = 'none';
  resetApple();
  running = true;
  gameLoopId = requestAnimationFrame(update);
});
