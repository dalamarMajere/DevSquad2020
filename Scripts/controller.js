function GameOver() {
    //your score:
    mainScene.scene.start('MainMenu');
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

function NextLevel() {
    RefreshEnergy();
    RefreshSpawner();
    RefreshTimers();

    difficulty -= levelIncrease / 2;

    GetNextTheme();
    StartTransition(350, 400);
    game.scene.start('GameScene');
}

let theme = [0, 0, 0, 0];
let currentTheme = -1;

function NewGame() {
    RefreshEnergy();
    RefreshSpawner();
    RefreshTimers();
    difficulty = basicDifficulty;
    score = basicScore;
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