/*class Shape{
  //Shape(){}
  //function draw(){
    if(mouseIsPressed){
      fill(255,0,0);
      rect(20,20,40,40);
    } else {
      fill(0,0,255);
      ellipse(40,40,40,40);
    }
  }
}*/

var canvHeight;

var dropButton, pauseButton, resetButton,
  tickSlider, tickLab,
  meterSlider, meterLab,
  addBallBtn, addLab,
  inputLab, inputName,
  gravitySlider, gravityLab;

var ballName = 'Earth Ball'

// tickspace is the space between ticks, in meters
var tickspace = 50;

// meters is the default height of the ball times tickspace
var meters = 12;

/*********************************************************/
// The gravity variable reflects with gravity of planet - change 
// it to the gravity of the moon, and it will reflect accurately
//                          
// Note: It is in units of meters - but can you change it to
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

/*********************************************************/
// margin is the height of the ball before the simulation
// begins
/*********************************************************/
var margin;

/*********************************************************/
// ballHeight is the y position of the ball. In the simulation,
// when dropped, it is the variable that constantly changes
// the height of the ball. It's value is margin currently because
// it is the starting height
/*********************************************************/
var ballHeight;

//var drag;
var terminalvel; //sqrt( (2*mass*gravity)/(density*area*dragcoef) );
var mass = 1; // (gram)
var area; //4 * PI * exp(5);
var dragcoef = .5;

// q
//density of air at sea level when the temperature is 15 °C is 1.225 kg/m3.
var airdensity = 1.225; // = airpressure/(gas constant*(Celsius + 273.15));

var squisher = 1;

var distancePerSec = 0;
var dir = 1;

var bounce;

var lastTime = 0;

var state = 0;
var fallstate = 0;
var bouncestate = 0;

var linestate = 0;
var heightState = 0;
var resetstate = 0;

var add = false;

var divWidth;

var sec = 0;

var bImg;
var canvas;

var xscaler = 3;
 
//Shape shape;

function setup() {

  bImg = loadImage('libraries/starry_sky.jpg')

  canvHeight = document.getElementById("canvasLoc").clientHeight;

  divWidth = document.getElementById("canvasLoc").clientWidth;
  
  //Javascript loaded html
  canvas = createCanvas(divWidth, canvHeight);
  canvas.parent("canvasLoc");

  dropButton = createButton('Drop').class('btn btn-primary btn-sm').parent('drop_button');
  dropButton.mousePressed(dropClick);

  pauseButton = createButton('').class('btn btn-primary btn-sm').parent('pause_button');
  createElement('span', '').class('glyphicon glyphicon-pause').attribute("arial-hidden", "true").parent(pauseButton);
  pauseButton.mousePressed(pauseClick);

  resetButton = createButton('').class('btn btn-primary btn-sm').parent('reset_button');
  createElement('span', '').class('glyphicon glyphicon-repeat').attribute("arial-hidden", "true").parent(resetButton);
  resetButton.mousePressed(resetClick);

  tickLab = createElement('label', 'Tickspace').parent('sliderLoc');
  tickSlider = createSlider(10, 100, tickspace).parent('sliderLoc');

  meterLab = createElement('label').parent('sliderLoc');
  meterSlider = createSlider(1, 150, meters).parent('sliderLoc');
  
  addBallBtn = createButton('add ').class('btn btn-primary btn-sm').parent('ballSettings');
  createElement('span', '').class('glyphicon glyphicon-plus').attribute("arial-hidden", "true").parent(addBallBtn);
  addBallBtn.mousePressed(addBall);

  inputLab = createElement('label', 'Name of Ball:').parent('ballSettings');
  inputName = createElement('span', ballName).attribute('contenteditable','true').parent('ballSettings');

  gravityLab = createElement('label').parent('ballSettings');
  gravitySlider = createSlider(.5, 200, gravity).parent('ballSettings');

  //println(dropButton.elt);

}

function draw() {
  canvas.size(document.getElementById("canvasLoc").clientWidth, document.getElementById("canvasLoc").clientHeight);
  
  background(bImg);
  //rect(10,10,10,10);
  //test();
  
  //println(addBall());
  
  //xscaler = 100;
  
  if(add === true){
    //xscaler += 30;
    //ball(document.getElementById("canvasLoc").clientWidth / xscaler);
  }
  
  //add = false;
  
  // gravity, height, elaticity, name
  simulation(gravity, meters, e, ballName, document.getElementById("canvasLoc").clientWidth/2);
  
  axis();

}

function simulation(g, m, el, n, x) {
  speedometer(x);

  //ball(x);

  bouncer(g, m, el, n, x);
}

