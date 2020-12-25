class GameScene extends Phaser.Scene {
    constructor() {
        super({key:"GameScene"});
    }

    preload() {
        //winter
        this.playerImg = this.load.image('player', 'Assets/player.jpg');
        this.load.image('1_background', 'Assets/snow-theme.png');
        this.load.image('1_obstacle1', 'Assets/snow-theme.png');
        this.load.image('1_obstacle2', 'Assets/snow-theme.png');
        this.load.image('1_enemy1', 'Assets/snow-theme.png');
        this.load.image('1_collectible', 'Assets/coffee.png');

        //forest
        this.load.image('2_background', 'Assets/snow-theme.png');
        this.load.image('2_obstacle1', 'Assets/snow-theme.png');
        this.load.image('2_obstacle2', 'Assets/snow-theme.png');
        this.load.image('2_enemy1', 'Assets/snow-theme.png');
        this.load.image('2_collectible', 'Assets/snow-theme.png');

        //lava
        this.load.image('3_background', 'Assets/snow-theme.png');
        this.load.image('3_obstacle1', 'Assets/snow-theme.png');
        this.load.image('3_obstacle2', 'Assets/snow-theme.png');
        this.load.image('3_enemy1', 'Assets/snow-theme.png');
        this.load.image('3_collectible', 'Assets/snow-theme.png');

        //space
        this.load.image('4_background', 'Assets/snow-theme.png');
        this.load.image('4_obstacle1', 'Assets/snow-theme.png');
        this.load.image('4_obstacle2', 'Assets/snow-theme.png');
        this.load.image('4_enemy1', 'Assets/snow-theme.png');
        this.load.image('4_collectible', 'Assets/snow-theme.png');

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
        CreatePlayer(this, 0);


        //set the theme to forest
        SetTheme(1);

        //initiate arrays that hold all the sprites of their type
        this.backgroundSprites = [];
        this.enemySprites = [];
        this.collectibleSprites = [];

        //initiate the backgroundSprites array to cover the whole screen at least twice
        this.createBackground();

        //input
        this.inputManager();

        this.createItem(); //#TODO: automatize item creating

        /*this.coffee = this.add.sprite(0, 0, currentCollectible);
        this.coffee.setOrigin(0,0);
        this.coffee.scale = 2;
        this.collectibleSprites.push(this.coffee);*/

    }

    update(time) {
        //calculate DeltaTime
        this.deltaTime = (time-this.lastTime)/1000;
        this.lastTime = time;

        AddScore(this);
        IncreaseDifficulty(this);

        this.moveBackground();
        this.moveCollectible();

        for (let i of this.collectibleSprites) {
            if (i.y + i.height / 2 >= player.y - player.height && i.lane == currentLane) {
                this.collect(i);
                this.collectibleSprites.remove(i);
            }
            //#TODO: check if sprite run out from the field
            //and delete it
        }

        //#TODO: check out energy level and change it or finish the game

        //game.physics.arcadePhysics.overlap(player, this.collectibleSprites[0], print);
    }

    collect(item) {
        AddScore(this);
        //delete sprite with animation
        //increase energy level
    }

    createItem() {
        let clane = Phaser.Math.Between(0, this.amountOfLanes - 1); //#TODO: collectible doesnt exists wtf?
        let item = new collectible(clane,this.physics.add.sprite(0, 0, currentCollectible));
        item.setOrigin(0, 0);
        item.setDepth(1);
        item.scale = 3;

        item.x = this.laneOffset * clane + (this.laneOffset - item.width) / 2;
        item.y = item.height / 2;

        console.log(item.x + " " + item.y);

        this.collectibleSprites.push(item);
        //item.body = enable;
       // item.physicsBodyType = Phaser.Physics.Arcade;
        //game.physics.enable(item, Phaser.Physics.ARCADE, true)  #TODO: why physics doesn't work?
    }

    createBackground() {
        let coveredHeight = -3200; //#TODO: change to const

        do{
            console.log(currentBackground);
            this.newBgSprite = this.add.sprite(0,coveredHeight,currentBackground);
            this.newBgSprite.setOrigin(0,0);
            this.backgroundSprites.push(this.newBgSprite);

            coveredHeight += this.newBgSprite.height;

        }while(coveredHeight < this.sys.game.config.height)
    }

    moveCollectible() {
        for (let i of this.collectibleSprites) {
            i.y += difficulty;
        }
    }

    moveBackground() {
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

    inputManager()
    {
        this.input.keyboard.on('keydown',function(event){

            if(event.key === "d" || event.key == "right"){ //#TODO: right and left keys
                IncreasePlayerLane(this);
            }

            if(event.key === "a" || event.key == "left"){
                DecreasePlayerLane(this);
            }

            if(event.key === "p"){
                this.scene.start("MainMenu");
            }

        }, this);
    }

}
