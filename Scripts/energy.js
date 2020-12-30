let currentEnergyLevel = 19;
let maxFrame = 19;
let minFrame = 0;
let frameSuffix = ".png";

let energyTimer = 0;
let energyIncreaseTime = 1;

let energySprite;

function CreateEnergy() {
    energySprite = mainScene.add.sprite(175, 32, '1_energy');
    energySprite.scale = 1.5;
    energySprite.setFrame("19.png");
    energySprite.setDepth(5);
}

function DecreaseEnergyOverTime() {
    energyTimer += (deltaTime + difficulty / 1000);

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