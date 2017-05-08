// In order to add a new ball, you will need to call a function. A function is a block of code that can
// be reused over and over, and when you're calling a one, you're basically injecting the function's code
// into your program.

// making a function looks like this:
// function dostuff() {
//   do something  ←←←←←←←←←←←←←←←←←
// }                                                ↑
// While calling this function looks like this:     ↑
// dostuff()                                        ↑
// This would essentially tell the program to 'do something'.

function showBalls() {

  // The values inside the parenthesis are called parameters. They are values that can be inputed into the
  // function, like a formula. In order to call a function, you will need to state the name of the
  // function, which is called 'addBall' in our case, then add parenthesis() after it. Give it a try!

  // Call your addBall function here

  //

  // Now try adding some parameters to it. The paramenters you can add are in this order:
  // name, gravity in m/s/s, starting height in meters, elasicity, radius, color
  //
  // In this order, this is what parameters represent. For example parameter 1 will always be name,
  // parameter 2 will always be gravity, parameter 3 will always be height, ect.
  //
  // This means that you can input values, in this order, in the parenthesises. For example:
  //        name    gravity  meters  elasicity diameter color
  //          ↓          ↓      ↓      ↓          ↓     ↓
  addBall('earth',      10,    10,    .75,       1.4,  'red');
  addBall('john', 10, 7, .6, 1, 'pink');

  // There are up to six parameters you can add, but it still works if you add less! Default values will
  // automatically be set

  
  addBall('bob');
  
  // Go ahead add a bunch! This way, you can compare how balls bounce with different gravity and height, etc.
} 