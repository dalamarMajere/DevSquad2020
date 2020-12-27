
let previousX;
//offset
let changeX = 75;
let collectibleAmount = 0;

let obstacleAmount = 0;
let maxObstacleAmount = 6;

//#TODO
let collectibleHeight = 91;
let collectibleWidth = 40;
let obstacleHeight = 115;
let obstacleWidth = 70;

//timer to spawn obstacles
let spawnTimer = 0;
let spawnTimerIncrease = 0.5;

function HandleSpawning() {

    spawnTimer += deltaTime;

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

    //so amount of obstacles won't be greater than maximum
    //and they won't be spawned all by one time
    if (obstacleAmount < maxObstacleAmount && spawnTimer >= spawnTimerIncrease) {
        SpawnObstacle();
        spawnTimer = 0;
    }
}

function SpawnObstacle() {
    let x = Phaser.Math.Between(obstacleWidth, windowWidth - obstacleWidth);

    //#TODO: it doesn't work
    //to make sure than new obstacle won't collide with
    //other objects
    if (Math.abs(x - getTail().objectSprite.x) <= obstacleWidth
    && getTail().objectSprite.y <= obstacleHeight) {
        SpawnObstacle();
        return;
    }

    addQueue(x, 'obstacle');
    obstacleAmount++;
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
    collectibleAmount++;
    addQueue(previousX, 'collectible');
}