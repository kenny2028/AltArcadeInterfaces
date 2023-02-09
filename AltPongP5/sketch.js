let polySynth;
let p1,p2, ball; 
let start = false; 
let speed = 2;
let paddlelength = 100;



var serial; //variable to hold an instance of the serial port library
var portName = 'COM3'; //fill in with YOUR port

var inData; //a variable to store incoming data


function setup() {
  createCanvas(700, 400);
  fullscreen();
  
  
  polySynth = new p5.PolySynth();
  
  //Serial setup
  serial = new p5.SerialPort(); //a new instance of serial port library

  //set up events for serial communication
  serial.on('connected', serverConnected);
  serial.on('open', portOpen);
  serial.on('data', serialEvent);
  serial.on('error', serialError);

  //open our serial port
  serial.open(portName);
  
  
  userStartAudio();
  
    //Draw Shapes
  	ball = new Ball(width/2, height/2, 10, speed);

	p1 = new Paddle(20, height/2 - 50, 10, paddlelength);
	p2 = new Paddle(width - 30, height/2 - 50, 10, paddlelength);
}

function draw() {
  background(52);
  Menu();
  
  
  p1.show();
  p2.show();
  movePaddle();
  ball.show()
  
  let oob = ball.outOfBounds();
  if (oob) {
      // the ball stays at spawn till go = true
      start = false;
      if (oob == 'right') {
          p1.score++;
      } else {
          p2.score++
      }
  }
  
  if (start) ball.update();

  ball.hit(p1, p2);

  ball.show()
  
  
}

function movePaddle() {
  
  //90 = 'z'
  	if (keyIsDown(LEFT_ARROW)) {
	  p1.move(-5);
	} else {
      p1.move(5);
    }
  
    if (keyIsDown(RIGHT_ARROW)) {
      p2.move(-5);
    } else {
      p2.move(5);
    }
}


function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    //print("Pressed LEFT");
    //player1Sound();
  } 
  if (keyCode === RIGHT_ARROW) {
    //print("Pressed RIGHT");
    //player2Sound();
  }
}


function keyTyped() {
	if (key == ' ') {
		start = true;
	}
  return false;
}


function player1Sound() {
  polySynth.play('E6',1,0,.25);
  polySynth.play('C8',1,0,.25);
  polySynth.play('C7',1,0,.25);
}

function player2Sound() {
  polySynth.play('E4',1,0,.25);
  polySynth.play('C6',1,0,.25);
  polySynth.play('C4',1,0,.25);
}




//Serial Callback

//all my callback functions here:
//callback functions are useful for giving feedback
function serverConnected(){
	console.log('connected to the server');
}

function portOpen(){
  console.log('the serial port opened!');
}

//THIS IS WHERE WE ACTUALLY RECEIVE DATA!!!!!!
//make sure you're reading data based on how you're sending from arduino
function serialEvent(){
  //THIS READS BINARY - serial.read reads from the serial port, Number() sets the data type to a number
	// inData = Number(serial.read());  //reads data as a number not a string

  //THIS READS ASCII
  inData = serial.readLine(); //read until a carriage return

  //best practice is to make sure you're not reading null data
  if(inData.length > 0){
    //Check for Serial Data input
    //print(inData);
    
    
    if (inData == 'BUTTONPRESSED') {
       p1.move(-10);
    } else if (inData == 'BUTTON2PRESSED') {
      p2.move(-10);
    }
    
  }

  //console.log(sensor1 + ", " + sensor2);
}

function serialError(err){
  console.log('something went wrong with the port. ' + err);
}


// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 print(i + " " + portList[i]);
 }
}
