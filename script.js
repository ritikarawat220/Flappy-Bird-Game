// constants
let FRAME_SIZE = 500;
let BIRD_SIZE = FRAME_SIZE / 10;
let GRAVITY = 5;
let PIPE_SPEED = 3;
let GAP = 25;
let FPS = 25;
let BIRD_POS = FRAME_SIZE / 2;
let JUMP = 50;
let SCORE = 0;

// grab different elements
let bird = document.querySelector('.bird');
let pipes = [...document.querySelectorAll('.pipe')];
let score = document.querySelector('.score span');

function init() {
  load();
  play();
}

function load() {
  document.documentElement.style.setProperty('--speed', `${PIPE_SPEED}s`);
  document.documentElement.style.setProperty('--bird-size', `${BIRD_SIZE}px`);
  document.documentElement.style.setProperty('--frame-size', `${FRAME_SIZE}px`);
}

function play() {
  setInterval(() => {
    const randomHeight = Math.floor(Math.random() * 50) + 5;
    pipes[1].style.height = `${randomHeight}%`;
    pipes[0].style.height = `${100 - (randomHeight + GAP)}%`;
    pipes[0].style.top = `${randomHeight + GAP}%`;
    SCORE += 10;
  }, PIPE_SPEED * 1000);

  setInterval(() => {
    BIRD_POS += GRAVITY;

    if (BIRD_POS >= FRAME_SIZE + BIRD_SIZE) gameOver();
    if (BIRD_POS <= 0) BIRD_POS = 0;

    if (collided(bird, pipes[0]) || collided(bird, pipes[1])) gameOver();
  }, 100);

  window.addEventListener('keyup', function (e) {
    if (e.code !== 'Space') return;
    BIRD_POS -= JUMP;
  });

  setInterval(() => {
    bird.style.top = `${BIRD_POS}px`;
    score.innerText = SCORE;
  }, 100);
}

function gameOver() {
  window.location.reload();
}

function collided(source, target) {
  var sourceRect = source.getBoundingClientRect();
  var targetRect = target.getBoundingClientRect();

  return (
    sourceRect.right >= targetRect.left &&
    sourceRect.left <= targetRect.right &&
    sourceRect.bottom >= targetRect.top &&
    sourceRect.top <= targetRect.bottom
  );
}

window.onload = init;