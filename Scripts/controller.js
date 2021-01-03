let startGameOver = false;
function GameOver() {
    if(!startGameOver){
        mainScene.gameover.play();
        transition = mainScene.add.sprite(player.x+player.width/2,player.y+player.height/2,'transition');
        transition.setDepth(20);
        transition.play('transitionAnimation');
    }
    startGameOver = true;
}

function RefreshEnergy() {
    currentEnergyLevel = basicEnergyFrame;
}

function RefreshSpawner() {
    collectibleAmount = basicCollectibleAmount;
    obstacleAmount = basicObstacleAmount;
    currentMaxObstacleAmount = basicMaxObstacleAmount;
}

function RefreshTimers() {
    energyTimer = basicTimer;
    difficultyTimer = basicTimer;
    spawnTimer = basicTimer;
    scoreTimer = basicTimer;
    spawnEnemyTimer = basicTimer;
    spawnTimerIncrease = basicSpawnTimeIncrease;
    spawnEnemyTimerIncrease = basicSpawnEnemyTimeIncrease;
}

let portal;
function CreatePortal() {
    portalSpawned = true;

    portal = mainScene.physics.add.sprite(0, 0, "portal");
    portal.setOrigin(0);
    portal.x = Phaser.Math.Between(portal.width,windowWidth-portal.width);
    portal.setDepth(3);
    mainScene.physics.add.collider(player, portal, NextLevel, null, null);
    mainScene.physics.add.collider(mainScene.ground, portal, Continue, null, null);
    portal.setVelocityY(200);
}

function Continue() {
    portalSpawned = false;
}

let startNextLevel = false;
let transition;
function NextLevel() {
    portalSpawned = false;
    RefreshEnergy();
    RefreshSpawner();
    RefreshTimers();

    difficulty /= 1.5;
    score += pointsForPortal;

    GetNextTheme();
    transition = mainScene.add.sprite(portal.x+portal.width/2,portal.y+portal.height/2,'transition');
    transition.setDepth(20);
    transition.play('transitionAnimation');
    startNextLevel = true;

}

let theme = [0, 0, 0, 0];
let currentTheme = -1;

function NewGame() {
    RefreshEnergy();
    RefreshSpawner();
    RefreshTimers();
    portalIncrease = basicPortalIncrease;
    difficulty = basicDifficulty;
    score = basicScore;
    portalSpawned = false;
    GetNextTheme();
    game.scene.start('GameScene');
}

function SelectNextTheme() {
    let min = theme[0];
    let minIndx = [];
    minIndx.push(1);
    for (let i = 0; i < 4; i++) {
        if (min > theme[i]) {
            minIndx = [];
            minIndx.push(i);
            min = theme[i];
        } else if (min == theme[i]) {
            minIndx.push(i);
        }
    }
    return minIndx[Phaser.Math.Between(0, minIndx.length - 1)] + 1;
}

function GetNextTheme() {
    currentTheme = SelectNextTheme();
    theme[currentTheme - 1]++;
    SetTheme(currentTheme);
}