function Cell(x,y,index, val){
  this.xpos = x;
  this.ypos = y;
  this.i = index;
  this.value = val;
  
  this.show = function(){
    noFill();
    stroke(180).strokeWeight(1);
    rect(this.xpos, this.ypos,60,60);
    if(this.value != 0){
      fill(255);
      stroke(255);
      textSize(35);
      text(this.value,this.xpos+20,this.ypos+43);
    }
  };
  
  this.highlight = function(num){
    fill(0,230,0,130);
    stroke(50);
    rect(this.xpos-2,this.ypos-2,64,64);
    
    if(this.value == 0){
      if (num == 10){  num=9;   }
      fill(255);
      stroke(255).strokeWeight(1);
      textSize(35);
      text(num,this.xpos+20,this.ypos+43);
    }

  };
}
