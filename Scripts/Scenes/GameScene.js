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
        this.load.atlas('collectible', 'Assets/collectible.png', 'Assets/collectible.json');
        this.load.atlas('transition', 'Assets/General/transition.png', 'Assets/General/transition.json');
        this.load.image('ground', 'Assets/General/ground.png');
        this.load.atlas('energy', 'Assets/General/tmp.png', 'Assets/General/tmp.json');
        this.playerImg = this.load.image('player', 'Assets/player.png');

        //winter
        this.load.image('1_background', 'Assets/Winter/background.png');
        this.load.image('1_obstacle1', 'Assets/Winter/obstacle1.png'); //rock
        this.load.image('1_obstacle2', 'Assets/Winter/obstacle2.png'); //tree
        this.load.image('1_obstacle3', 'Assets/Winter/obstacle3.png'); //fence
        this.load.image('1_enemy', 'Assets/Winter/enemy.png');

        //grass
        this.load.image('2_background', 'Assets/Grass/background.png');
        this.load.image('2_obstacle1', 'Assets/Grass/obstacle1.png'); //rock
        this.load.image('2_obstacle2', 'Assets/Grass/obstacle2.png'); //tree
        this.load.image('2_obstacle3', 'Assets/Grass/obstacle3.png'); //fence
        this.load.image('2_enemy', 'Assets/Grass/enemy.png');

        //lava
        this.load.image('3_background', 'Assets/Lava/background.png');
        this.load.image('3_obstacle1', 'Assets/Lava/obstacle1.png'); //rock
        this.load.image('3_obstacle2', 'Assets/Lava/obstacle2.png'); //tree
        this.load.image('3_obstacle3', 'Assets/Lava/obstacle3.png'); //fence
        this.load.image('3_enemy', 'Assets/Lava/enemy.png');

        //space
        this.load.image('4_background', 'Assets/Space/background.png');
        this.load.image('4_obstacle1', 'Assets/Space/obstacle1.png'); //rock
        this.load.image('4_obstacle2', 'Assets/Space/obstacle2.png'); //tree
        this.load.image('4_obstacle3', 'Assets/Space/obstacle3.png'); //fence
        this.load.image('4_enemy', 'Assets/Space/enemy.png');


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

        CreatePlayer();
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
                GameOver();
            }
            if (event.key == "d") { //#TODO: right and left keys
                MoveRight();
            }

            if(event.key === "a"){
                MoveLeft();
            }

            if (event.key == "q") {
                DestroyEnemy();
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
