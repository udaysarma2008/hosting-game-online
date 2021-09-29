var PLAY = 1
var END = 0
var gameState = 1;

var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  gameOverImg =loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
// Moving background
path=createSprite(350,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(70,500,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
gameOver=createSprite(350 , 250);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.5;  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();
  
  boy.setCollider("circle",0,0,200);
  boy.debug = true
  
  treasureCollection = 0
}

function draw() {

  background(0);
  boy.x = World.mouseX;
  
  if(gameState === PLAY){
    
    gameOver.visible = false;
    
     if(path.y > 400 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection + 20;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection + 100;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection + 50;
      
    }else{
      
  }
     
    if(swordGroup.isTouching(boy)){
         gameState = END;
       }
    
  }
  else if(gameState === END){
          
    
   gameOver.visible = true;
   path.velocityY = 0;
   jwelleryG.destroyEach();
   cashG.destroyEach();
   diamondsG.destroyEach();
   swordGroup.destroyEach();
   boy.destroy(); 
   
    
    
  }
  
  
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 590),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 190;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 590),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 190;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 590),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 190;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 80 == 0) {
  var sword = createSprite(Math.round(random(50, 590),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 190;
  swordGroup.add(sword);
  }
}