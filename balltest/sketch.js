
var margin = 0;
var ballHeight = margin;
// meter is basically tick
var meter = 20;
// scales with gravity of planet - so if gravity of moon
// is 4.5, then go ahead and change it's value to 4.5 
var gravity = .4;
var vel = 96;
var acceleration = 10;

// the elasticticy of the ball
var e = .75;

var distancePerSec = 0;
var dir = 1;

var lastTime = 0;
var squaredTime = 0;

var state = 0;
var fallstate = 0;

var divWidth;

var distanceSquared;

var last = 0;
var m = 0;

function setup() {
  
  divWidth = document.getElementById("canvasLoc").clientWidth;
  
  var canvas = createCanvas(divWidth, 700);
  canvas.parent("canvasLoc");
  
  rSlider = createSlider(0, 255, 100);
  rSlider.position(20, 20);
  rSlider.parent('sliderLoc');

}

function draw() {
  background(230);//100,100,240);
  
 // m = millis()-last;
  
  if(millis() > last+5000){
      //last = millis();
    // do something every 5 seconds
  }
  
  var r = rSlider.value();
  
  line(10,0,10,height);
  
  stroke(240, 0, 0);
  line(0, ballHeight, width, ballHeight);
  
  /*fill(230);
  noStroke();
  rect(0, 0, width, ballHeight);*/

  noStroke();
  fill(70,100,200);
  ellipseMode(RADIUS);
  ellipse(divWidth/2, ballHeight, 10, 10);
  
  var tickfill = 0;
  var textfill = 0;
  for (var i = 0; i < height; i=i+meter){
    stroke(tickfill,0,0);
    line(10, i, 20, i);
    
    fill(textfill, 0, 0);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(10);
    text(i/meter+" m", 25, height-i);
    
    /*if (ballHeight < i+5 && ballHeight > i-5 ) {
      tickfill=255;
    }
    if (ballHeight < height-i+5 && ballHeight > height-i-5) {
      textfill=255;
    }*/
  }
  
  if(mouseIsPressed || touchIsDown) {
    state = 1;
  }
  if(state == 1) {
    
    // The height of a ball when dropped is determined by this equation:
    // h(t) = h - g/2*t^2
    
    m = millis() - lastTime;
    
      if(millis() >= lastTime + 1000/100) {
        //lastTime = millis();
        distancePerSec = pow((meter*gravity),m/1000)/100;
        
        println(m);
        
        //print(lastTime);
        //var totalHeight = (100) + ((gravity*meter)/2)*pow(lastTime/1000, 2);
          
      }
    
    ballHeight = ballHeight + (distancePerSec * dir);
    
    var distanceTraveled = ballHeight-margin;

    var bounce = ((height-margin)) - ((height-margin) * e); 
    
    if(ballHeight > height-10) {
      dir = dir *-1;
      fallstate = 1;
     
      e = e*e;
      
      //lastTime = 0;
      
      
    }
    
    //println(lastTime);
    
    if(fallstate == 1) {
      
      if(ballHeight < (bounce)){
        dir *= -1;
        //last = millis();
        lastTime = millis();
      }
      //lastTime = 0;
      
      if(e < .0005){
        ballHeight = height-10;
      }
      
    }
    
      
  }
    
    
}

