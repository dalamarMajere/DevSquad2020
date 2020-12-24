let difficulty = 1;
let difficultyTimer = 0;
let difficultyIncrease = 0.2;
let difficultyIncreaseTime = 1;

function IncreaseDifficulty(scene)
{
    //increase timers
    difficultyTimer += scene.deltaTime;

    //increase difficulty
    if(difficultyTimer > difficultyIncreaseTime){
        difficultyTimer = 0;
        difficulty += difficultyIncrease;
    }
}