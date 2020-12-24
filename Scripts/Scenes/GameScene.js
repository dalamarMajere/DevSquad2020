class GameScene extends Phaser.Scene {
    constructor() {
        super({key:"GameScene"});
    }

    preload() {
        //normal - forest?
        this.playerImg = this.load.image('player', 'Assets/player.jpg');
        this.load.image('1_background', 'Assets/winter-theme.jpg');
        this.load.image('1_obstacle1', 'Assets/winter-theme.jpg');
        this.load.image('1_obstacle2', 'Assets/winter-theme.jpg');
        this.load.image('1_enemy1', 'Assets/winter-theme.jpg');
        this.load.image('1_collectible', 'Assets/winter-theme.jpg');

        //winter
        this.load.image('2_background', 'Assets/winter-theme.jpg');
        this.load.image('2_obstacle1', 'Assets/winter-theme.jpg');
        this.load.image('2_obstacle2', 'Assets/winter-theme.jpg');
        this.load.image('2_enemy1', 'Assets/winter-theme.jpg');
        this.load.image('2_collectible', 'Assets/winter-theme.jpg');

        //lava
        this.load.image('3_background', 'Assets/winter-theme.jpg');
        this.load.image('3_obstacle1', 'Assets/winter-theme.jpg');
        this.load.image('3_obstacle2', 'Assets/winter-theme.jpg');
        this.load.image('3_enemy1', 'Assets/winter-theme.jpg');
        this.load.image('3_collectible', 'Assets/winter-theme.jpg');

        //space
        this.load.image('4_background', 'Assets/winter-theme.jpg');
        this.load.image('4_obstacle1', 'Assets/winter-theme.jpg');
        this.load.image('4_obstacle2', 'Assets/winter-theme.jpg');
        this.load.image('4_enemy1', 'Assets/winter-theme.jpg');
        this.load.image('4_collectible', 'Assets/winter-theme.jpg');

    }

    /*
              4 lanes
    _____________________________
    |lane 0|lane 1|lane 2|lane 3|

    lineOffset is a distance between each line

     */
    create(){
        this.deltaTime = 0;
        this.lastTime = 0;

        //setup
        this.amountOfLanes = 4;
        this.startingLine = 2;
        this.laneOffset = this.sys.game.config.width/this.amountOfLanes;

        //createPlayer on lane 0
        CreatePlayer(this,0);

        //set the theme to forest
        SetTheme(1);

        //initiate arrays that hold all the sprites of their type
        this.backgroundSprites = [];
        this.enemySprites = [];
        this.collectibleSprites = [];

        //initiate the backgroundSprites array to cover the whole screen at least twice
        let coveredHeight = -this.sys.game.config.height;

        do{
            console.log(currentBackground);
            this.newBgSprite = this.add.sprite(0,coveredHeight,currentBackground);
            this.newBgSprite.setOrigin(0,0);
            this.backgroundSprites.push(this.newBgSprite);

            coveredHeight += this.newBgSprite.height;

        }while(coveredHeight < this.sys.game.config.height)

        //input
        this.input.keyboard.on('keydown',function(event){

            if(event.key == "d" || event.key == "right"){
                IncreasePlayerLane(this);
            }

            if(event.key == "a" || event.key == "left"){
                DecreasePlayerLane(this);
            }

            if(event.key == "p"){
                this.scene.start("MainMenu");
            }

        }, this);

    }

    update(time) {
        //calculate DeltaTime
        this.deltaTime = (time-this.lastTime)/1000;
        this.lastTime = time;

        AddScore(this);
        IncreaseDifficulty(this);

        //move the background each frame
        for(let i = 0 ; i < this.backgroundSprites.length;i++){
            this.backgroundSprites[i].y += difficulty;
        }

        //if the last image rolls off the screen
        if(this.backgroundSprites[this.backgroundSprites.length-1].y > this.sys.game.config.height){
            //remove it from the end of the array
            let shift = this.backgroundSprites.pop();
            //change the sprites position to the first sprites position minus its height
            shift.y = this.backgroundSprites[0].y - shift.height;
            //place it at the start of the array
            this.backgroundSprites.unshift(shift);
        }
    }

}
