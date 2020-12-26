let player;

function CreatePlayer(lane){
    //create player
    player = mainScene.add.sprite(0, 0,'player');
    player.setOrigin(0,0);
    //make sure the player is on top
    player.setDepth(1);
    SetPlayerLane(lane);

}

function IncreasePlayerLane(){
    if(player!=null){
        if(GetCurrentPlayerLane() < amountOfLanes-1){
            player.x += laneOffset;
        }
    }
}

function DecreasePlayerLane(){
    if(player!=null){
        if(GetCurrentPlayerLane() > 0){
            player.x -= laneOffset;
        }
    }
}

function SetPlayerLane(index){
    if(player!= null){

        if(index >= 0 && index < amountOfLanes){
            player.x = laneOffset * index + (laneOffset-player.width)/2
            player.y = windowHeight - player.height;
        }
    }
}

function GetCurrentPlayerLane(){
    if(player!= null){
        return Math.floor(player.x/laneOffset);
    }
}

