let difficulty = 1;
let difficultyTimer = 0;

let five = 1;

function IncreaseDifficultyOverTime()
{
    if (portalSpawned) return;

    //increase timers
    difficultyTimer += deltaTime;

    //increase difficulty
    if(difficultyTimer > difficultyIncreaseTime){
        difficultyTimer = 0;
        difficulty += difficultyIncrease;

        velocity = Math.min(velocityIncrease + velocity, 800);
        spawnTimerIncrease = Math.max(0.05, spawnTimerIncrease - 0.02 * difficulty);

    }

    //add new obstacle every 5 * difficulty
    if (difficulty / 4 > five) {
        currentMaxObstacleAmount = Math.min(maxObstacleAmount, currentMaxObstacleAmount + 1);
        five++;
    }


    if ((difficulty / levelIncrease) >= portalIncrease) {
        portalIncrease++;
        CreatePortal();
    }
}