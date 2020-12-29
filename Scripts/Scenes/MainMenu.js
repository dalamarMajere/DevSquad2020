class MainMenu extends Phaser.Scene {

    constructor() {
        super({key:"MainMenu"});
    }

    preload() {
       this.titleScreenImage = this.load.image('titleScreen', 'Assets/MainMenu/TitleScreen.png');
        this.playButton = this.load.image('playButton', 'Assets/MainMenu/PlayButton.png');
        this.playButtonHover = this.load.image('playButtonHover', 'Assets/MainMenu/PlayButtonHover.png');
    }

    create(){
        //background
        this.titleScreen = this.add.image(0,0,'titleScreen');
        this.titleScreen.setOrigin(0,0);

        //play button
        this.playButton = this.add.sprite(this.sys.game.config.width/2,this.sys.game.config.height/2,'playButton');
        this.playButtonWidth = this.playButton.width;
        this.playButtonHeight = this.playButton.height;
        this.playButtonPosX = this.playButton.x - this.playButtonWidth/2;
        this.playButtonPosY = this.playButton.y - this.playButtonHeight/2;

        //click check
        this.input.on('pointerdown',function(event){
            if(this.isHovering){
                this.scene.start('GameScene');
            }
        }, this);
    }

    update(delta){
        //get mouse position
        this.mousePosX = game.input.mousePointer.x;
        this.mousePosY = game.input.mousePointer.y;
        this.isHovering = false

        //check if the mouse is hovering over the play button
        if(this.mousePosX > this.playButtonPosX && this.mousePosX < this.playButtonPosX + this.playButtonWidth){
            if(this.mousePosY > this.playButtonPosY && this.mousePosY < this.playButtonPosY + this.playButtonHeight){
                this.isHovering = true;
            }
        }

        //apply texture to the play button
        if(this.isHovering && this.playButton.texture.key != 'playButtonHover'){
            this.playButton.setTexture('playButtonHover');
        }
        else if(!this.isHovering && this.playButton.texture.key != 'playButton') {
            this.playButton.setTexture('playButton');
        }
    }
}