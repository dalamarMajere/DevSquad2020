
let previousX;
//offset
let changeX = 75;
let collectibleAmount = 0;

//#TODO
let collectibleHeight = 91;
let collectibleWidth = 40;
let obstacleHeight = 115;

function HandleSpawning() {

    //if it's first call
    if (collectibleAmount === 0) {
        previousX = Phaser.Math.Between(collectibleWidth, windowWidth - collectibleWidth);
        SpawnCollectible();
    }
    else {
        //the last object.y >= its.height / 4
        if (getTail().objectSprite.y >= collectibleHeight / 2) {
            SpawnCollectible();
        }
    }
}

function SpawnCollectible() {
    //generate the new index: right, the same, left
    let index = Phaser.Math.Between(-1, 1);

    let dx = index * changeX;
    //if new index is suitable
    if (dx + previousX >= windowWidth - collectibleWidth * 2 ||
        dx + previousX < collectibleWidth * 2) {
        SpawnCollectible();
        return;
    }

    //update x position
    previousX += dx;

    //make gameobject and add it to queue
    addQueue(previousX);
}