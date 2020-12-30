
let collectiblePreviousX;
let obstaclePreviousX;
//offset
let collectibleDx = 80;
let collectibleAmount = 0;

let obstacleAmount = 0;
let maxObstacleAmount = 6;

//#TODO
let widthOffset = 60 * 2; //3 * player width
let collectibleHeight = 91;
let collectibleWidth = 40;
let obstacleHeight = 115;
let obstacleWidth = 70;

//timer to spawn obstacles
let spawnTimer = 0;
let spawnTimerIncrease = 1;


function HandleSpawning() {

    spawnTimer += deltaTime;

    //if it's first call
    if (collectibleAmount === 0) {
        collectiblePreviousX = Phaser.Math.Between(collectibleWidth, windowWidth - collectibleWidth);
        SpawnCollectible();
    }
    else {
        //the last object.y >= its.height / 4
        if (getLastCollectible().objectSprite.y >= collectibleHeight / 2) {
            SpawnCollectible();
        }
    }

    //so amount of obstacles won't be greater than maximum
    //and they won't be spawned all by one time
    if (obstacleAmount < maxObstacleAmount && spawnTimer >= spawnTimerIncrease) {
        SpawnObstacle();
        spawnTimer = 0;
    }
}

function SpawnObstacle() {
    let x;

    //to make sure than new obstacle won't collide with
    //other objects
    let counter = 0;
    do {
        x = Phaser.Math.Between(obstacleWidth, windowWidth - obstacleWidth);
        counter++;
        if (counter >= 20) return;
    }
    while ((obstacleAmount > 0 && isTooClose(x, getLastObstacle().objectSprite.x) &&
        getLastObstacle().objectSprite.y <= obstacleHeight) ||
        (collectibleAmount > 0 && isTooClose(x, getLastCollectible().objectSprite.x)
            && getLastCollectible().objectSprite.y <= collectibleHeight));


    addQueue(x, 'obstacle');
    obstaclePreviousX = x;
    obstacleAmount++;
}

function isTooClose(x1, x2) {
    return Math.abs(x1 - x2) < (widthOffset * 1.5);
}

function SpawnCollectible() {
    //generate the new index: right, the same, left
    let x;

    let counter = 0;
    //if new index is suitable
    do {
        counter++;
        x =  Phaser.Math.Between(-3, 2) * collectibleDx + collectiblePreviousX;
        x = Math.max(Math.min(x, windowWidth - widthOffset), widthOffset);
        if (counter >= 20) return;
    }
    while (/*x >= windowWidth - widthOffset || x < widthOffset / 2 ||*/
        (obstacleAmount > 0 && isTooClose(x, getLastObstacle().objectSprite.x)
            && getLastObstacle().objectSprite.y < obstacleHeight / 2));

    //update x position
    collectiblePreviousX = x;

    //make gameobject and add it to queue
    collectibleAmount++;
    addQueue(collectiblePreviousX, 'collectible');
}