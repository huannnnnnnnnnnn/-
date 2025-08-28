let answer;
let min;
let max;
let guessHistory;
let gameOver;

const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const restartBtn = document.getElementById('restartBtn');
const rangeText = document.getElementById('rangeText');
const messageText = document.getElementById('message');

function initGame() {
  answer = Math.floor(Math.random() * 100) + 1;
  min = 1;
  max = 100;
  guessHistory = [];
  gameOver = false;

  updateRangeText();
  showMessage('');
  guessInput.value = '';
  guessInput.disabled = false;
  guessBtn.disabled = false;
  restartBtn.style.display = 'none';
}

function updateRangeText() {
  const displayMin = Math.max(1, min - 1);
  const displayMax = Math.min(100, max + 1);

  if (displayMin === displayMax) {
    rangeText.textContent = `最後機會！請猜 ${displayMin}`;
  } else {
    rangeText.textContent = `請猜一個 ${displayMin} 到 ${displayMax} 之間的數字：`;
  }
}

function showMessage(text) {
  messageText.textContent = text;
}

function makeGuess() {
  if (gameOver) return;

  const guess = Number(guessInput.value);

  if (isNaN(guess) || guess < min || guess > max) {
    alert(`請輸入介於 ${min} 與 ${max} 之間的有效數字！`);
    return;
  }

  guessHistory.push(guess);

  if (guess === answer) {
    alert(`🎉 恭喜猜對了！答案是 ${answer}\n你猜過的數字有：${guessHistory.join(', ')}`);
    endGame('你贏了！');
    return;
  }

  if (guess < answer) {
    min = guess + 1;
    showMessage('太小了！');
  } else {
    max = guess - 1;
    showMessage('太大了！');
  }

  guessInput.value = '';

  if (min > max) {
    alert(`😞 沒有更多猜測範圍了！答案是 ${answer}\n你猜過的數字有：${guessHistory.join(', ')}`);
    endGame('遊戲結束！');
    return;
  }

  updateRangeText();
}

function endGame(msg) {
  gameOver = true;
  showMessage(msg);
  guessInput.disabled = true;
  guessBtn.disabled = true;
  restartBtn.style.display = 'inline-block';
}

function restartGame() {
  initGame();
}

guessBtn.addEventListener('click', makeGuess);
restartBtn.addEventListener('click', restartGame);

window.onload = initGame;
