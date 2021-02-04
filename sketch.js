var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var jets, jet1, jet2;
var jet1Img,jet2Img,jet3Img,jet4Img;
var skyImg,groundImg;

function preload()
{
    jet1Img = loadImage("images/JET1.png");
    jet2Img = loadImage("images/JET2.png");
    skyImg = loadImage("images/CSBG.jpg");
    //groundImg = loadImage("images/ground.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
