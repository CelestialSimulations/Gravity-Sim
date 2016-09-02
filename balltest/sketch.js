var canvHeight;

var dropButton, pauseButton, resetButton,
  tickSlider, tickLab,
  //meterSlider, meterLab,
  addBallBtn, delBallBtn,
  inputLab, inputName,
  gravitySlider, gravityLab, 
  heightSlider, heightLab;

var ballObjs = [{
  xpos: 70,
  ypos: canvHeight-tickspace*12,
  fillColor: 240,
  dir: 1,
  elasticity: .75,
  time: 0,
  speed: 0,
  gravity: 10,
  last: 0,
  endTime: .0005,
  bstate: 0,
  fstate: 0,
  marg: 0,
  met: 12,
  radius: 10
}];

var dropped = 1;
var turnstate = 0;

var index  = 0;


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

//var add = false;

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

  //meterLab = createElement('label').parent('sliderLoc');
  //meterSlider = createSlider(1, 150, meters).parent('sliderLoc');

  addBallBtn = createButton('').class('btn btn-primary btn-sm').style('width', 'inherit').style('float','right').parent('setBtnLoc');
  createElement('span', '').class('glyphicon glyphicon-plus').attribute("arial-hidden", "true").parent(addBallBtn);
  addBallBtn.mousePressed(add);

  inputLab = createElement('label', 'Name of Ball:').parent('ballSettings');
  inputName = createElement('span', ballName).attribute('contenteditable', 'true').parent('ballSettings');
  
  heightLab = createElement('label','Height').parent('ballSettings');
  heightSlider = createSlider(1, 100, 12).id('heightSlider');
  heightSlider.parent('ballSettings');

  gravityLab = createElement('label').parent('ballSettings');
  gravitySlider = createSlider(.5, 200, gravity).parent('ballSettings');
  
  delBallBtn = createButton('').class('btn btn-primary btn-sm').parent('ballSettings');
  createElement('span', '').class('glyphicon glyphicon-trash').attribute("arial-hidden", "true").parent(delBallBtn);
  delBallBtn.mousePressed(deleteBall);

}

