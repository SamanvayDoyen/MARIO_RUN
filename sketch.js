//Stating variables
gameState = "Play"
Score = 0
//Load all the files - pictures,sounds,etc.
function preload(){
 marioRun = loadAnimation("images/mar1.png","images/mar2.png","images/mar3.png","images/mar4.png","images/mar5.png","images/mar6.png","images/mar7.png")
 marioDie = loadAnimation("images/dead.png")
 back = loadImage("images/bgnew.jpg")
 jSound = loadSound("sounds/jump.mp3")
 bricImage = loadImage("images/brick.png")
 CoinSpin = loadAnimation("images/con1.png","images/con2.png","images/con3.png","images/con4.png","images/con5.png","images/con6.png")
 Ting = loadSound("sounds/coinSound.mp3")
 Mush = loadAnimation("images/mush1.png","images/mush2.png","images/mush3.png","images/mush4.png","images/mush5.png","images/mush6.png")
 Turt = loadAnimation("images/tur1.png","images/tur2.png","images/tur3.png","images/tur4.png","images/tur5.png")
 Bomb = loadAnimation("images/keyObs1.png","images/keyObs2.png","images/keyObs3.png","images/keyObs4.png","images/keyObs5.png",)
 DieS = loadSound("sounds/dieSound.mp3")
 Reat = loadImage("images/restart.png")
}
//To generate Bricks for mario
function brickGen(){
 Brick = createSprite(1200,200,40,40)
 Brick.y = random(100,400)
 Brick.addImage(bricImage)
 Brick.velocityX = -5
 Brick.lifetime = 270
 brickGro.add(Brick)
}
//To generate Coins for Mario
function CoinGen(){
 Coin = createSprite(1200,210,30,30)
 Coin.scale = 0.1
 Coin.y = random(100,510)
 Coin.addAnimation("SPIN",CoinSpin)
 Coin.lifetime = 270
 Coin.velocityX = -5
 CoinGro.add(Coin)
}
//For Restarting th game
function Reast(){
   Score = 0
   RE.visible = false
   gameState = "Play"
   brickGro.destroyEach()
   CoinGro.destroyEach()
   EneGro.destroyEach()
   mario.changeAnimation("RUN",marioRun)
   
}
//To generate random enenmies for Mario
function EnemyGen(){
  enemy = createSprite(1200,490,40,40)
  enemy.scale = 0.15
  x = random(1,3)
  x = Math.round(x)
  switch(x){
      case 1 : enemy.addAnimation("ENE",Mush)
      break
      case 2 : enemy.addAnimation("ENE",Turt)
      break
      case 3 : enemy.addAnimation("ENE",Bomb)
      enemy.scale = 0.55
      break
  }
  enemy.velocityX = -5
  enemy.lifetime = 270
  EneGro.add(enemy)
}

//Creating the Components
function setup() {
    //Setting the Background
    createCanvas(1000, 600);
    backg = createSprite(700,300,2000,600)
    backg.addImage(back)
    backg.scale = 0.4
    ground = createSprite(500,570,1000,100)
    ground.visible = false
    //Setting the player - Mario
    mario = createSprite(200,200,40,40) 
    mario.addAnimation("RUN",marioRun)
    mario.addAnimation("DIE",marioDie)
    mario.scale = 0.16
    RE = createSprite(500,450,30,30)
    RE.addImage(Reat)
    RE.visible = false
    //Groups
    brickGro = new Group()
    CoinGro = new Group()
    EneGro = new Group()
    //Setting Volumes
    Ting.setVolume(0.05)
    jSound.setVolume(0.05)
    DieS.setVolume(0.09)
}

//Making the game funcion
function draw() {
 //Gravity
    mario.velocityY += 0.5
    mario.collide(ground)
 //For PlayState
 if(gameState == "Play"){
     background("black")
  //Jumping
     if (keyDown("space")){
          mario.velocityY = -13
          jSound.play()
     }
      backg.velocityX = -5
     if (backg.x < 240){
         backg.x = 700
       }
 //Creating the enemies, objects, etc
     if (frameCount%80 == 0){
           brickGen()
           CoinGen()
           EnemyGen()
      }
  //Collision with bricks 
     for (d = 0;d < brickGro.length;d += 1){
           t = brickGro.get(d)
          if(mario.isTouching(t)){
               mario.collide(t)
           }
      }
  //Correcting Player's position
      if (mario.x < 200){
          mario.x = 200
      }
      if (mario.y < 30 ){
          mario.y = 30
      }
  //Collecting Coins
     for (c = 0;c < CoinGro.length;c +=1){
           g = CoinGro.get(c)
          if ( mario.isTouching(g)){
              g.destroy()
              g = null
              Ting.play()
             Score +=1
          }
      }
  //Dying by the Enemies
     for (d = 0;d < EneGro.length; d +=1){
          f = EneGro.get(d)
          if(mario.isTouching(f)){
              gameState = "Stop"
              DieS.play()
              RE.visible = true
          }
      }
 }
 //For StopState
 else{
    //Reseting all Values
    mario.changeAnimation("DIE",marioDie)
    backg.velocityX = 0
    mario.velocityX = 0
    mario.velocityY = 0
    mario.y = 510
    brickGro.setVelocityXEach(0)
    CoinGro.setVelocityXEach(0)
    EneGro.setVelocityXEach(0)
    brickGro.setLifetimeEach(-1)
    CoinGro.setLifetimeEach(-1)
    EneGro.setLifetimeEach(-1)
    if( mousePressedOver(RE)){
      Reast()
     }
 }

 drawSprites()
 //Showing Final Result with Text
  textSize(20)
  fill("yellow")
  text("Coins Collected: "+Score,800,50)
  if(gameState == "Stop"){
     filter(GRAY)
     textSize(40)
     fill("white")
     stroke("black")
     strokeWeight(12)
     text("YOU LOSE!",480,300)
     text("Your Total Score is "+Score,400,250)
  }
 }
