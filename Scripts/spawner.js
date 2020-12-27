
let previousItemLane;
let collectibleAmount = 0;

let collectibleHeight = 91;
let obstacleHeight = 115;

function HandleSpawning() {

    //if it's the first call
    if (collectibleAmount === 0) {
        previousItemLane = Phaser.Math.Between(0, amountOfLanes - 1);
        SpawnCollectible();
    }
    else {
        if (lanes[previousItemLane].gameObjects[0].objectSprite.y >= collectibleHeight / 2) {
            SpawnCollectible();
        }
    }
}

function SpawnCollectible() {
    //generate the new index
    let index = Phaser.Math.Between(-1, 1);

    //if new index is suitable
    if (index + previousItemLane >= amountOfLanes ||
        index + previousItemLane < 0) {
        SpawnCollectible();
        return;
    }

    //add new collectible
    previousItemLane = previousItemLane + index;
    lanes[previousItemLane].AddObject("collectible");
}