let player;
//let currentLane;

function CreatePlayer(lane){
    //create player
    player = mainScene.add.sprite(0, 0,'player');
    player.setOrigin(0,0);
    //make sure the player is on top
    player.setDepth(1);
    //scene.game.physics.arcadePhysics.enable(player);
    SetPlayerLane(lane);

}

function IncreasePlayerLane(){
    if(player!=null){
        if(GetCurrentPlayerLane() < amountOfLanes-1){
            player.x += laneOffset;
            //currentLane++;
        }
    }
}

function DecreasePlayerLane(){
    if(player!=null){
        if(GetCurrentPlayerLane() > 0){
            player.x -= laneOffset;
            //currentLane--;
        }
    }
}

function SetPlayerLane(index){
    if(player!= null){

        if(index >= 0 && index < amountOfLanes){
            player.x = laneOffset * index + (laneOffset-player.width)/2
            player.y = windowHeight - player.height;
            //currentlane = index;
        }
    }
}

function GetCurrentPlayerLane(){
    if(player!= null){
        return Math.floor(player.x/laneOffset);
    }
    //return currentLane;
}

