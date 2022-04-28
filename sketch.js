var trex , trexImage
var ground , groundImage
var support
var cloud , cloudImage
var obstacles 
var obstacle1,obstacle2, obstacle3, obstacle4, obstacle5, obstacle6
var score
var gameState="play"
var cloudsGroup,obstaclesGroup
var trex_collided
var gameOver,gameOverImage
var restart,restartImage
var jumpSound, dieSound, checkpointSound


function preload(){
  // loadAnimation function is used for loading the images from the library to my program
  trexImage = loadAnimation("trex1.png","trex3.png","trex4.png");
  // loading the image for the ground
groundImage= loadImage("ground2.png")
  cloudImage=loadImage("cloud.png")
  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
  obstacle6=loadImage("obstacle6.png")
  trex_collided=loadAnimation("trex_collided.png")
  gameOverImage=loadImage("gameOver.png")
  restartImage=loadImage("restart.png")
  
  // loading the sounds 
  jumpSound=loadSound("jump.mp3")
  dieSound=loadSound("die.mp3")
  checkpointSound=loadSound("checkPoint.mp3")
}

function setup(){
  // creating the background screen.width(600)hight(200).
  createCanvas(600,200);
  
  // creating trex object using the createSprite 
  trex = createSprite(50,190,20,50);
  trex.addAnimation("running",trexImage);
  trex.addAnimation("collided",trex_collided)
  // making trex bigger or smaller
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,10);
  ground.velocityX= -4
  // adding the image to the ground
  ground.addImage(groundImage)
  
  gameOver=createSprite(300,100)
  gameOver.addImage(gameOverImage)
  gameOver.scale=0.5
  
  restart=createSprite(300,140)
  restart.addImage(restartImage)
  restart.scale=0.5
  
  // creating the support 
  support=createSprite(200,190,400,5)
  // making support invisible
  support.visible=false
  
  // how to use the random function
  // var xander = Math.round(random(1,10))
  // console.log(xander)
  score=0
  
  // making the green collider radius invisible 
  trex.debug=true
  
  // setting the collider radius
  trex.setCollider("circle",0,0,40)
  
  //creating obstacle and clouds group
  obstaclesGroup=new Group();
  cloudsGroup=new Group();
}

function draw(){
  background("skyblue");
  // console.log is used for displaying the value of anything in the console window
  //console.log(cloud.depth)
  // displaying the score 
  text("Score: "+score,450,50)
  
  //play block 
  if (gameState == "play"){
  //moving the ground
    ground.velocityX=-6;
    
    gameOver.visible=false
    restart.visible=false
    
    //incresing the score with the frameCount
  score=score+Math.round(getFrameRate()/60)
    
    // playing the checkpoint sound
    if (score%500==0 && score>0){
      checkpointSound.play()  
        }
    
    // this if block is checking if the x postion is less then 0 then shift the ground to it original x postion 
  // making the groud infinity 
  if(ground.x <0){
    ground.x=200
  }
    
    // If the space bar is pressed then the trex will go up
  if (keyDown("space") && trex.y>100) {
    trex.velocityY = -15;
    jumpSound.play()
  }
    
    // Adding gravity to trex by making its velocity decrease first till it becomes zero and then increase it.
  trex.velocityY = trex.velocityY + 1    
    
    //calling the spawnCloud function for making the cloud on the screen
  spawnClouds();
  
  // calling spawnObstacles function for making the cactus on the screen
  spawnObstacles();
    
    // checking if trex is touching the cactus
    if(obstaclesGroup.isTouching(trex)){
      dieSound.play()
      gameState="end";
      trex.velocityY=0
      
    }
  
  }
  
  //end block 
  if (gameState == "end"){
  // stopping the ground
    ground.velocityX=0;
    
    gameOver.visible=true
    restart.visible=true
    
    // stopping the clouds and the obstacles
    obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
    
    //changing the animation of trex to dead 
    trex.changeAnimation("collided", trex_collided)
    
    // set lifetime off clouds and obstacles so that they are never destroyed 
    obstaclesGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1)
    
    // making a function to click the mouse on the reset and rest the game
    if (mousePressedOver(restart)){
      reset()
    }
  }
 
  
 
  // making trex collide with the ground so that it doesnt fall 
  //through the ground
  trex.collide(support);
  
 
  
  // used for displaying the objects that you have created
  drawSprites();
  
}

 // making a function to reset the game 
function reset(){
  gameState="play"
  
  // deleting all the clouds and obstacles that were frozen
  obstaclesGroup.destroyEach()
  cloudsGroup.destroyEach()
  
  // changing the trex animation back to running 
  trex.changeAnimation("running", trexImage)
  
  // restart the score 
  score=0
}
// making a function for creating my clouds 
function spawnClouds(){ 
  // checking if the frameCount is a multiple of 60 to make sure that my clouds are only displayed in those frames that are 
  //divisible by 60 because i dont want a cloud to be display in every single frame because they overlap eachother when 
  //display in every single frame  
  if (frameCount%60==0){
  cloud=createSprite(600,100,40,10)
  cloud.velocityX = -3;
    // making the y position of the clouds random
  cloud.y=Math.round(random(10,100))
    cloud.addImage(cloudImage)
    cloud.scale=0.5
    // making the depth of trex more then the depth of the clouds so that trex doesnt hide behide clouds 
trex.depth=cloud.depth+1
    // adding lifetime to clouds to make them delete themself from the computers memory as soon as there done crossing the screen 
  cloud.lifetime = 210
    // adding each clouds to its group
    cloudsGroup.add(cloud);
  }
  
}
function spawnObstacles(){
  if (frameCount%60==0){
    obstacle=createSprite(600,160,10,40)
    obstacle.velocityX= -(6+score/100);
    var elyzz = Math.round(random(1,6)) 
    switch(elyzz){
      case 1: obstacle.addImage(obstacle1)
        break;
        case 2: obstacle.addImage(obstacle2) 
        break;
        case 3: obstacle.addImage(obstacle3) 
        break;
        case 4: obstacle.addImage(obstacle4) 
        break;
        case 5: obstacle.addImage(obstacle5) 
        break;
        case 6: obstacle.addImage(obstacle6) 
        break;
        default: break;
    }
    obstacle.scale=0.5
    obstacle.lifetime=210
    // adding each obstacle to its group
    obstaclesGroup.add(obstacle);
  }
}