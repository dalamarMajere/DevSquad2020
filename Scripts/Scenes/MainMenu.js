let highscore = 0;
let playMusic = true;
class MainMenu extends Phaser.Scene {

    constructor() {
        super({key:"MainMenu"});
    }

    preload() {
        this.load.audio('backgroundMusic','Assets/Sounds/backgroundLoop.mp3');
        this.load.audio('buttonClick','Assets/Sounds/buttonClick.mp3');

        this.titleScreenImage = this.load.image('MainMenuText', 'Assets/MainMenu/MainMenuText.png');
        this.load.image('bg1', 'Assets/Grass/background.png');
        this.load.image('bg2', 'Assets/Lava/background.png');
        this.load.image('bg3', 'Assets/Space/background.png');
        this.load.image('bg4', 'Assets/Winter/background.png');

        this.load.atlas('transition', 'Assets/General/transition.png', 'Assets/General/transition.json');

        this.playButton = this.load.image('playButton', 'Assets/MainMenu/PlayButton.png');
        this.playButtonHover = this.load.image('playButtonHover', 'Assets/MainMenu/PlayButtonHover.png');

        this.questionButton = this.load.image('questionButton', 'Assets/MainMenu/QuestionButton.png');
        this.questionButtonHover = this.load.image('questionButtonHover', 'Assets/MainMenu/QuestionButtonHover.png');
    }

    create(){
        this.lastTime = 0;
        this.backgroundTimer = 0;
        this.backgroundChangeTime = 4;

        this.backgrounds = ['bg1','bg2','bg3','bg4'];
        //background
        this.background = this.add.sprite(0,0,this.backgrounds[Phaser.Math.Between(0, 3)]);
        this.background.setOrigin(0,0);
        this.background.setDepth(0);

        this.titleScreen = this.add.image(0,0,'MainMenuText');
        this.titleScreen.setOrigin(0,0);
        this.titleScreen.setDepth(10);


        //play button
        this.playButton = this.add.sprite(this.sys.game.config.width/2,this.sys.game.config.height/2,'playButton');
        this.playButton.setDepth(10);
        this.playButtonWidth = this.playButton.width;
        this.playButtonHeight = this.playButton.height;
        this.playButtonPosX = this.playButton.x - this.playButtonWidth/2;
        this.playButtonPosY = this.playButton.y - this.playButtonHeight/2;


        this.questionButton = this.add.sprite(this.sys.game.config.width/2,this.sys.game.config.height/2 + this.playButton.height + 20,'questionButton');
        this.questionButton.setDepth(10);
        this.questionButtonWidth = this.questionButton.width;
        this.questionButtonHeight = this.questionButton.height;
        this.questionButtonPosX = this.questionButton.x - this.questionButtonWidth/2;
        this.questionButtonPosY = this.questionButton.y - this.questionButtonHeight/2;

        if(highscore<score)
            highscore=score;

        this.highScore = this.add.text(0,0,'Highscore: '+highscore.toString(),{ fontFamily: 'Arial', fontSize: '50px', color: '#ffffff' ,stroke: '#000000', strokeThickness:5 });
        this.highScore.setDepth(10);
        //center and position the text;
        this.highScore.x = this.sys.game.config.width/2 - this.highScore.displayWidth/2;
        this.highScore.y = this.sys.game.config.height - this.highScore.displayHeight*2;
        //click check
        this.input.on('pointerdown',function(event){
            if(this.isHoveringPlay){
                NewGame();
                this.click.play();
                game.scene.stop("MainMenu");
            }
            if(this.isHoveringQuestion){
                this.click.play();
                game.scene.start("HowToPlay");
                game.scene.stop("MainMenu");
            }
        }, this);
        //sound
        this.music = this.sound.add('backgroundMusic');
        this.music.loop = true;
        this.music.volume = 0.2;

        this.click = this.sound.add('buttonClick');
        //transition

        this.anims.create({
            key: 'transitionAnimation',
            frames: this.anims.generateFrameNames('transition', {
                start: 0,
                end: 9,
                suffix: '.png'
            }),
            frameRate: 24,
            repeat: 0,
            hideOnComplete: true
        });
    }

    update(delta){
        if(playMusic){
            this.music.play();
            playMusic = false;
        }
        this.backgroundTimer += (delta - this.lastTime)/1000;
        this.lastTime = delta;

        if(this.backgroundTimer > this.backgroundChangeTime){
            this.backgroundTimer = 0;
            this.transition = this.add.sprite(this.sys.game.config.width/2,this.sys.game.config.height/2,'transition');
            this.transition.setDepth(5);
            this.transition.play('transitionAnimation');
            this.transitioning = true;
        }

        if(this.transitioning){
            if(!this.transition.visible){
                this.transitioning = false;
                let x = 0;
                do{
                    x = Phaser.Math.Between(0, 3);
                }while(this.backgrounds[x] == this.background.texture.key)

                this.background.setTexture(this.backgrounds[x]);
                this.transition.visible=true;
                this.transition.playReverse('transitionAnimation');
            }
        }
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