var canvHeight;

var dropButton, pauseButton, resetButton, tickSlider, tickLab, meterSlider, meterLab;

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

var drag;
var terminalvel;
var dragcoef = .5;

var squisher = 1;

var distancePerSec = 0;
var dir = 1;

var bounce;

var lastTime = 0;

var state = 0;
var fallstate = 0;
var bouncestate = 0;

var linestate = 0;
var heightState =0;
var resetstate = 0;

var divWidth;

var sec = 0;

var bImg; 
var canvas;

function setup() {
  
  bImg = loadImage('libraries/starry_sky.jpg')
  
  canvHeight = document.getElementById("canvasLoc").clientHeight;

  divWidth = document.getElementById("canvasLoc").clientWidth;

  canvas = createCanvas(divWidth, canvHeight);
  canvas.parent("canvasLoc");

  dropButton = createButton('Drop').class('btn btn-primary btn-sm').parent('drop_button');
  dropButton.mousePressed(dropClick);
  
  pauseButton = createButton('').class('btn btn-primary btn-sm').parent('pause_button');
  createElement('span','').class('glyphicon glyphicon-pause').attribute("arial-hidden","true").parent(pauseButton);
  pauseButton.mousePressed(pauseClick);
  
  resetButton = createButton('').class('btn btn-primary btn-sm').parent('reset_button');
  createElement('span','').class('glyphicon glyphicon-repeat').attribute("arial-hidden","true").parent(resetButton);
  resetButton.mousePressed(resetClick);

  tickLab = createElement('label', 'Tickspace').parent('sliderLoc');
  tickSlider = createSlider(10, 100, tickspace).parent('sliderLoc');
  
  meterLab = createElement('label').parent('sliderLoc');
  meterSlider = createSlider(1, 500, meters).parent('sliderLoc');
  
  println(dropButton.elt);

}

function draw() {
  canvas.size(document.getElementById("canvasLoc").clientWidth, document.getElementById("canvasLoc").clientHeight);
  
  background(bImg);
  
  tickLab.elt.textContent = 'Tickspace: '+tickspace+' px';
  meterLab.elt.textContent = 'Height: '+meters+' meters';

  speedometer();
  
  ball();

  axis();
  
  bouncer();

}

function bouncer() {
  
  sliderValues();

  if (state == 1) {
    distancePerSec = pow((tickspace * gravity), sec);
    
    //if (resetstate == 0) {
      ballHeight = ballHeight + (distancePerSec * dir);
      
      /*if (resetstate == 1) {
        //lastTime = millis();
        ballHeight = margin;
        sec = 0;
       // bouncestate = 0;
      }*/
    //if(resetstate === 0) {
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

    if (ballHeight > canvHeight - tickspace/4) {
      dir = dir * -1;
      fallstate = 1;

      e = e * e;

      bouncestate = 1;
      
      
      
      squisher = squisher - .1;
      if(squisher < .75) {
        squisher = .75
      }
    }

    if (fallstate == 1) {
      
      //stroke(255);
      //line(0, bounce, width, bounce);

      if (ballHeight < bounce) {
        dir *= -1;
        bouncestate = 0;
      }

      if (e < .0005) {
        ballHeight = canvHeight - tickspace/4;
        bouncestate = 2;
      }

      if (bouncestate == 2) {
        sec = 0;
        squisher = 1;//squisher + .3;
        //state = 0;
        //dropButton.mousePressed(dropClick);
      }

    }
    //}
    
  }
  
  function sliderValues() {
  if (state === 0) {

    tickspace = tickSlider.value();
    meters = meterSlider.value();

    margin = canvHeight - tickspace * meters;
    ballHeight = margin;
    
    
  }
}
}

function dropClick() {
  state = 1;
  lastTime = millis();
  //resetstate = 0;
  //canvas.size(document.getElementById("canvasLoc").clientWidth, document.getElementById("canvasLoc").clientHeight);
  
  //dropButton.mousePressed(dropClick);
  
  //document.getElementById('canvasLoc').scrollIntoView({behavior: "smooth"});
  /* usage */
scroll.To('canvasLoc');
}
function pauseClick() {
  //state = 0;
  //lastTime = millis();
  state=3;
  //println(state);
}
function resetClick() {
  lastTime = millis();
  
  //ballHeight = ballHeight + (distancePerSec * dir);
  //resetstate = 1;
  //state--;
  //lastTime = 0;
  //bouncestate = 1;
  /*if (millis() >= lastTime + 1000 / 100) {
        lastTime = millis();
        sec = sec - (1 / 100);
      }*/
  sec = 0;
  state = 0;
  fallstate = 0;
  bouncestate = 0;
  
  e = .75;
  
  //if()
  
  
  //if(state == 1) {
  //  ballHeight = margin;
  //}
  //ballHeight = ballHeight - (distancePerSec * dir);
}

function ball() {
  stroke(240, 0, 0);
  line(0, ballHeight, width, ballHeight);

  /*fill(230);
  noStroke();
  rect(0, 0, width, ballHeight);*/

  noStroke();
  fill(70, 100, 200);
  ellipseMode(RADIUS);
  ellipse(document.getElementById("canvasLoc").clientWidth / 2, ballHeight, tickspace/4, (tickspace/4)-sec);
}

function speedometer() {
  strokeWeight(2);
  stroke(100);
  fill(250,240,240);
   arc(width-50, height-20, 60, 60, PI, 2*PI);
   line(width-20,height-20,width-80,height-20);
  var p;
  p=((distancePerSec/10)/6)*PI;
  
  stroke(240,0,0);
  line(width-50-(cos(p)*10),height-20-(sin(p)*10),width-50-(cos(p)*30),height-20-(sin(p)*30));
}

function axis() {
  stroke(255);
  line(10, 0, 10, canvHeight);
  
  var tickfill = 0;
  var textfill = 0;
  for (var i = 0; i < canvHeight; i = i + tickspace) {
    stroke(255);
    line(10, canvHeight - i, 20, canvHeight - i);
    
    line(10, canvHeight - i-tickspace/2, 15, canvHeight - i-tickspace/2);

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
  if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    canvHeight += event.delta;

    if(canvHeight < document.getElementById("canvasLoc").clientHeight) {
      canvHeight = document.getElementById("canvasLoc").clientHeight;
    }
    
  }
}

var scroll = (function() {

    var elementPosition = function(a) {
        return function() {
            return a.getBoundingClientRect().top;
        };
    };

    var scrolling = function( elementID ) {

        var el = document.getElementById( elementID ),
            elPos = elementPosition( el ),
            duration = 50,
            increment = Math.round( Math.abs( elPos() )/40 ),
            time = Math.round( duration/increment ),
            prev = 0,
            E;

        function scroller() {
            E = elPos();

            if (E === prev) {
                return;
            } else {
                prev = E;
            }

            increment = (E > -20 && E < 20) ? ((E > - 5 && E < 5) ? 1 : 5) : increment;

            if (E > 1 || E < -1) {

                if (E < 0) {
                    window.scrollBy( 0,-increment );
                } else {
                    window.scrollBy( 0,increment );
                }

                setTimeout(scroller, time);

            } else {

                el.scrollTo( 0,0 );

            }
        }

        scroller();
    };

    return {
        To: scrolling
    }

})();

/*function Scroll_To(elem, pos)
{
    var y = elem.scrollTop;
    y += (pos - y) * 0.3;
    if (Math.abs(y-pos) < 2)
    {
        elem.scrollTop = pos;
        return;
    }
    elem.scrollTop = y;
    setTimeout(Scroll_To, 40, elem, pos);   
}*/