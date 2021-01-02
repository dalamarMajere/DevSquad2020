class HowToPlay extends Phaser.Scene {

    constructor() {
        super({key:"HowToPlay"});
    }

    preload() {
        this.load.image('HowToPlayScreen', 'Assets/MainMenu/HowToPlayScreen.png');

        this.backButton = this.load.image('backButton', 'Assets/MainMenu/BackButton.png');
        this.backButtonHover = this.load.image('backButtonHover', 'Assets/MainMenu/BackButtonHover.png');
    }

    create(){
        //background
        this.HowToPlayScreen = this.add.image(0,0,'HowToPlayScreen');
        this.HowToPlayScreen.setOrigin(0,0);
        this.HowToPlayScreen.setDepth(1);

        this.backButton = this.add.sprite(this.sys.game.config.width/2,this.sys.game.config.height - 80 ,'backButton');
        this.backButton.setDepth(2);
        this.backButtonWidth = this.backButton.width;
        this.backButtonHeight = this.backButton.height;
        this.backButtonPosX = this.backButton.x - this.backButtonWidth/2;
        this.backButtonPosY = this.backButton.y - this.backButtonHeight/2;

        //click check
        this.input.on('pointerdown',function(event){
            if(this.isHoveringBack){
                this.scene.start("MainMenu");
                this.scene.stop("HowToPlay");
            }
        }, this);
    }

    update(delta){
        //get mouse position
        this.mousePosX = game.input.mousePointer.x;
        this.mousePosY = game.input.mousePointer.y;
        this.isHoveringBack = false;

        //check if the mouse is hovering over the back button
        if(this.mousePosX > this.backButtonPosX && this.mousePosX < this.backButtonPosX + this.backButtonWidth) {
            if (this.mousePosY > this.backButtonPosY && this.mousePosY < this.backButtonPosY + this.backButtonHeight) {
                this.isHoveringBack = true;
            }
        }
        //apply texture to the back button
        if(this.isHoveringBack && this.backButton.texture.key != 'backButtonHover'){
            this.backButton.setTexture('backButtonHover');
        }

        else if(!this.isHoveringBack && this.backButton.texture.key != 'backButton') {
            this.backButton.setTexture('backButton');
        }
    }
}