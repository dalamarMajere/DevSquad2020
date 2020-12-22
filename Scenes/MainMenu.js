class MainMenu extends Phaser.Scene {

    constructor() {
        super({key:"MainMenu"});
    }

    preload() {
        this.load.image('titleScreen', 'Assets/TitleScreen.png');
        this.load.image('playButton', 'Assets/PlayButton.png');
        this.load.image('playButtonHover', 'Assets/PlayButtonHover.png');
    }

    create(){

    }

    update(delta){
        let drawImage = 'playButton';
        let playButtonLengthX = 300;
        let playButtonLengthY = 127;
        let playButtonPosX = 300 - playButtonLengthX/2;
        let playButtonPosY = 401 - playButtonLengthY/2;
        let mousePosX = game.input.mousePointer.x;
        let mousePosY = game.input.mousePointer.y;

        // if the x position of the mouse is right
        if(mousePosX > playButtonPosX && mousePosX < playButtonPosX + playButtonLengthX){
            if(mousePosY > playButtonPosY && mousePosY < playButtonPosY + playButtonLengthY){
                drawImage='playButtonHover';
                this.input.on('pointerdown',function(event){
                    this.scene.start("GameScene")
                }, this);
            }
        }
        let titleScreen = this.add.image(300,401,'titleScreen');
        let playButton = this.add.image(300,401,drawImage);

    }
}