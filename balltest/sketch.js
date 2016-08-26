var canvHeight = 700;

var dropButton, pauseButton, tickSlider, tickLabel;

// tickspace is the space between ticks, in meters
var tickspace = 20;

var meters = 30;

/*********************************************************/
// margin is the height of the ball before the simulation
// begins
/*********************************************************/
var margin; // = canvHeight - tickspace*meters;

/*********************************************************/
// ballHeight is the y position of the ball. In the simulation,
// when dropped, it is the variable that constantly changes
// the height of the ball. It's value is margin currently because
// it is the starting height
/*********************************************************/
var ballHeight; // = margin;

/*********************************************************/
// The gravity variable with gravity of planet - change it to
// the gravity of the moon, and it will reflect accurately
//
// Note: It is in units of domElementLocs - but can you change it to
// feet (gravity accelerates at 32/f/s/s on Earth)? Hint: create 
// a new variable - this is a ratio problem
/*********************************************************/
var gravity = 10;

/*********************************************************/
// e is the elasticticy of the ball - it should be less than 1,
// otherwise it will never come to rest - but feel free to
// experiment
/*********************************************************/
var e = .75;

var distancePerSec = 0;
var dir = 1;

var lastTime = 0;

var state = 0;
var fallstate = 0;
var bouncestate = 0;

var divWidth;

var sec = 0;

var bImg; 

function setup() {
  
  bImg = loadImage('libraries/starry_sky.jpg')

  divWidth = document.getElementById("canvasLoc").clientWidth;

  var canvas = createCanvas(divWidth, canvHeight);
  canvas.parent("canvasLoc");

  dropButton = createButton('Drop').class('btn btn-primary').parent('drop_button');
  dropButton.mousePressed(dropClick);
  
  pauseButton = createButton('').class('btn btn-primary').parent('pause_button');
  pauseIcon = createElement('span','').class('glyphicon glyphicon-pause').attribute("arial-hidden","true").parent(pauseButton);
  pauseButton.mousePressed(pauseClick);

  tickLabel = createElement('label', 'Tickspace').id('tickLab').parent('sliderLoc')
  tickSlider = createSlider(10, 100, 20).parent('tickLab');

}

function draw() {
  background(bImg); //100,100,240);

  // m = millis()-last;

  if (state == 0) {

    tickspace = tickSlider.value();

    margin = canvHeight - tickspace * meters;
    ballHeight = margin;
  }

  //var r = rSlider.value();
  //tickspace = r;
  //margin = r * 5;
  //ballHeight = height-margin;
  
  stroke(255);
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
  for (var i = 0; i < height; i = i + tickspace) {
    stroke(255);
    line(10, height - i, 20, height - i);

    fill(255);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(10);
    text(i / tickspace + " m", 25, height - i);

    /*if (ballHeight < i+5 && ballHeight > i-5 ) {
      tickfill=255;
    }
    if (ballHeight < height-i+5 && ballHeight > height-i-5) {
      textfill=255;
    }*/
  }

  distancePerSec = pow((tickspace * gravity), sec);

  if (state == 1) {

    if (bouncestate === 0) {
      if (millis() >= lastTime + 1000 / 100) {
        lastTime = millis();
        sec = sec + (1 / 100);
      }
    }

    if (bouncestate == 1) {
      if (millis() >= lastTime + 1000 / 100) {
        lastTime = millis();
        sec = sec - (1 / 100);
      }
    }

    ballHeight = ballHeight + (distancePerSec * dir);

    var distanceTraveled = ballHeight - margin;

    var bounce = margin + ((height - margin)) - ((height - margin) * e);

    if (ballHeight > height - 10) {
      dir = dir * -1;
      fallstate = 1;

      e = e * e;

      bouncestate = 1;

      //lastTime = 0;

      //println(sec);


    }

    //println(lastTime);

    if (fallstate == 1) {

      if (ballHeight < (bounce)) {
        dir *= -1;
        bounceTime = sec;

        bouncestate = 0;
        //last = millis();
        //lastTime = millis();

      }
      //lastTime = 0;

      if (e < .0005) {
        ballHeight = height - 10;
        bouncestate = 2;
      }

      if (bouncestate == 2) {
        sec = 0;
      }

    }


  }


}

function dropClick() {
  state = 1;
  lastTime = millis();
}
function pauseClick() {
  state = 0;
  lastTime = 0;
}