let textOffsetX = 150;
let textOffsetY = 150;

function Menu() {
  // stroke(80);
  // strokeWeight(8);
  // background(255);
  //Real Menu
  
  //Score 
    textSize(100);
    noStroke();
    fill(80);

    textAlign(RIGHT, TOP);
    text(p1.score, width/2 - textOffsetX, textOffsetY);

    textAlign(LEFT);
    text(p2.score, width/2 + textOffsetX, textOffsetY);

  
  
  
  
}