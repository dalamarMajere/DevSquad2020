let score = 0;
let scoreTimer = 0;
let scoreIncreaseTime = 1;

function AddScoreOverTime()
{
    scoreTimer += deltaTime;

    if(scoreTimer > scoreIncreaseTime){
        scoreTimer=0;
        score += 1;
    }
}

function UpdateScore(){
    mainScene.scoreText.text = score.toString();
}