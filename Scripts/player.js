let player;

let velocity = 200;
let velocityIncrease = 2;


function CreatePlayer(lane){
    //create player
    player = mainScene.physics.add.sprite(0, 0,'player');
    player.setOrigin(0,0);
    //make sure the player is on top
    player.setDepth(1);
    SetPlayerLane(lane);

    player.setBounce(0);
    player.setCollideWorldBounds(true);
}

function IncreasePlayerLane(){
    if(player!=null){
        player.setVelocityX(velocity);
    }
}

function DecreasePlayerLane(){
    if(player!=null){
        player.setVelocityX(-velocity);
    }
}

//#TODO: rewrite without lanes
function SetPlayerLane(index){
    if(player!= null){

        if(index >= 0 && index < amountOfLanes){
            player.x = laneOffset * index + (laneOffset-player.width)/2
            player.y = windowHeight - player.height;
        }
    }
}


