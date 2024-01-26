let currentPlayer = '1';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleClick(event) {
  const cellIndex = event.target.dataset.index;

  if (gameBoard[cellIndex] === '' && gameActive) {
    gameBoard[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;
    if (checkWin()) {
      displayStatus(`Player ${currentPlayer} wins!`);
      gameActive = false;
    } else if (gameBoard.every(cell => cell !== '')) {
      displayStatus('It\'s a tie!');
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === '1' ? '2' : '1';
      displayStatus(`Player ${currentPlayer}'s turn`);
    }
  }
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]              
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c];
  });
}

function displayStatus(message) {
  document.getElementById('status').textContent = message;
}

function resetGame() {
  currentPlayer = '1';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;

  document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;

  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.textContent = '';
  });
}