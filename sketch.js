//
// Created April 1, 2020
// Last Updated: April 23, 2020
// Author: iel levert
//
// Art 151 Final Project
// Somewhere Between Connection & Disconnection
//

var startTime = 0;
var currentTime = 0;
var timeleft = getRandomInt(2, 60);

let capture;

var index = 0;
var connect = 0;

var phrase1 = "THIS IS YOUR SELF-ISOLATION.";
var phrase2 = "SOMEWHERE BETWEEN";
var phrase3 = "CONNECTION & DISCONNECTION.";

let angle = 0;
let value = 255;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function convertSeconds(s) {
  var min = floor(s / 60);
  var sec = s % 60;
  return nf(min, 2) + ':' + nf(sec, 2);
}

function preload() {
  audioPoem = loadSound('somewherebetween.mp3');
  virus = loadImage('corona.png');
}

function setup() {
  canvas = createCanvas(500, 500);
  capture = createCapture(VIDEO);
  capture.hide();

  // console.log("time left: " + timeleft); // for debugging

  audioPoem.play();

  startTime = millis();

  var params = getURLParams();
  console.log(params);
  if (params.minute) {
    var min = params.minute;
    timeleft = min * 60;
  }

  var timer = select('#timer');

  timer.position(225, 400);

  timer.html(convertSeconds(timeleft - currentTime));

  var interval = setInterval(timeIt, 1000);

  function timeIt() {

    currentTime = floor((millis() - startTime) / 1000);

    // console.log("time left: " + timeleft); // for debugging

    timer.html(convertSeconds(timeleft - currentTime));
    if (currentTime == timeleft) {
      //clearInterval(interval);
      connect = 0;

      startTime = millis();
      timeleft = getRandomInt(2, 60);

      console.log("time left: " + timeleft); // for debugging
    }
  }
}

function draw() {
  if (connect == 0) {
    clear();
    // text and background for main screen
    background(0);
    textSize(25);
    text("click to connect", 250, 180);
    textAlign(CENTER);

    fill(255);

    textSize(15);
    text("status: you are disconnected.", 250, 400);
    
    push();
    translate(250, 270);
    rotate(angle);
    image(virus, 0, 0, 50, 50);
    
    angle = angle + 0.01;
    pop();

  } else if (connect == 1) {
    background(value);
    image(capture, 100, 150, 300, 300 * capture.height / capture.width);
    filter(GRAY);
    textAlign(CENTER);

    if (index < 1) {
      textSize(25);
      text(phrase1, 250, 100);
      fill(0);
      textSize(15);
      text("status: unstable connection.", 250, 400);
    } else if (index == 1) {
      textSize(25);
      fill(random(100, 175), random(0, 175), random(0, 255));
      text(phrase2, 250, 100);
      text(phrase3, 250, 125);
      fill(0);
      textSize(15);
      text("time until disconnect:", 250, 400);
    }
  }
}

function mouseClicked() {
  if (connect == 0) {
    connect = connect + 1;
  } else if (connect == 1) {
    index = index + 1;

    if (index > 1) {
      index = 0
    }
  }
}

function mouseDragged() {
  value = value - 1;
  if (value < 50) {
    value = 255;
  }
}
