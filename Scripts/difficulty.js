let difficulty = 1;
let difficultyTimer = 0;
let difficultyIncrease = 0.2;
let difficultyIncreaseTime = 1;

let five = 1;

function IncreaseDifficultyOverTime()
{
    //increase timers
    difficultyTimer += deltaTime;

    //increase difficulty
    if(difficultyTimer > difficultyIncreaseTime){
        difficultyTimer = 0;
        difficulty += difficultyIncrease;

        velocity = Math.min(velocityIncrease + velocity, 800);
        spawnTimerIncrease = Math.max(0.05, spawnTimerIncrease - 0.002 * difficulty);

    }

    //add new obstacle every 5 * difficulty
    if (difficulty / 5 > five) {
        maxObstacleAmount = Math.min(10, maxObstacleAmount + 1);
        five++;
    }
}