let difficulty = 1;
let difficultyTimer = 0;
let difficultyIncrease = 0.2;
let difficultyIncreaseTime = 2;

function IncreaseDifficultyOverTime()
{
    //increase timers
    difficultyTimer += deltaTime;

    //increase difficulty
    if(difficultyTimer > difficultyIncreaseTime){
        difficultyTimer = 0;
        DecreaseEnergyLevel(); //#TODO: optimize decreasing time
        difficulty += difficultyIncrease;
    }
}