function bouncer(grav, m, el,name, xpos) {
  
  tickLab.elt.textContent = 'Tickspace: ' + tickspace + ' px';
  meterLab.elt.textContent = 'Height: ' + meters + ' meters';
  gravityLab.elt.innerHTML = 'Gravity: ' + gravity + ' m/s/s';
  
  fill(240);
  textAlign(CENTER);
  text(name, xpos, ballHeight - 20);

  stroke(240, 0, 0);
  line(0, ballHeight, width, ballHeight);

  /*fill(230);
  noStroke();
  rect(0, 0, width, ballHeight);*/

  noStroke();
  fill(70, 100, 200);
  ellipseMode(RADIUS);
  ellipse(xpos, ballHeight, tickspace / 4, (tickspace / 4));

  if (state === 0) {

      tickspace = tickSlider.value();
      meters = meterSlider.value();
      ballName = inputName.elt.innerHTML;

      margin = canvHeight - tickspace * meters;
      ballHeight = margin;


    }

  if (state == 1) {
    //area = /*4 * */ PI * exp(5);
   // println(sqrt((2 * 5000 * gravity) / (airdensity * area * dragcoef)));
    //terminalvel = sqrt((2 * 5000 * gravity) / (airdensity * area * dragcoef));
    
    //var drag;
    //terminalvel = sqrt( (2*mass*gravity)/(airdensity*area*dragcoef) );
    //mass = 1;// (gram)
    //var dragcoef = .5;

    // q
    //density of air at sea level when the temperature is 15 °C is 1.225 kg/m3.
    //var airdensity = 1.225;// = airpressure/(gas constant*(Celsius + 273.15));

    //println(distancePerSec);
    /*if(pow((tickspace * gravity), sec) < terminalvel) {
        distancePerSec = pow((tickspace * gravity), sec);
      }
    if(pow((tickspace * gravity), sec) > terminalvel) {
      distancePerSec = terminalvel;
      //println(distancePerSec);
      
    }*/

    distancePerSec = pow((tickspace * gravity), sec);

    ballHeight = ballHeight + (distancePerSec * dir);


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

    bounce = margin + ((canvHeight - margin)) - ((canvHeight - margin) * e);

    if (ballHeight > canvHeight - tickspace / 4) {
      dir = dir * -1;
      fallstate = 1;

      e = e * e;

      bouncestate = 1;

      /*squisher = squisher - .1;
      if (squisher < .75) {
        squisher = .75
      }*/
    }

    if (fallstate == 1) {

      //stroke(255);
      //line(0, bounce, width, bounce);

      if (ballHeight < bounce) {
        dir *= -1;
        bouncestate = 0;
      }

      if (e < .0005) {
        ballHeight = canvHeight - tickspace / 4;
        bouncestate = 2;
      }

      if (bouncestate == 2) {
        sec = 0;
        //squisher = 1; //squisher + .3;
        //state = 0;
        //dropButton.mousePressed(dropClick);
      }

    }
    //}

  }
}

function dropClick() {
  state = 1;
  lastTime = millis();

  document.getElementById('canvasLoc').scrollIntoView({behavior: "smooth"});
  
}

function pauseClick() {

  state = 3;
  
}

function resetClick() {
  lastTime = millis();

  sec = 0;
  state = 0;
  fallstate = 0;
  bouncestate = 0;

  e = .75;

}
function addBall() {
  
    xscaler = xscaler + 1;
    add = true;
    
    
  }
function test() {
  rect(10,10,10,10);
}

function ball(xpos) {
  fill(240);
  textAlign(CENTER);
  text(ballName, xpos, ballHeight - 20);

  stroke(240, 0, 0);
  line(0, ballHeight, width, ballHeight);

  /*fill(230);
  noStroke();
  rect(0, 0, width, ballHeight);*/

  noStroke();
  fill(70, 100, 200);
  ellipseMode(RADIUS);
  ellipse(xpos, ballHeight, tickspace / 4, (tickspace / 4) - sec);
}

function speedometer() {
  ellipseMode(CENTER);
  strokeWeight(2);
  stroke(100);
  fill(250, 240, 240);
  arc(width - 50, height - 20, 60, 60, PI, 2 * PI);
  line(width - 20, height - 20, width - 80, height - 20);
  var p;
  p = ((distancePerSec / 10) / 6) * PI;

  stroke(240, 0, 0);
  line(width - 50 - (cos(p) * 10), height - 20 - (sin(p) * 10), width - 50 - (cos(p) * 30), height - 20 - (sin(p) * 30));
}

function axis() {
  stroke(255);
  line(10, 0, 10, canvHeight);

  var tickfill = 0;
  var textfill = 0;
  for (var i = 0; i < canvHeight; i = i + tickspace) {
    stroke(255);
    line(10, canvHeight - i, 20, canvHeight - i);

    line(10, canvHeight - i - tickspace / 2, 15, canvHeight - i - tickspace / 2);

    fill(255);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(10);
    text(i / tickspace + " m", 25, canvHeight - i);

    /*if (ballHeight < i+5 && ballHeight > i-5 ) {
      tickfill=255;
    }
    if (ballHeight < canvHeight-i+5 && ballHeight > canvHeight-i-5) {
      textfill=255;
    }*/
  }
}

function mouseWheel(event) {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    canvHeight += event.delta;

    if (canvHeight < document.getElementById("canvasLoc").clientHeight) {
      canvHeight = document.getElementById("canvasLoc").clientHeight;
    }

  }
}

function touchMoved() {
  if (touchX > 0 && touchX < width && touchY > 0 && touchY < height) {
    //canvHeight += event.delta;
    canvHeight++;

    if (canvHeight < document.getElementById("canvasLoc").clientHeight) {
      canvHeight = document.getElementById("canvasLoc").clientHeight;
    }

    return false;

  }
}