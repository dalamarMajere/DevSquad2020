let player;
let currentLane;

function CreatePlayer(scene,lane){
    //create player
    player = scene.add.sprite(0, 0,'player');
    player.setOrigin(0,0);
    //make sure the player is on top
    player.setDepth(1);
    //game.physics.arcadePhysics.enable(player);
    SetPlayerLane(scene,lane);

}

function IncreasePlayerLane(scene,number){
    if(player!=null){
        if(GetCurrentPlayerLane(scene) < scene.amountOfLanes-1){
            player.x += scene.laneOffset;
        }
    }
}

function DecreasePlayerLane(scene){
    if(player!=null){
        if(GetCurrentPlayerLane(scene) > 0){
            player.x -= scene.laneOffset;
        }
    }
}

function SetPlayerLane(scene,index){
    if(player!= null){
        player.x = scene.laneOffset * index + (scene.laneOffset-player.width)/2
        player.y = scene.sys.game.config.height - player.height;
    }
}

function GetCurrentPlayerLane(scene){
    if(player!= null){
        return Math.floor(player.x/scene.laneOffset);
    }
}

