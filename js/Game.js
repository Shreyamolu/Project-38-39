class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    jet1 = createSprite(100,200);
    jet1.addImage(jet1Img);
    jet1.scale = 0.3;
    jet2 = createSprite(1000,200);
    jet2.addImage(jet2Img);
    jet2.scale = 0.3;
    jets = [jet1, jet2];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      
      background("black");

      image(skyImg,0,-displayHeight*4,displayWidth,displayHeight*5);

      //index of the array
      var index = 0;

      //x and y position of the jets
      var x = 200;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the jets a little away from each other in x direction
        x = x + 400;
        //use data form the database to display the jets in y direction
        y = displayHeight - allPlayers[plr].distance;
        jets[index-1].x = x;
        jets[index-1].y = y;

        if (index === player.index){
          jets[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = jets[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      console.log(1);
      player.update();
    }

    if(player.distance > 3680)
    {
      gameState = 2;
    }

    drawSprites();
  }

  end()
  {
    console.log("Game Ended");
  }

}