function draw() {
  canvas.size(document.getElementById("canvasLoc").clientWidth, document.getElementById("canvasLoc").clientHeight);

  background(80);
  
  tickLab.elt.textContent = 'Tickspace: ' + tickspace + ' px';
  tickspace = tickSlider.value();

  //ball objects
  noStroke();
  fill(255);
  for (var i = 0; i < ballObjs.length; i++) {
    //heightLab.elt.innerHTML = 'Height: ' + ballObjs[index].met + ' m';//+ heightSlider.value();
    
    //text(ballName)
    
    fill(50, 50, ballObjs[i].fillColor);
    ellipse(ballObjs[i].xpos, ballObjs[i].ypos, 25, 25);
    
    if(state === 0) {
      
      //if(turnstate === 0) {
        i != index;
       ballObjs[i].marg = canvHeight - tickspace * ballObjs[i].met;//meters;
       ballObjs[i].ypos = ballObjs[i].marg; 
      //}
      //turnstate = 0;
      
      if (mouseX > ballObjs[i].xpos - 12 && mouseX < ballObjs[i].xpos + 12 && mouseY > ballObjs[i].ypos - 12 && mouseY < ballObjs[i].ypos + 12) {
        ballObjs[i].fillColor = 100; //ballObjs[i].fillColor - 10;
        if (mouseIsPressed) {
          //ballObjs.splice(i, 1);
          //slider.attribute('value', ballObjs[i].ypos);
  
          document.getElementById('heightSlider').value = ballObjs[i].met;
          
          index = ballObjs.map(function(d) {
            return d.xpos
          }).indexOf(ballObjs[i].xpos);
          
          turnstate = 1;
        }
      } else {
        ballObjs[i].fillColor = 240;
      }
      
      if (turnstate == 1) {
        //i != index;
        //ballObjs[i].marg = canvHeight - tickspace * ballObjs[i].met;
        //ballObjs[i].ypos = ballObjs[i].marg; 
        
        ballObjs[index].met = heightSlider.value();
        ballObjs[index].marg = canvHeight - tickspace*ballObjs[index].met;
        ballObjs[index].ypos = ballObjs[index].marg;
        
        ballObjs[index].fillColor = 150;
      }
    }

    if (state == 1) {
      distancePerSec = pow((tickspace * gravity), ballObjs[i].time);
      ballObjs[i].ypos = ballObjs[i].ypos + (distancePerSec * ballObjs[i].dir);

      if (ballObjs[i].bstate === 0) {
        if (millis() >= ballObjs[i].last + 1000 / 100) {
          ballObjs[i].last = millis();
          ballObjs[i].time = ballObjs[i].time + (1 / 100);
        }
      }

      if (ballObjs[i].bstate == 1) {
        if (millis() >= ballObjs[i].last + 1000 / 100) {
          ballObjs[i].last = millis();
          ballObjs[i].time = ballObjs[i].time - (1 / 100);
        }
      }
      
      bounce = ballObjs[i].marg + ((canvHeight - ballObjs[i].marg)) - ((canvHeight - ballObjs[i].marg) * ballObjs[i].elasticity);

      if (ballObjs[i].ypos > canvHeight - 12) {
        ballObjs[i].dir *= -1;
        ballObjs[i].fstate = 1;
        ballObjs[i].elasticity = ballObjs[i].elasticity * ballObjs[i].elasticity;
        ballObjs[i].bstate = 1;
      }
      
      if (ballObjs[i].fstate == 1) {

        if (ballObjs[i].ypos < bounce) {
          ballObjs[i].dir *= -1;
          ballObjs[i].bstate = 0;
        }
  
        if (ballObjs[i].elasticity < ballObjs[i].endTime) {
          ballObjs[i].ypos = canvHeight - 12;//tickspace / 4;
          ballObjs[i].bstate = 2;
          //sec = 0;
          //ballObjs[i].time = 0;// ballObjs[i].endTime-.0005;
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
  //bouncer();
  speedometer();

}

function add() {
  ballObjs.unshift({
    xpos: 70,
    ypos: 0,//heightSlider.value(),
    fillColor: 240,
    dir: 1,
    elasticity: .75,
    time: 0,
    speed: 0,
    gravity: 10,
    last: 0,
    endTime: .0005,
    bstate: 0,
    fstate: 0,
    marg: 0,
    met: heightSlider.value(),//12,
    radius: 10
  });
  for (var i = 1; i < ballObjs.length; i++) {
    ballObjs[i].xpos += 30;
  }
}

function dropClick() {
  state = 1;
  //lastTime = millis();
  turnstate = 0;
  
  for(var i = 0; i < ballObjs.length; i++) {
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
  //lastTime = millis();
  
  for(var i = 0; i < ballObjs.length; i++) {
    ballObjs[i].time = 0;
    ballObjs[i].fstate = 0;
    ballObjs[i].bstate = 0;
    ballObjs[i].elasticity = .75;
    ballObjs[i].last = millis();
  }

  //sec = 0;
  state = 0;
  //fallstate = 0;
  //bouncestate = 0;

  //e = .75;

}
function deleteBall() {
  //ballObjs[index].
  ballObjs.splice(index, 1);
  turnstate = 0;
  if(index < ballObjs.length) {
    for(var i = 0; i < ballObjs.length; i++) {
      if(i >= index) {
        ballObjs[i].xpos -= 30;
      }
    }
  }
    //
  println(index);
}




function bouncer() {

  //tickLab.elt.textContent = 'Tickspace: ' + tickspace + ' px';
  //meterLab.elt.textContent = 'Height: ' + meters + ' meters';
  //gravityLab.elt.innerHTML = 'Gravity: ' + gravity + ' m/s/s';

  fill(240);
  textAlign(CENTER);
  text(ballName, document.getElementById("canvasLoc").clientWidth / 2, ballHeight - 20);

  stroke(240, 0, 0);
  line(0, ballHeight, width, ballHeight);

  /*fill(230);
  noStroke();
  rect(0, 0, width, ballHeight);*/

  noStroke();
  fill(70, 100, 200);
  ellipseMode(RADIUS);
  ellipse(document.getElementById("canvasLoc").clientWidth / 2, ballHeight, tickspace / 4, (tickspace / 4));

  if (state === 0) {

    //tickspace = tickSlider.value();
    //meters = meterSlider.value();
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

    /*distancePerSec = pow((tickspace * gravity), sec);

    ballHeight = ballHeight + (distancePerSec * dir);
    
    //for(var i = 0; i > ballObjs.length; i++) {
      //ballObjs[i].ypos = ballObjs[i].ypos + 500;//(distancePerSec * dir);
    //}


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

    }

    if (fallstate == 1) {

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
      }

    }*/

  }
}

function addBall() {

  xscaler = xscaler + 1;
  //add = true;


}

function test() {
  rect(10, 10, 10, 10);
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