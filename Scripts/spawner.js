let spawnTimer = 0;
let spawnCooldownTime = 1;

function HandleSpawning(){

    spawnTimer += deltaTime;

    if(spawnTimer > spawnCooldownTime){
        spawnCooldownTime -= difficulty/100;
        spawnTimer = 0;

        let index = Phaser.Math.Between(0, lanes.length-1);
        lanes[index].AddObject('collectible');
    }
}