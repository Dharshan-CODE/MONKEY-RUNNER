var PLAY = 2;
var END = 3;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var invisibleGround,ground,groundImage;
var score,time;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("ground.png");
  collided = loadAnimation("sprite_0.png"); 
  
}



function setup() {
  createCanvas(600,400);
  
  //creating monkey
   monkey=createSprite(60,315,20,20);
   monkey.addAnimation("moving", monkey_running);
   monkey.addAnimation("collide",collided)
   monkey.scale=0.09;
   monkey.debug=false;
   monkey.setCollider("circle",0,0,300);
   
   
   ground = createSprite(400,350,200,10);
   ground.velocityX=-4;
   ground.addImage(groundImage);
   ground.x=ground.width/2;
   
  
   invisibleGround = createSprite(120,355,300,10);
   invisibleGround.visible = false;
   
   foodGroup = new Group();
   obstacleGroup = new Group();
  
   score=0;
   time = 0;
}


function draw() {
  background("black");
  
  fill("white");
  textSize(18);
  text("Score: "+ score, 500,50);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("SURVIVAL TIME : "+ time,100,60);
  
  
  
  if(gameState===PLAY){
    
     
  if(keyDown("space")&& monkey.y >= 314) {
    monkey.velocityY = -20;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
 
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
     ground.velocityX= -(4 + score/4);
  spawnB();
  spawnR(); 
    
  if(foodGroup.isTouching(monkey)){
    score=score+2; 
    foodGroup.destroyEach();
     
     }  
  if(obstacleGroup.isTouching(monkey)){
    gameState=END;
    
     }
    
    
    time=time + Math.round(getFrameRate()/62);
    
    
  }
   if(gameState===END){
      score=score;
      ground.velocityX=0;
      monkey.velocityY=0;
    
      obstacleGroup.setLifetimeEach(-1);
      foodGroup.setLifetimeEach(-1);
     
      obstacleGroup.setVelocityXEach(0);
      foodGroup.setVelocityXEach(0);
       
      monkey.changeAnimation("collide",collided);
     
      time=time;
     
     fill("white");
     textSize(18);
     text("Press R To Restart", 200,200);
  
     if(keyDown("r")){
        reset();
        }
      
}
  
  
  monkey.collide(invisibleGround);
    
  drawSprites();
}

function reset(){
  gameState=PLAY;
  
  score=0;
  time=0;
  
  
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  monkey.changeAnimation("moving",monkey_running);


}

function spawnB(){
   if (frameCount % 80 === 0) {
     banana = createSprite(600, 165, 10, 40);
     banana.y = Math.round(random(80, 250));
     banana.addImage(bananaImage);
     banana.scale = 0.09;
     banana.velocityX =  -(4 + score/4);
    
    //to add lifetime to the banana
     banana.lifetime = 200;
    
    
     foodGroup.add(banana);
    
  }
  
  
}
function spawnR(){
  
  if (frameCount % 200 === 0){
    obstacle = createSprite(600,330,10,40);
    obstacle.velocityX =  -(4 + score/4);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
  }




}