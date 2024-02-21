const $board = document.querySelector('.board');
const ROW_SIZE = 7;
const MIN_BOARD_SIZE = ROW_SIZE * 3;
const MAX_BOARD_SIZE = ROW_SIZE * ROW_SIZE;

function addCells(amount = 1) {
  const cellsLength = $board.children.length;
  if (cellsLength >= MAX_BOARD_SIZE) {
    const buttons = document.querySelectorAll('.add-button');
    buttons.forEach(button => button.setAttribute('disabled', true));
    return;
  };
  if (cellsLength + amount > MAX_BOARD_SIZE) {
    amount = MAX_BOARD_SIZE - cellsLength;
  }
  const $fragment = document.createDocumentFragment();
  for (let i = 0; i < amount; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', addPawn);
    $fragment.appendChild(cell);
  }
  $board.appendChild($fragment);
}

function selectAllCells() {
  const allCells = document.querySelectorAll('.cell');
  return allCells;
}

function startBoard() {
  // Add cells to the board
  addCells(MIN_BOARD_SIZE);
  // Add button container
  const $buttonContainer = document.createElement('div');
  $buttonContainer.classList.add('button-container');
  document.body.insertBefore($buttonContainer, $board);
  // Add button to add more cells
  const $addCellButton = document.createElement('button');
  $addCellButton.textContent = 'Adicionar casa';
  $addCellButton.classList.add('add-button');
  $addCellButton.addEventListener('click', addCells.bind(null, 1));
  $buttonContainer.appendChild($addCellButton);
  // Add button to add a row of cells
  const $addRowButton = document.createElement('button');
  $addRowButton.textContent = 'Adicionar linha';
  $addRowButton.classList.add('add-button');
  $addRowButton.addEventListener('click', addCells.bind(null, ROW_SIZE));
  $buttonContainer.appendChild($addRowButton);
}

function removePawn() {
  const allCells = selectAllCells();
  allCells.forEach(cell => cell.classList.remove('pawn'));
}

function addPawn(event) {
  const currentCell = event.target;
  if (currentCell.classList.contains('pawn')) {
    currentCell.classList.remove('pawn');
    return;
  }
  removePawn();
  currentCell.classList.add('pawn');
}

startBoard();
