/*
          4 lanes
_____________________________
|lane 0|lane 1|lane 2|lane 3|

lineOffset is a distance between each line

 */
let mainScene;
let amountOfLanes = 4;
let startingLane = 2;
let laneOffset;
let windowWidth;
let windowHeight;
let deltaTime;

class GameScene extends Phaser.Scene {
    constructor() {
        super({key:"GameScene"});
    }

    preload() {

        this.load.image('ground', 'Assets/ground.png');


        //winter
        this.playerImg = this.load.image('player', 'Assets/player.jpg');
        this.load.image('1_background', 'Assets/snow-theme.png');
        this.load.image('1_obstacle1', 'Assets/fence.png');
        this.load.image('1_obstacle2', 'Assets/winter-tree.png');
        //#TODO: animate coffee
        this.load.image('1_enemy', 'Assets/coffee.png');

        this.load.atlas('1_collectible', 'Assets/coffee_tran_ani.png', 'Assets/coffee_tran_ani.json');
        /*this.anims.create({
            key: '1_animation',
            frames: this.anims.generateFrameNames('1_collectible', {
                start: 0,
                end: 2,
                suffix: '.png'
            }),
            frameRate: 5,
            repeat: -1
        });*/

        this.load.image('1_collectible', 'Assets/coffee.png');
        this.load.atlas('1_energy', 'Assets/tmp.png', 'Assets/tmp.json');

        this.load.atlas('transition', 'Assets/transition.png', 'Assets/transition.json');
        //forest
        this.load.image('2_background', 'Assets/snow-theme.png');
        this.load.image('2_obstacle1', 'Assets/snow-theme.png');
        this.load.image('2_obstacle2', 'Assets/snow-theme.png');
        this.load.image('2_enemy', 'Assets/snow-theme.png');
        this.load.image('2_collectible', 'Assets/snow-theme.png');

        //lava
        this.load.image('3_background', 'Assets/snow-theme.png');
        this.load.image('3_obstacle1', 'Assets/snow-theme.png');
        this.load.image('3_obstacle2', 'Assets/snow-theme.png');
        this.load.image('3_enemy', 'Assets/snow-theme.png');
        this.load.image('3_collectible', 'Assets/snow-theme.png');

        //space
        this.load.image('4_background', 'Assets/snow-theme.png');
        this.load.image('4_obstacle1', 'Assets/snow-theme.png');
        this.load.image('4_obstacle2', 'Assets/snow-theme.png');
        this.load.image('4_enemy', 'Assets/snow-theme.png');
        this.load.image('4_collectible', 'Assets/snow-theme.png');

        //scoreboard
        this.load.image('scoreboard','Assets/scoreboard.png');
    }
    create(){
        mainScene = this;
        this.lastTime = 0;

        windowHeight = this.sys.game.config.height;
        windowWidth= this.sys.game.config.width;
        laneOffset = windowWidth/amountOfLanes;

        this.ground = this.physics.add.sprite(0, 810, 'ground');
        this.ground.setOrigin(0, 0);
        this.ground.setDepth(10);

        //create lane objects
        for(let i = 0; i < amountOfLanes;i++){
            new lane(laneOffset * i);
        }

        CreatePlayer(0);
        SetTheme(1);
        CreateBackground();
        this.inputManager();
        CreateScore();
        CreateEnergy();
    }

    update(time) {
        //calculate DeltaTime
        deltaTime = (time-this.lastTime)/1000;
        this.lastTime = time;

        MoveBackgroundOverTime();
        IncreaseDifficultyOverTime();
        AddScoreOverTime();
        DecreaseEnergyOverTime();
        HandleSpawning();
        UpdateScore();
        //for now: move all collectible
        moveQueueForward();


        console.log(difficulty);
        energySprite.setFrame(GetCurrentFrame());
    }


    inputManager()
    {
        this.input.keyboard.on('keydown',function(event){
            if(event.key === "p"){
                this.scene.start("MainMenu");
            }
            if (event.key == "d") { //#TODO: right and left keys
                MoveRight();
            }

            if(event.key === "a"){
                MoveLeft();
            }

        }, this);

        this.input.keyboard.on('keyup', function(event) {
            //to make smoother transition check if "a" doesn't pressed
            if (event.key == "d" && playerMoveRight) { //#TODO: right and left keys
                StopPlayer();
            }

            if(event.key === "a" && !playerMoveRight){
                StopPlayer();
            }
        }, this);
    }
}
