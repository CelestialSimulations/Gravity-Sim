var canvHeight;

var dropButton, pauseButton, resetButton,
  tickSlider, tickLab,
  spacesSlider, spaceLab,
  addBallBtn, delBallBtn,
  inputLab, inputName;

var ballObjs = [{
  xpos: 70,
  ypos: canvHeight - tickspace * 12,
  meters: 12,
  radius: 10,
  name: 'Ball',
  fillColor: 240,
  dir: 1,
  elasticity: .75,
  time: 0,
  speed: 0,
  gravity: 10,
  last: 0,
  bstate: 0,
  fstate: 0,
  marg: 0
}];

var turnstate = 0;
var index = 0;

var ballName = 'Ball'

// tickspace is the space between ticks, in meters
var tickspace = 10;

/*********************************************************/
// The gravity variable reflects with gravity of planet - change 
// it to the gravity of the moon, and it will reflect accurately
//                          
// Note: It is in units of meters - but can you change it to
// feet (gravity accelerates at 32/f/s/s on Earth)? Hint: create 
// a new variable - this is a ratio problem
/*********************************************************/

/*********************************************************/
// e is the elasticticy of the ball - it should be less than 1,
// otherwise it will never come to rest - but feel free to
// experiment
/*********************************************************/

/*********************************************************/
// margin is the height of the ball before the simulation
// begins
/*********************************************************/

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

var distancePerSec = 0;

var state = 0;

var selectedBallSpeed = 0;

var tickrise = 1;

var divWidth;

var bImg;
var canvas;

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

  tickLab = createElement('label', 'Space Between Meters: ').parent('sliderLoc');
  tickSlider = createSlider(.25, 60, tickspace, .25).parent('sliderLoc');
  
  spaceLab = createElement('label', 'Scale').parent('sliderLoc');
  spaceSlider = createSlider(1, 250, 1, 1).parent('sliderLoc');

  addBallBtn = createButton('').class('btn btn-primary btn-sm').style('width', 'inherit').style('float', 'right').parent('setBtnLoc');
  createElement('span', '').class('glyphicon glyphicon-plus').attribute("arial-hidden", "true").parent(addBallBtn);
  addBallBtn.mousePressed(add);

  createElement('div').id('goright').style('float','left').style('margin-bottom','10px').parent('ballSettings');
  inputLab = createElement('label', 'Name of Ball:').style('width','inherit').style('margin-right','10px').parent('goright');
  inputName = createElement('span', ballName).id('name').style('width','inherit').attribute('contenteditable', 'true').parent('goright');
  
  settingsSetup();

  delBallBtn = createButton('').class('btn btn-primary btn-sm').parent('ballSettings');
  createElement('span', '').class('glyphicon glyphicon-trash').attribute("arial-hidden", "true").parent(delBallBtn);
  delBallBtn.mousePressed(deleteBall);

}

function draw() {
  canvas.size(document.getElementById("canvasLoc").clientWidth, document.getElementById("canvasLoc").clientHeight);

  background(30);

  tickLab.elt.textContent = 'Size';
  tickspace = 60.25-tickSlider.value();
  
  spaceLab.elt.innerHTML = 'Scale: ' + tickrise + ' m';
  tickrise = spaceSlider.value();

  if (index < ballObjs.length) {
    settingsDrawLabelValue();
  }

  //ball objects
  noStroke();
  fill(255);
  for (var i = 0; i < ballObjs.length; i++) {

    fill(50, 50, ballObjs[i].fillColor);
    ellipse(ballObjs[i].xpos, ballObjs[i].ypos, ballObjs[i].radius * 2, ballObjs[i].radius * 2);
    
    textAlign(CENTER);
    fill(240);
    text(ballObjs[i].name, ballObjs[i].xpos, ballObjs[i].ypos-ballObjs[i].radius-10);

    if (state === 0) {

      i != index;
      ballObjs[i].radius = tickspace / 4;
      if(ballObjs[i].radius <= 2) {
        ballObjs[i].radius = 2;
      }
      ballObjs[i].marg = canvHeight - tickspace * ballObjs[i].meters;
      ballObjs[i].ypos = ballObjs[i].marg;

      //clicking ball
      if (mouseX > ballObjs[i].xpos - 12 && mouseX < ballObjs[i].xpos + 12 && mouseY > ballObjs[i].ypos - 12 && mouseY < ballObjs[i].ypos + 12) {
        ballObjs[i].fillColor = 100;
        if (mouseIsPressed) {
          
          document.getElementById('name').textContent = ballObjs[i].name;
          settingsSetValue(i);

          index = ballObjs.map(function(d) {
            return d.xpos
          }).indexOf(ballObjs[i].xpos);

          turnstate = 1;
        }
      } else {
        ballObjs[i].fillColor = 240;
      }

      if (turnstate == 1) {
        ballObjs[index].name = inputName.elt.innerHTML;
        ballObjs[index].marg = canvHeight - tickspace * ballObjs[index].meters;
        ballObjs[index].ypos = ballObjs[index].marg;
        
        settingsEdit();

        ballObjs[index].fillColor = 150;
      }
    }

    if (state == 1) {
      distancePerSec = pow((ballObjs[i].meters * ballObjs[i].gravity), ballObjs[i].time);
      ballObjs[i].ypos = ballObjs[i].ypos + (distancePerSec * ballObjs[i].dir);

      if (ballObjs[i].bstate === 0) {
        // increasing the rate
        if (millis() >= ballObjs[i].last + 1000 / 100) {
          ballObjs[i].last = millis();
          ballObjs[i].time = (ballObjs[i].time + (1 / 100));
        }
      }

      if (ballObjs[i].bstate == 1) {
        // decreasing the rate
        if (millis() >= ballObjs[i].last + 1000 / 100) {
          ballObjs[i].last = millis();
          ballObjs[i].time = (ballObjs[i].time - (1 / 100));
        }
      }

      // value where ball comes back
      bounce = ballObjs[i].marg + ((canvHeight - ballObjs[i].marg)) - ((canvHeight - ballObjs[i].marg) * ballObjs[i].elasticity);
      
      // touches bottom
      if (ballObjs[i].ypos > canvHeight - ballObjs[i].radius) {
        ballObjs[i].dir *= -1;
        ballObjs[i].fstate = 1;
        ballObjs[i].elasticity = ballObjs[i].elasticity * ballObjs[i].elasticity;
        ballObjs[i].bstate = 1;
      }

      if (ballObjs[i].fstate == 1) {
        
        // bouncing 
        if (ballObjs[i].ypos < bounce) {
          ballObjs[i].dir *= -1;
          ballObjs[i].bstate = 0;
        }

        // ending it
        if (ballObjs[i].elasticity < .0005) {
          ballObjs[i].ypos = canvHeight - ballObjs[i].radius;
          ballObjs[i].bstate = 2;
        }

        if (ballObjs[i].bstate == 2) {
          ballObjs[i].time = 0;
        }

      }

    }
    if (state == 2) {
      ballObjs[i].ypos = 100;
    }

  }

  axis();
  speedometer();

}

