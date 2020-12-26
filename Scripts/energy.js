let currentEnergyLevel = 19;
let maxFrame = 19;
let minFrame = 0;
let frameSuffix = ".png";

let energyTimer = 0;
let energyIncreaseTime = 0.4;

function DecreaseEnergyOverTime() {
    energyTimer += deltaTime;

    if (energyTimer > energyIncreaseTime) {
        energyTimer = 0;
        DecreaseEnergyLevel();
    }
}

function IncreaseEnergyLevel() {
    if (currentEnergyLevel === maxFrame) {
        return;
    }
    currentEnergyLevel++;
}

function DecreaseEnergyLevel() {
    if (currentEnergyLevel === minFrame) {
        gameOver();
    }
    else {
        currentEnergyLevel--;
    }

}

function GetCurrentFrame() {

    return currentEnergyLevel.toString() + frameSuffix;
}

function gameOver() {
    //#TODO: game over
    console.log("Game Over!");
}