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

        velocity += (velocityIncrease * difficulty);
        //#TODO: make better correlation
    }

    if (difficulty / 5 > five) {
        maxObstacleAmount = Math.min(10, maxObstacleAmount + 1);
        five++;
    }

    if (difficulty / 2 > two) {
        two++;
        spawnTimerIncrease = Math.max(0.01, spawnTimerIncrease - 0.1   );
    }
}