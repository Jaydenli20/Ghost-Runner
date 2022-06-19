var ghost, ghost_standing, ghost_jumping
var tower, tower_img
var door, door_img
var spookysound
var gameState = "play"
var climber, climber_img
var count = 0; 

function preload(){
ghost_standing = loadImage("ghost-standing.png");
ghost_jumping = loadImage("ghost-jumping.png")
tower_img = loadImage("tower.png");
door_img = loadImage("door.png");
spookysound = loadSound("spooky.wav")
climber_img = loadImage("climber.png")

}

function setup(){

object_group = createGroup(); 
createCanvas(700, 700);
tower = createSprite(350, 350, 30, 30);
tower.addImage("Background", tower_img);
tower.scale = 1.25;

ghost = createSprite(300, 300, 30, 30);
ghost.addImage("Standing", ghost_standing);
ghost.scale = 0.4;

ghost.debug = false; 
ghost.setCollider("rectangle", 0, 0, 190, 200); 

}

function draw(){
background("red");
if(gameState == "play"){
 
    if(keyDown("UP_ARROW") || keyDown("space") ){
    ghost.addImage("Jumping", ghost_jumping);
    ghost.velocityY = -10; 
    ghost.changeAnimation("Jumping")
    }
    else{
        ghost.changeAnimation("Standing")
    }
    ghost.velocityY += 0.5; 

    if(keyDown("LEFT_ARROW")){
    ghost.velocityX = -5; 
    }
    if(keyDown("RIGHT_ARROW")){
        ghost.velocityX = +5; 
    }

    tower.velocityY = +5;
    if(tower.y > 750){
        tower.y = tower.height/2; 
       
    }
    
    if(object_group.isTouching(ghost)|| ghost.y > 750 || ghost.y < 0 || ghost.x < 50 || ghost.x > 650){
   gameState = "End"
 }
    spawnObjects(); 


 count += Math.round(getFrameRate()/60);   
    
    
    


}
if(gameState=="End"){
    background("black");
    tower.velocityY = 0;
    object_group.setVelocityEach(0);
    textSize(50);
    text("Game Over", 230, 350);
    ghost.destroy();
    object_group.destroy();
    tower.destroy();
}

    drawSprites(); 
    textSize(15); 
    fill(255)
    text("Score = "+ count, 600, 50 );
    

  
    //text(mouseX+","+mouseY, mouseX, mouseY); 

}


function spawnObjects(){

if(frameCount%100==0){
   

    door = createSprite(350, 100, 30, 30);

    door.addImage("Door", door_img); 
    
    door.velocityY = +5;

    door.x = Math.round(random(150, 550));

    climber = createSprite(350, 172, 30, 30);
    
    climber.addImage("Climber", climber_img);

    climber.velocityY = +5; 

    climber.x = door.x; 
       

    door.lifeTime = 400; 
    climber.lifeTime = 400;

    object_group.add(climber, door); 

}
}