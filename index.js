function getLValue(r, g ,b){
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};

function gradientOn(event){
  let rgb = window.getComputedStyle(event.target).backgroundColor;
  if (rgb.includes('rgba')){
    rgb = rgb.slice(5, 15);
  }else{
    rgb = rgb.slice(4, 17);
  }
  rgb = rgb.split(", ");
  var lValue = getLValue(rgb[0], rgb[1], rgb[2])[2];
  if (lValue == 0){
    lValue = 90;
  }else if (lValue > 0){
    lValue -= 10;
  }
  event.target.style.backgroundColor = `hsl(0, 0%, ${lValue}%)`;
}

function randColor(){
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  return `rgb(${red}, ${green}, ${blue})`;
}

function rainbowOn(event){
  const randomColor = randColor();
  event.target.style.backgroundColor = randomColor;
}

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

// new board button
const newButton = document.querySelector('#new');
newButton.addEventListener('click', () => {
  const boardInput = prompt("Board size?");
  if (boardInput < 0 || boardInput > 100){
    alert("Size only from 1-100");
  }else{
    createBoard(boardInput);
  }
});

// rainbow mode button
const rainbowButton = document.querySelector('#rainbow');
rainbowButton.addEventListener('click', () => {
  const squares = Array.from(document.querySelectorAll('#square'));
  for (let i = 0; i < squares.length; i++){
    squares[i].removeEventListener('mouseenter', colorOn);
    squares[i].removeEventListener('mouseenter', gradientOn);
    squares[i].addEventListener('mouseenter', rainbowOn);
  }
});

const gradientButton = document.querySelector('#gradient');
gradientButton.addEventListener('click', () => {
  const squares = Array.from(document.querySelectorAll('#square'));
  for (let i = 0; i < squares.length; i++){
    squares[i].removeEventListener('mouseenter', colorOn);
    squares[i].removeEventListener('mouseenter', rainbowOn);
    squares[i].addEventListener('mouseenter', gradientOn);
  }
});