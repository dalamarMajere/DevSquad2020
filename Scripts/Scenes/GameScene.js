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

        this.load.atlas('transition', 'Assets/General/transition.png', 'Assets/General/transition.json');
        this.load.image('ground', 'Assets/General/ground.png');
        this.load.atlas('1_energy', 'Assets/General/tmp.png', 'Assets/General/tmp.json');

        //winter
        this.playerImg = this.load.image('player', 'Assets/player.png');

        this.load.image('1_background', 'Assets/Winter/background.png');
        this.load.image('1_obstacle1', 'Assets/Winter/obstacle1.png'); //rock
        this.load.image('1_obstacle2', 'Assets/Winter/obstacle2.png'); //tree
        this.load.image('1_obstacle3', 'Assets/Winter/obstacle3.png'); //fence
        this.load.image('1_enemy', 'Assets/Winter/enemy.png');
        this.load.atlas('1_collectible', 'Assets/Winter/collectible.png', 'Assets/Winter/collectible.json');

        /*
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
         */

        //scoreboard
        this.load.image('scoreboard','Assets/General/scoreboard.png');
    }
    create(){
        mainScene = this;
        this.lastTime = 0;

        windowHeight = this.sys.game.config.height;
        windowWidth= this.sys.game.config.width;
        laneOffset = windowWidth/amountOfLanes;

        this.ground = this.physics.add.sprite(0, windowHeight+200, 'ground');
        this.ground.setOrigin(0, 0);
        this.ground.setDepth(10);

        CreatePlayer(0);
        SetTheme(1);
        CreateBackground();

        //this.right = false;
        //this.left = false;
        this.inputManager();
        CreateScore();
        CreateEnergy();
    }

    update(time) {
        //calculate DeltaTime
        deltaTime = (time-this.lastTime)/1000;
        this.lastTime = time;

        //MovePlayer();
        MoveBackgroundOverTime();
        IncreaseDifficultyOverTime();
        AddScoreOverTime();
        DecreaseEnergyOverTime();
        HandleSpawning();
        UpdateScore();
        //for now: move all collectible
        moveQueueForward();

        energySprite.setFrame(GetCurrentFrame());
    }


    inputManager()
    {
        //while key is pressed
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

        //when key is unpressed
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
