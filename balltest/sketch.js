var margin = 100;
var ballHeight = margin;
//meter is basically tick
var meter = 20;
// scales with gravity of planet - so if gravity of moon
// is 4.5, then go ahead and change it's value to 4.5 
var gravity = 30;
var distancePerSec = 0;
var dir = 1;
//var bounce;
var halver = .5;

var lastTime = 0;

var state = 0;
var fallstate = 0;

function setup() {
  createCanvas(400, 700);
  
  //ballHeight = 100;
}

function draw() {
  background(230);
  
  stroke(240, 0, 0);
  line(0, ballHeight, width, ballHeight);

  noStroke();
  fill(70,100,200);
  ellipseMode(RADIUS);
  ellipse(width/2, ballHeight, 10, 10);
  
  var tickfill = 0;
  for (var i = 0; i < height; i=i+meter){
    stroke(tickfill,0,0);
    line(10, i, 20, i);
    
    fill(0);
    noStroke();
    textAlign(LEFT, CENTER);
    text(i/meter+" m", 25, height-i);
    
    if (ballHeight < i+5 && ballHeight > i-5 ) {
      tickfill=255;
    }
  }
  
  if(mouseIsPressed) {
    state = 1;
  }
  if(state == 1) {
    
    // The height of a ball when dropped is determined by this equation:
    // h(t) = h - g/2*t^2
    
    if(millis() - lastTime >= 1000/100) {
      lastTime = millis();
      distancePerSec = (meter*gravity)/100;
      
      //print(lastTime);
      var totalHeight = (100) + ((gravity*meter)/2)*pow(lastTime/1000, 2);
        
    }
    
    println(totalHeight);
    
    ballHeight = totalHeight;
    
    /*ballHeight = ballHeight + (distancePerSec * dir);
    var distanceTraveled = ballHeight-margin;
    var half;
    
    var bounce = ((height-100)) - ((height-100) * halver);  
    if(ballHeight > height-10) {
      dir = dir *-1;
      fallstate = 1;
     
      halver = halver*.5;
      
      
    }*/
    
    if(fallstate == 1) {
      //bounce = bounce/2;
      //fallstate = 1;
      if(ballHeight < (bounce)){
        dir *= -1;
        //delay(200);
        fallstate = 1;
      }
      
      if(halver < .015){
        ballHeight = height-10;
      }
      
    }
    
    /*if(ballHeight < 296/*distanceTraveled/2*) {
        dir *= -1;
        println("hmm");
      }*/
    //println(ballHeight);
    
      
  }
    
    
}