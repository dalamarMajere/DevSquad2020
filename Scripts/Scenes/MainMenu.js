let highscore = 0;
let playMusic = true;
let makeAudioSource = true;
let audio = true;
let music;
class MainMenu extends Phaser.Scene {

    constructor() {
        super({key: "MainMenu"});
    }

    preload() {
        this.load.audio('backgroundMusic', 'Assets/Sounds/backgroundLoop.mp3');
        this.load.audio('buttonClick', 'Assets/Sounds/buttonClick.mp3');

        this.titleScreenImage = this.load.image('MainMenuText', 'Assets/MainMenu/MainMenuText.png');
        this.load.image('bg1', 'Assets/Grass/background.png');
        this.load.image('bg2', 'Assets/Lava/background.png');
        this.load.image('bg3', 'Assets/Space/background.png');
        this.load.image('bg4', 'Assets/Winter/background.png');

        this.load.atlas('transition', 'Assets/General/transition.png', 'Assets/General/transition.json');

        this.load.image('playButton', 'Assets/MainMenu/PlayButton.png');
        this.load.image('playButtonHover', 'Assets/MainMenu/PlayButtonHover.png');

        this.load.image('questionButton', 'Assets/MainMenu/QuestionButton.png');
        this.load.image('questionButtonHover', 'Assets/MainMenu/QuestionButtonHover.png');

        this.load.image('audioActive', 'Assets/MainMenu/audioActiveButton.png');
        this.load.image('audioActiveHover', 'Assets/MainMenu/audioActiveButtonHover.png');
        this.load.image('audioInactive', 'Assets/MainMenu/audioInactiveButton.png');
        this.load.image('audioInactiveHover', 'Assets/MainMenu/audioInactiveButtonHover.png');

    }

    create() {
        //delta time
        this.lastTime = 0;

        //background
        this.backgroundTimer = 0;
        this.backgroundChangeTime = 4;
        this.backgrounds = ['bg1', 'bg2', 'bg3', 'bg4'];
        this.background = this.add.sprite(0, 0, this.backgrounds[Phaser.Math.Between(0, 3)]);
        this.background.setOrigin(0, 0);
        this.background.setDepth(0);

        this.titleScreen = this.add.image(0, 0, 'MainMenuText');
        this.titleScreen.setOrigin(0, 0);
        this.titleScreen.setDepth(10);

        //buttons
        this.playButton = this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'playButton');
        this.add.existing(this.playButton);
        this.playButton.setDepth(10);
        this.playButton
            .setInteractive()
            .on('pointerover', () => {
                this.playButton.setTexture('playButtonHover');
            })
            .on('pointerout', () => {
                this.playButton.setTexture('playButton');
            })
            .on('pointerup', () => {
                this.playButtonClick()
            });

        this.questionButton = this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2 + this.playButton.height + 20, 'questionButton');
        this.add.existing(this.questionButton);
        this.questionButton.setDepth(10);
        this.questionButton
            .setInteractive()
            .on('pointerover', () => {
                this.questionButton.setTexture('questionButtonHover');
            })
            .on('pointerout', () => {
                this.questionButton.setTexture('questionButton');
            })
            .on('pointerup', () => {
                this.questionButtonClick()
            });

        this.audioButton = this.add.sprite(this.sys.game.config.width, this.sys.game.config.height, 'audioActive');
        if(!audio)
            this.audioButton.setTexture('audioInactive');

        this.audioButton.setOrigin(0,0);
        this.audioButton.x = this.audioButton.x - this.audioButton.width - 10;
        this.audioButton.y = this.audioButton.y - this.audioButton.height - 10;

        this.add.existing(this.audioButton);
        this.audioButton.setDepth(10);
        this.audioButton
            .setInteractive()
            .on('pointerover', () => {
                if (audio) {
                    this.audioButton.setTexture('audioActiveHover');
                } else {
                    this.audioButton.setTexture('audioInactiveHover');
                }
            })
            .on('pointerout', () => {
                if (audio) {
                    this.audioButton.setTexture('audioActive');
                } else {
                    this.audioButton.setTexture('audioInactive');
                }
            })
            .on('pointerup', () => {
                this.audioButtonClick()
            });


        if (highscore < score)
            highscore = score;

        this.highScore = this.add.text(0, 0, 'Highscore: ' + highscore.toString(), {
            fontFamily: 'Arial',
            fontSize: '50px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 5
        });

        this.highScore.setDepth(10);
        this.highScore.x = this.sys.game.config.width / 2 - this.highScore.displayWidth / 2;
        this.highScore.y = this.sys.game.config.height / 2 - this.highScore.displayHeight * 3;

        //sound
        if(makeAudioSource){
            makeAudioSource = false;
            music = this.sound.add('backgroundMusic');
            music.loop = true;
            music.volume = 0.2;
        }

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

    update(delta) {
        if(audio){
            if (playMusic) {
                music.play();
                playMusic = false;
            }
        }


        this.backgroundTimer += (delta - this.lastTime) / 1000;
        this.lastTime = delta;
        if (this.backgroundTimer > this.backgroundChangeTime) {
            this.backgroundTimer = 0;
            this.transition = this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'transition');
            this.transition.setDepth(5);
            this.transition.play('transitionAnimation');
            this.transitioning = true;
        }


        if (this.transitioning) {
            if (!this.transition.visible) {
                this.transitioning = false;
                let x = 0;
                do {
                    x = Phaser.Math.Between(0, 3);
                } while (this.backgrounds[x] == this.background.texture.key)

                this.background.setTexture(this.backgrounds[x]);
                this.transition.visible = true;
                this.transition.playReverse('transitionAnimation');
            }
        }
    }

    playButtonClick() {
        this.click.play();
        NewGame();
        game.scene.stop("MainMenu");
    }

    questionButtonClick() {
        this.click.play();
        game.scene.start("HowToPlay");
        game.scene.stop("MainMenu");
    }

    audioButtonClick() {
        this.click.play();

        if (audio) {
            audio = false;
            playMusic = true;
            music.stop();
            this.audioButton.setTexture('audioInactiveHover');
        } else {
            audio = true;
            music.play();
            this.audioButton.setTexture('audioActiveHover');
        }
    }
}