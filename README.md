# The Gravity Simulator

Welcome to the Gravity Simulator! This program stimulates gravity by dropping a ball at
the rate of gravity! But... the value of gravity is up to you! It could be 10 m/s/s, or
it could be 200 m/s/s! You will be able to change other things as well, such as the
starting height of the ball, the elasticticy, radius, and even the name! To this, you
will be able to add balls with their settings by calling a **function**.

![preview](preview.png "Gravity Simulator")

A function is basically a block of code that you've written that can be used over and
over. It can also be similar to a formula in that you are able to input values into it.
For example, a function with a single parameter could look like this:

```
function addOne(input) {
  input = input + 1
}
```

In this function, I am adding 1 to whatever gets passed in as the input. I know
`input = input + 1` seems, well, incorrect, but in programming, it is you who decides
what equals what. So if you say something is going to equal something plus one, then it
will!

Then it can be called like this:

```
addOne(3)
```

`addOne(3)` would be equal to 4, because I am adding 1 to the input, which is 3. I can
use this function as many times as I would like to, in fact. Like this!

```
addOne(10) (equals 11)
addOne(13) (equals 14)
addOne(100) (equals 101 dalmations)
```

Knowing how to call a function will be essential in succeeding in this simulation. If you
need help, or something doesn't make any sense, feel free to ask for help.

Now, in order to add a new ball, there is a function we have to call. It is called, `addBall`. I have already done the programming that adds the ball, but it is up to you
to call it.

You can start with this:

```
addBall()
```

This will add a ball with defualt settings to the simulation. However, you can change those
settings by adding parameters, or inputs. There are a total of six parameters you can add, and I will explain them now.

First, is the **name** input. You can decide what to call your ball. It should be in quotes when you pass it in. For example:

```
addBall('earth ball')
```

The next parameter you can add is gravity. It is in units of meters per second squared, so it's default is 10. To change that, pass in the name input, then the gravity input. Like this:

```
addBall('earth ball', 3)
```

This would give the ball a name of earth ball and a gravity of 3 m/s². You can also change the starting height of the ball, elasticity, radius, and color.

Here is a table on how to use the order of the parameters to pass in the inputs. The last row is an example calling all six parameters.

| parameters | Name | Gravity | Starting Height in Meters | Elasticity | Radius | Color |
| ---------- | ---- | ------- | ------------------------- | ---------- | ------ | ----- |
| default values | 'Ball' | 10 | 12 | .75 | 10 | 'blue' |
| addBall | ( 'earth ball', | 3, | 10, | .7, | 15, | 'red' ) |

Elasticity will need to be between .01 and .99 to avoid errors, but basically it is the percentage of how far the the ball bounces back up.

Radius is the size of the ball in pixels, so you can choose any positive number you like, but, a warning, if you make to large, it might cover the entire simulation ;)

Color has several options for what you can write as it's value, but, generally, the names of generic colors, such as 'yellow', 'green', 'orange', 'purple', will work just fine. The color names must be wrapped in quotes.

Try adding balls with different gravity first, so you can analyze the differences of the gravity of different planets. For example, the gravity of the moon is 1.622 m/s². But feel free to go wild! There's tons you can do with these paramters.

To explore it, we will first need to [get the the code](#getting-the-code).

## Getting the Code...
To get the code from the online repository to your computer, you can either download it or clone it.

1. [Downloading it](#downloading)
2. [Cloning it](#cloning)

### Downloading

Simply find this button,

![alt download](downloadbtn.png "download")

and click Download Zip.

### Cloning

If you choose to use git, then you'll first to want to open Terminal. Search Terminal on your computer
and open it. Type:

```
cd Documents
```
and hit enter to navigate to the Documents folder within Terminal (it's just like the Finder). Then you'll want to
type in the following git command. You can just copy and paste the entire block and hit enter. Git will
do the work for you. Believe in Git.

```
git clone https://github.com/CelestialSimulations/Gravity-Sim.git
```
It should appear in Documents folder quickly.

You should rename your folder so you know it's yours. Now double click on your folder, and then open the file called **balls.js** in either Atom or the application P5, which should be on your computer. Both are excellent code editors, it doesn't matter a whole lot which one you choose. With Atom, you can run the program by double-clicking on the file called index.html, and with P5, you can just click on the run icon. 

Now, to analyze your Gravity Simulator!