function GameOver() {
    //zero all
    game.scene.start('MainMenu');
}

let theme = [0, 0, 0, 0];
let currentTheme = -1;

function NewGame() {
    if (currentTheme == -1) {
        currentTheme = 1;
    }
    else {
        currentTheme = GetNextTheme();
    }
    SetTheme(currentTheme);
    theme[currentTheme - 1]++;
    game.scene.start('GameScene');
}

function GetNextTheme() {
    console.log("Theme: " + currentTheme);
    let min = theme[0];
    let minIndx = [];
    minIndx.push(1);
    console.log("THEMES: ");
    for (let i = 0; i < 4; i++) {
        console.log(theme[i]);
        if (min > theme[i]) {
            minIndx = [];
            minIndx.push(i);
            min = theme[i];
        } else if (min == theme[i]) {
            minIndx.push(i);
        }
    }
    console.log("endTHEME");
    return minIndx[Phaser.Math.Between(0, minIndx.length - 1)] + 1;
}