function add() {
  ballObjs.unshift({
    xpos: 70,
    ypos: 0,
    fillColor: 240,
    elasticity: .75,
    meters: heightSlider.value(),
    radius: 10,
    name: inputName.elt.innerHTML,
    dir: 1,
    time: 0,
    speed: 0,
    gravity: 10,
    last: 0,
    bstate: 0,
    fstate: 0,
    marg: 0,
  });
  for (var i = 1; i < ballObjs.length; i++) {
    ballObjs[i].xpos += 30;
  }
}

function dropClick() {
  state = 1;
  turnstate = 0;

  for (var i = 0; i < ballObjs.length; i++) {
    ballObjs[i].last = millis();
  }

  document.getElementById('canvasLoc').scrollIntoView({
    behavior: "smooth"
  });

}

function pauseClick() {
  state = 3;
}

function resetClick() {
  for (var i = 0; i < ballObjs.length; i++) {
    ballObjs[i].time = 0;
    ballObjs[i].fstate = 0;
    ballObjs[i].bstate = 0;
    ballObjs[i].elasticity = .75;
    ballObjs[i].last = millis();
  }
  state = 0;
}

function deleteBall() {
  ballObjs.splice(index, 1);
  turnstate = 0;
  if (index < ballObjs.length) {
    for (var i = 0; i < ballObjs.length; i++) {
      if (i >= index) {
        ballObjs[i].xpos -= 30;
      }
    }
  }
}

function speedometer() {
  if (index < ballObjs.length) {
   selectedBallSpeed = pow((ballObjs[index].meters * ballObjs[index].gravity), ballObjs[index].time) 
  }
  ellipseMode(CENTER);
  strokeWeight(2);
  stroke(100);
  fill(250, 240, 240);
  arc(width - 50, height - 20, 60, 60, PI, 2 * PI);
  line(width - 20, height - 20, width - 80, height - 20);
  var p;
  p = ((selectedBallSpeed / 10) / 6) * PI;

  stroke(240, 0, 0);
  line(width - 50 - (cos(p) * 10), height - 20 - (sin(p) * 10), width - 50 - (cos(p) * 30), height - 20 - (sin(p) * 30));
}

function axis() {
  stroke(255);
  line(10, 0, 10, canvHeight);

  var tickfill = 0;
  var textfill = 0;
  for (var i = 0; i < canvHeight; i = i + tickspace*tickrise) {
    stroke(255);
    line(10, canvHeight - i, 20, canvHeight - i);
    line(10, canvHeight - i - (tickspace*tickrise) / 2, 15, canvHeight - i - (tickspace*tickrise) / 2);

    fill(255);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(10);
    text(i/(tickspace) + " m", 25, canvHeight - i/*+tickrise*/);
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

/*function touchMoved() {
  if (touchX > 0 && touchX < width && touchY > 0 && touchY < height) {
    //canvHeight += event.delta;
    canvHeight++;

    if (canvHeight < document.getElementById("canvasLoc").clientHeight) {
      canvHeight = document.getElementById("canvasLoc").clientHeight;
    }

    return false;

  }
}*/