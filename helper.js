var looping = true; 

function init_cells(){
  let xpos = 30;
  let ypos = 30;
  for(let i=0;i<9;i++){
    for(let j=0;j<9;j++){
      cells[i*9+j] = new Cell(xpos,ypos,i*9+j,sudoku[i][j]);
      //cells[i*9+j] = new Cell(xpos,ypos,i*9+j,i*9+j);

      xpos += 60;
    }
    ypos += 60;
    xpos = 30;
  }
  currentCell = cells[0];
  solvepuzzle = false;
  puzzleIsSolved = false;
  redraw();
}

function createSudoku(){
  for(let i=0;i<9;i++){
    for(let j=0;j<9;j++){
       sudoku[i][j] = input.value()[i*9+j];
    }
  }
  init_cells();
  input.value('');
  input.hide();
  button6.hide();
  p1.hide();
}

function toggleShow(){
  input.show(); 
  button6.show();
  p1.show();
}

function setSolvePuzzle(){
  solvepuzzle = true; 
  puzzleIsSolved = false;
  looping = true;
  loop();
}

function togglePause(){
  // Have to keep track of looping with a flag because isLooping() is not working.
  if (looping){
    noLoop();
    looping = false;
  }
  else{
    looping = true;
    loop();
  }
}

function processStep(){
  if(looping){
    noLoop();
    looping = false;
  }
  if(!solvepuzzle && !puzzleIsSolved){
    solvepuzzle = true;
  }
  
  redraw();
}


//------------- functions to check game logic -----------------\\
function validRow(index,target){
  let row = floor(index/9)*9;
  for (let i=row; i<row+9;i++){
    if (cells[i].value == target){
      return false;
    }
   }
   return true;
}

function validColumn(index,target){
  let column = index%9;
  let m = column;
  for (let k=column; k < column+9; k++){
    if (cells[m].value == target){
      return false;
    }
    m+=9;
  }
  return true;
}

function validBox(index,target){
  // given a 3x3 box, and the index for the inserted numbers
  //  0   0   0  
  //  0 index 0
  //  0   0   0
  // we want to shift the index to the top right of the box
  //   index   0   0  
  //     0     0   0
  //     0     0   0
  let x= index%9;
  let y = floor(index/9);
  
  let cellindex = index - (x%3) - (y%3)*9;
  for (let i = cellindex; i < cellindex+3; i++) {
    if (cells[i].value == target) {
      return false;
    }
  }

  for (let i = cellindex + 9; i < cellindex + 12; i++) {
    if (cells[i].value == target) {
      return false;
    }
  }

  for (let i =  cellindex + 18; i <  cellindex + 21; i++) {
    if (cells[i].value == target) {
      return false;
    }
  }
  return true;
}
