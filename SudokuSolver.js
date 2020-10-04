var sudoku =[
  [8,0,9,2,0,6,0,0,4],
  [0,0,4,7,0,0,0,9,0],
  [0,0,0,9,0,0,6,1,0],
  [9,0,0,0,0,2,0,4,0],
  [0,0,2,0,7,0,1,0,0],
  [0,6,0,5,0,0,0,0,3],
  [0,2,3,0,0,5,0,0,0],
  [0,9,0,0,0,7,4,0,0],
  [4,0,8,3,6,0,2,0,0]
];
var cells=[];
var stack=[];
var cellSize = 60;
var currentCell;
var inputnum = 1;
var solvepuzzle = false;
var puzzleIsSolved = false;

function setup() {
  createCanvas(850, 600);
  frameRate(20);
  init_cells();

  button = createButton("Solve Puzzle");
  button.position(585,28);
  button.mousePressed(setSolvePuzzle);
  button.size(100);

  button2 = createButton("Toggle Pause");
  button2.position(686,28);
  button2.mousePressed(togglePause);
  button2.size(100);

  button3 = createButton("Next Step");
  button3.position(585,52);
  button3.mousePressed(processStep);
  button3.size(100);
  
  button4 = createButton("Reset Puzzle");
  button4.position(686,52);
  button4.mousePressed(init_cells);
  button4.size(100);
  
  slider = createSlider(1, 100, 20,  1);
  slider.position(580,550);
  slider.size(200);
  
  button5 = createButton("Input Custom Sudoku");
  button5.position(585,78);
  button5.size(200);
  button5.mousePressed(toggleShow);
  
  button6 = createButton("Input");
  button6.position(585,235);
  button6.size(50);
  button6.mousePressed(createSudoku);
  button6.hide();
  
  input = createInput();
  input.position(585,210);
  input.size(200);
  input.hide();
  
  p1 = createP("Type every number in your sudoku from left to right and top to bottom, without spaces, to the text field below and press 'Input'.");
  p1.style('color', '#fff');
  p1.position(585,100);
  p1.size(200);
  p1.hide();
}



function draw() {
  background(50);
  frameRate(slider.value());
  
  if (solvepuzzle){
    currentCell.highlight(inputnum);
  }
  for(let c in cells){
    cells[c].show();
  }
  fill(255);
  textSize(15);
  text("Frame Rate",583,545);
  drawGrid();
  
  if(solvepuzzle){
    if(currentCell.value == 0){
      if(validRow(currentCell.i,inputnum) && validColumn(currentCell.i,inputnum) && validBox(currentCell.i,inputnum) && inputnum <= 9){
          currentCell.value = inputnum;
          stack.push(currentCell);
          inputnum = 0;
          
          if (currentCell.i+1 != 81){
            currentCell = cells[currentCell.i+1];
          }
          else{
            solvepuzzle = false;
            puzzleIsSolved = true;
          }
    }
        
      else{
        if (inputnum > 8){
          console.log("owo");
          currentCell.value = 0;
          currentCell = stack.pop();
          inputnum = currentCell.value;
          currentCell.value = 0;
        }
      }
    }
    else {
      currentCell = cells[currentCell.i+1];
      inputnum=0;
    }
    inputnum++;
  }
}


function drawGrid(){
  stroke(200).strokeWeight(2);
  for(let i=1; i<9; i++) {
    line(cellSize*(1/2+i), cellSize/2, cellSize*(1/2+i), cellSize*(10-1/2));
    line(cellSize/2, cellSize*(1/2+i), cellSize*(10-1/2), cellSize*(1/2+i));
  }
  stroke(200).strokeWeight(5);
  for(let i=0; i<=3; i++) {
    line(cellSize*(1/2+i*3), cellSize/2, cellSize*(1/2+i*3), cellSize*(10-1/2));
    line(cellSize/2, cellSize*(1/2+i*3), cellSize*(10-1/2), cellSize*(1/2+i*3));
   }
}
