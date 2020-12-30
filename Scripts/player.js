let player;

function CreatePlayer(){
    //create player
    player = mainScene.physics.add.sprite(windowWidth/2, windowHeight,'player');
    player.x += player.height + 50;
    player.setOrigin(0,0);
    //make sure the player is on top
    player.setDepth(1);

    player.setBounce(0);
    //player won't go out from the borders
    player.setCollideWorldBounds(true);
}



//let direction = 0;
//let speed = 600;
/*function MovePlayer(){
    player.x += direction * speed * deltaTime;

    //if the player is out of the bounds
    if(player.x < 0){
        player.x = 0
    }else if(player.x > windowWidth - player.width){
        player.x = windowWidth - player.width;
    }

    if(mainScene.right && direction !=1){
        direction = 1;
    }
    if(mainScene.left && direction != -1){
        direction = -1;
    }

    if(!mainScene.left && !mainScene.right){
        direction = 0;
    }
}*/


let velocityIncrease = 4;
let playerMoveRight = false;
let velocity = 300;

function MoveRight(){
    player.setVelocityX(velocity);
    playerMoveRight = true;
}

function MoveLeft(){
    player.setVelocityX(-velocity);
    playerMoveRight = false;
}

function StopPlayer() {
    player.setVelocity(0);
    playerMoveRight = false;
}