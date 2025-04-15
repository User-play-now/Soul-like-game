const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = { x: 50, y: 300, w: 40, h: 40, color: '#ffffff', vx: 0, vy: 0, grounded: false };
let gravity = 0.5;
let keys = {};

function startGame() {
  window.addEventListener('keydown', e => keys[e.key] = true);
  window.addEventListener('keyup', e => keys[e.key] = false);
  requestAnimationFrame(updateGame);
}

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Apply gravity
  player.vy += gravity;

  // Controls
  if (keys['ArrowRight']) player.vx = 2;
  else if (keys['ArrowLeft']) player.vx = -2;
  else player.vx = 0;

  if (keys[' '] && player.grounded) {
    player.vy = -10;
    player.grounded = false;
  }

  // Update player
  player.x += player.vx;
  player.y += player.vy;

  // Ground collision
  if (player.y + player.h >= canvas.height) {
    player.y = canvas.height - player.h;
    player.vy = 0;
    player.grounded = true;
  }

  drawPlayer();
  requestAnimationFrame(updateGame);
}

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.w, player.h);
    }
