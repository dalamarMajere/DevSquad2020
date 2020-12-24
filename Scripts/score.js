let score = 0;
let scoreTimer = 0;
let scoreIncreaseTime = 1;

function AddScore(scene)
{
    scoreTimer += scene.deltaTime;

    if(scoreTimer > scoreIncreaseTime){
        scoreTimer=0;
        score += 1;

    }
}