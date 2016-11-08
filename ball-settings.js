/****************************/
// We have several settings we can add to this program.
// They include:
// * gravity
// * elasticity
// * radius
// * fillColor
//
// Use these names to indicate to the program that you are adding that
// setting. They need to be copied exactly, so feel free to copy and paste.

// In order to create a new setting, you will need to follow some steps.
// First, we will need to declare 2 variables (var), for the slider and
// label. We should also indicate the setting within the variable name.
//
// So overall, the variable names should look something like this:
// (setting name)Slider, (setting name)Label
//
//  slider variable  label variable
//        ↓            ↓
var heightSlider, heightLabel;

// Try uncommenting (deleting the two slashes behind) the variable below. Nothing
// will happen yet, but this is only the first of steps!
//
//var gravitySlider, gravityLabel;

// Create a new slider and label variable here! ↓

//

function settingsSetup() {

  // Then we will need to create some HTML elements - the slider and it's label. To do this, start
  // by making your label variable equal:
  //
  // createElement('label').parent('ballSettings');
  heightLabel = createElement('label').parent('ballSettings');

  // The slider variable needs to equal:
  // createSlider((minimum value), (maximum value), (start value), (step)).id('(setting name)Slider').parent('ballSettings');
  //
  //                         min  max start step    name
  //                          ↓    ↓    ↓   ↓         ↓
  heightSlider = createSlider(1, 5000, 12, 0.5).id('heightSlider').parent('ballSettings');

  // Uncomment the two lines below to see what happens!
  //
  //gravityLabel = createElement('label').parent('ballSettings');
  //gravitySlider = createSlider(.5, 200, 10, .5).id('gravitySlider').parent('ballSettings');

  // Create a new slider and label element here! ↓

  //
}

function settingsDrawLabelValue() {
  // Now we need to draw the label value. It needs to change when the value of
  // the slider changes. This is fairly straightforward. First, write the label variable as:
  //
  // (label variable).elt.innerHTML
  //
  // Then have it equal:
  // '(name of setting): ' + ballObjs[index].(setting) + ' (unit)';
  //
  // label variable             name                      setting   unit
  //   ↓                         ↓                           ↓        ↓
  heightLabel.elt.innerHTML = 'Height: ' + ballObjs[index].meters + ' m';

  // Uncommet this line and see what happens!
  //gravityLabel.elt.innerHTML = 'Gravity: ' + ballObjs[index].gravity + ' m/sec/sec';

  // Create a new label display here! ↓

  //
}

function settingsSetValue(i) {
  // Now we need to have the value of the sliders to change to the values of the ball when it is clicked on.
  // In order to this, we will need to create a new line and  write:
  //
  // document.getElementById('(label variable)').value = ballObjs[i].(setting);
  //
  //                     label variable                      setting
  //                          ↓                                 ↓
  document.getElementById('heightSlider').value = ballObjs[i].meters;

  // Uncomment the line below to see what happens!
  //document.getElementById('gravitySlider').value = ballObjs[i].gravity;

  // Set the value here! ↓

  //
}

function settingsEdit() {
  // To make the values of the ball correspond with the values of the sliders, we need to make the ball values
  // equal the values of the sliders. To do this, create a new line and write:
  //
  // ballObjs[index].(setting) = (slider variable).value();
  //
  //              setting   slider variable
  //                ↓         ↓
  ballObjs[index].meters = heightSlider.value();

  //Uncomment the line below to see what happens!
  //ballObjs[index].gravity = gravitySlider.value();

  // Make the value of the bale equal the slider's value here! ↓

  //
}