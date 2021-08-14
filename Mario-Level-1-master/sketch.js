gameState = "Play"
Score = 0
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
 DieS = loadSound("sounds/dieSound.mp3")
}
function brickGen(){
 Brick = createSprite(1200,200,40,40)
 Brick.y = random(100,400)
 Brick.addImage(bricImage)
 Brick.velocityX = -5
 Brick.lifetime = 270
 brickGro.add(Brick)
}
function CoinGen(){
 Coin = createSprite(1200,210,30,30)
 Coin.scale = 0.1
 Coin.y = random(100,510)
 Coin.addAnimation("SPIN",CoinSpin)
 Coin.lifetime = 270
 Coin.velocityX = -5
 CoinGro.add(Coin)
}

function EnemyGen(){
  enemy = createSprite(1200,490,40,40)
  enemy.scale = 0.15
  x = random(1,2)
  x = Math.round(x)
  if (x == 1){
    enemy.addAnimation("ENE",Mush)
  }
  else{
      enemy.addAnimation("ENE",Turt)
  }
  enemy.velocityX = -5
  EneGro.add(enemy)
}

function setup() {
createCanvas(1000, 600);
backg = createSprite(700,300,2000,600)
backg.addImage(back)
backg.scale = 0.4
ground = createSprite(500,570,1000,100)
ground.visible = false
mario = createSprite(200,200,40,40) 
mario.addAnimation("RUN",marioRun)
mario.addAnimation("DIE",marioDie)
mario.scale = 0.16
brickGro = new Group()
CoinGro = new Group()
EneGro = new Group()
Ting.setVolume(0.05)
jSound.setVolume(0.05)
DieS.setVolume(0.09)
}

function draw() {
    mario.velocityY += 0.5
        mario.collide(ground)
if(gameState == "Play"){
background("black")
if (keyDown("space")){
    mario.velocityY = -13
    jSound.play()
}
backg.velocityX = -5
if (backg.x < 240){
    backg.x = 700
}
if (frameCount%80 == 0){
    brickGen()
    CoinGen()
    EnemyGen()
} 
for (d = 0;d < brickGro.length;d += 1){
 t = brickGro.get(d)
 if(mario.isTouching(t)){
     mario.collide(t)

 }
}
if (mario.x < 200){
    mario.x = 200
}
if (mario.y < 30 ){
 mario.y = 30
}
for (c = 0;c < CoinGro.length;c +=1){
    g = CoinGro.get(c)
    if ( mario.isTouching(g)){
        g.destroy()
        g = null
        Ting.play()
       Score +=1
    }
    
}
for (d = 0;d < EneGro.length; d +=1){
   f = EneGro.get(d)
   if(mario.isTouching(f)){
       gameState = "Stop"
       DieS.play()
   }

}
}
else{
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
}

drawSprites()
textSize(20)
fill("yellow")
text("Coins Collected: "+Score,800,50)
if(gameState == "Stop"){
    filter(GRAY)
    textSize(40)
    fill("white")
    text("YOU LOSE!",500,300)
    
}
}
