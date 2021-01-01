class MainMenu extends Phaser.Scene {

    constructor() {
        super({key:"MainMenu"});
    }

    preload() {
       this.titleScreenImage = this.load.image('MainMenuText', 'Assets/MainMenu/MainMenuText.png');

        this.playButton = this.load.image('playButton', 'Assets/MainMenu/PlayButton.png');
        this.playButtonHover = this.load.image('playButtonHover', 'Assets/MainMenu/PlayButtonHover.png');

        this.questionButton = this.load.image('questionButton', 'Assets/MainMenu/QuestionButton.png');
        this.questionButtonHover = this.load.image('questionButtonHover', 'Assets/MainMenu/QuestionButtonHover.png');
    }

    create(){
        //background
        this.titleScreen = this.add.image(0,0,'MainMenuText');
        this.titleScreen.setOrigin(0,0);

        //play button
        this.playButton = this.add.sprite(this.sys.game.config.width/2,this.sys.game.config.height/2,'playButton');
        this.playButtonWidth = this.playButton.width;
        this.playButtonHeight = this.playButton.height;
        this.playButtonPosX = this.playButton.x - this.playButtonWidth/2;
        this.playButtonPosY = this.playButton.y - this.playButtonHeight/2;


        this.questionButton = this.add.sprite(this.sys.game.config.width/2,this.sys.game.config.height/2 + this.playButton.height + 20,'questionButton');
        this.questionButtonWidth = this.questionButton.width;
        this.questionButtonHeight = this.questionButton.height;
        this.questionButtonPosX = this.questionButton.x - this.questionButtonWidth/2;
        this.questionButtonPosY = this.questionButton.y - this.questionButtonHeight/2;

        //click check
        this.input.on('pointerdown',function(event){
            if(this.isHoveringPlay){
                NewGame();
            }

            if(this.isHoveringQuestion){
                this.scene.start("HowToPlay");
            }
        }, this);
    }

    update(delta){
        //get mouse position
        this.mousePosX = game.input.mousePointer.x;
        this.mousePosY = game.input.mousePointer.y;
        this.isHoveringPlay = false;
        this.isHoveringQuestion = false;

        //check if the mouse is hovering over the play button
        if(this.mousePosX > this.playButtonPosX && this.mousePosX < this.playButtonPosX + this.playButtonWidth){
            if(this.mousePosY > this.playButtonPosY && this.mousePosY < this.playButtonPosY + this.playButtonHeight){
                this.isHoveringPlay = true;
            }
        }

        if(this.mousePosX > this.questionButtonPosX && this.mousePosX < this.questionButtonPosX + this.questionButtonWidth){
            if(this.mousePosY > this.questionButtonPosY && this.mousePosY < this.questionButtonPosY + this.questionButtonHeight){
                this.isHoveringQuestion = true;
            }
        }

        //apply texture to the play button
        if(this.isHoveringPlay && this.playButton.texture.key != 'playButtonHover'){
            this.playButton.setTexture('playButtonHover');
        }
        else if(!this.isHoveringPlay && this.playButton.texture.key != 'playButton') {
            this.playButton.setTexture('playButton');
        }

        if(this.isHoveringQuestion && this.questionButton.texture.key != 'questionButtonHover'){
            this.questionButton.setTexture('questionButtonHover');
        }
        else if(!this.isHoveringQuestion && this.questionButton.texture.key != 'questionButton') {
            this.questionButton.setTexture('questionButton');
        }
    }
}