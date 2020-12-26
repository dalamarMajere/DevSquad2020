let currentEnergyLevel = 19;
let maxFrame = 19;
let minFrame = 0;
let frameSuffix = ".png";

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