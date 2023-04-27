function colorOn(event){
  event.target.id = 'square-colored';
  return;
}

function createBoard(size=16){
  const prevBoard = document.querySelector('#board');
  while (prevBoard.firstChild){
    prevBoard.firstChild.remove();
  }

  const newBoard = document.querySelector('#board');
  const row = document.createElement('div');
  row.className = 'row'
  for (let i = 0; i < size; i++){
    const square = document.createElement('div');
    square.id = 'square';
    row.appendChild(square);
  }
  for (let i = 0; i < size; i++){
    const rowCopy = row.cloneNode(true);
    newBoard.appendChild(rowCopy);
  }

  const squares = Array.from(document.querySelectorAll('#square'));
  for (let i = 0; i < squares.length; i++){
    squares[i].addEventListener('mouseenter', colorOn);
  }
}

createBoard();
const newButton = document.querySelector('button');
newButton.addEventListener('click', () => {
  const boardInput = prompt("Board size?");
  if (boardInput < 0 || boardInput > 100){
    alert("Size only from 1-100");
  }else{
    createBoard(boardInput);
  }
});
