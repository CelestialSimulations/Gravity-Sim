var margin = 0;
var ballHeight = margin;
// meter is basically tick
var meter = 20;
// scales with gravity of planet - so if gravity of moon
// is 4.5, then go ahead and change it's value to 4.5 
var gravity = 10;
//var vel = 96;
//var acceleration = 10;

// the elasticticy of the ball
var e = .75;

var distancePerSec = 0;
var dir = 1;

var lastTime = 0;
//var squaredTime = 0;
//var counter = 0;

var state = 0;
var fallstate = 0;
var bouncestate = 0;

var divWidth;

//var distanceSquared;

var last = 0;
var m = 0;

var sec = 0;

//var interpolate = 0;

function setup() {

  divWidth = document.getElementById("canvasLoc").clientWidth;

  var canvas = createCanvas(divWidth, 700);
  canvas.parent("canvasLoc");

  rSlider = createSlider(5, 100, 20);
  rSlider.position(20, 20);
  rSlider.parent('sliderLoc');

}

function draw() {
  background(230); //100,100,240);
  
  visuals();

  // m = millis()-last;
  
  //print(sqrt(16,2));
  
  var unit = meter * gravity;

  if (mouseIsPressed || touchIsDown) {
    lastTime = millis();// - counter;
    state = 1;
  }
  
  if (state == 1) {

    // The height of a ball when dropped is determined by this equation:
    // h(t) = h - g/2*t^2

    //m = millis() - lastTime;
    
    var func = pow;
    
    m = millis()-last;
  
    if(millis() > last+1000/100){
        last = millis();
        
        sec=sec+1/100;
        
        distancePerSec = pow((unit), m/1000);
        
      // do something every 5 seconds
    }
    
    println(sec);

    //if (millis() - lastTime >= 1000) {
      //sec++;
      
     // println("huh");
      //lastTime = millis();
      //distancePerSec = pow((unit), m / 1000)/100;

      //print(lastTime);
      //var totalHeight = (100) + ((gravity*meter)/2)*pow(lastTime/1000, 2);
      
      //println(sec);
      
      //println("huh");

   // }
    
    //println(lastTime);
    
    //var testtime = 0;
    
    if (keyIsPressed) {
      
      bouncestate = 1;
      
      //func = sqrt;
      
      // need to make it count down
      //lastTime = millis();
      
        //distancePerSec = sqrt(unit, m/1000);
        //maybe - need deaccelerate
        /*interpolate = interpolate+.025;
        if (interpolate >= 1) {
          interpolate = 1;
        }
        //println(interpolate);
        lastTime = millis();*/ 
        //*interpolate;
        
        //testtime = millis();
      }
      
     // var t = millis() - testtime;
      
      //testtime = 
      
      //println(t);

    //println(m);
    
    ballHeight = ballHeight + (distancePerSec * dir);

    var distanceTraveled = ballHeight - margin;

    var bounce = ((height - margin)) - ((height - margin) * e);

    if (ballHeight > height - 10) {
      
      //lastTime = millis();

      dir = dir * -1;
      fallstate = 1;

      e = e * e;
      
      bouncestate = 1;

    }
    
    if(bouncestate == 1) {
      m = millis()-last;
      if(millis() > last+1000/100){
          last = millis();
          
          sec=sec-1;
          
      }
    }

    //println(lastTime);

    if (fallstate == 1) {

      if (ballHeight < (bounce)) {
        dir *= -1;
        //last = millis();
        //lastTime = millis();
        //sec = 0;
      }
      //lastTime = 0;

      if (e < .0005) {
        ballHeight = height - 10;
        //fallstate = 0;
      }

    }


  }


}

function visuals() {
  var r = rSlider.value();
  
  //meter = r;
  
  //print(r);

  line(10, 0, 10, height);

  stroke(240, 0, 0);
  line(0, ballHeight, width, ballHeight);

  /*fill(230);
  noStroke();
  rect(0, 0, width, ballHeight);*/

  noStroke();
  fill(70, 100, 200);
  ellipseMode(RADIUS);
  ellipse(divWidth / 2, ballHeight, 10, 10);

  var tickfill = 0;
  var textfill = 0;
  for (var i = 0; i < height; i = i + meter) {
    stroke(tickfill, 0, 0);
    line(10, i, 20, i);

    fill(textfill, 0, 0);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(10);
    text(i / meter + " m", 25, height - i);

    /*if (ballHeight < i+5 && ballHeight > i-5 ) {
      tickfill=255;
    }
    if (ballHeight < height-i+5 && ballHeight > height-i-5) {
      textfill=255;
    }*/
  }
}