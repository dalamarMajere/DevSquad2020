let difficulty = 1;
let difficultyTimer = 0;
let difficultyIncrease = 0.2;
let difficultyIncreaseTime = 1;


//#TODO: delete it and don't shame yourfelt
let five = 1;
let two = 1;

function IncreaseDifficultyOverTime()
{
    //increase timers
    difficultyTimer += deltaTime;

    //increase difficulty
    if(difficultyTimer > difficultyIncreaseTime){
        difficultyTimer = 0;
        difficulty += difficultyIncrease;

    }

    //add new obstacle every 5 * difficulty
    if (difficulty / 5 > five) {
        maxObstacleAmount = Math.min(10, maxObstacleAmount + 1);
        five++;
    }

    //decrease obstacle spawn time every 2 * difficulty
    if (difficulty / 2 > two) {
        two++;
        spawnTimerIncrease = Math.max(0.01, spawnTimerIncrease - 0.1   );
    }
}