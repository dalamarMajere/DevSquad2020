let pointsForCollecting = 10;

class gameObject{
    constructor(type,x) {
        this.objectType = type;

        switch (this.objectType){
            case "collectible":
                this.MakeCollectable(x);
                break;
            case "enemy":
                this.objectSprite = mainScene.physics.add.sprite(x, 0, currentEnemyImage);
                mainScene.physics.add.collider(mainScene.ground, this.objectSprite,
                    this.DestroyEnemy, null, this);
                mainScene.physics.add.collider(player, this.objectSprite,
                    gameOver, null, this);
                break;
            case "obstacle":
                this.MakeObstacle(x);
                break;
            default:
                console.log("No object of "+type+" type");
                this.objectType = "unknown";
                break;
        }

        if(this.objectType != "unknown"){
            this.objectSprite.y = -this.objectSprite.height;
            this.objectSprite.setDepth(1);
            this.objectSprite.setOrigin(0);
            this.objectSprite.x += (laneOffset-this.objectSprite.width)/2
        }
    }

    MakeCollectable(x) {
        this.objectSprite = mainScene.physics.add.sprite(x, 0, currentCollectibleImage);
        mainScene.physics.add.overlap(player, this.objectSprite,
                this.GetCollectible, null, this);

        mainScene.physics.add.collider(mainScene.ground, this.objectSprite,
                                    this.DestroyCollectible, null, this);

        mainScene.anims.create({
            key: 'animation',
            frames: mainScene.anims.generateFrameNames('collectible', {
                start: 0,
                end: 2,
                suffix: '.png'
            }),
            frameRate: 5,
            repeat: -1
        });
        this.objectSprite.play(currentAnimation);
    }

    MakeObstacle(x) {
        let index = Phaser.Math.Between(1, 3);
        switch(index) {
            case 1: this.objectSprite = mainScene.physics.add.sprite(x, 0, currentObstacle1Image); break;
            case 2: this.objectSprite = mainScene.physics.add.sprite(x, 0, currentObstacle2Image); break;
            case 3: this.objectSprite = mainScene.physics.add.sprite(x, 0, currentObstacle3Image); break;
        }
        mainScene.physics.add.collider(mainScene.ground, this.objectSprite,
            this.DestroyObstacle, null, this);
        mainScene.physics.add.collider(player, this.objectSprite,
            this.CollisionWithPlayer, null, this);
    }

    GetCollectible() {
        score += pointsForCollecting;
        IncreaseEnergyLevel();
        this.DestroyCollectible();
    }

    CollisionWithPlayer() {
        DecreaseEnergyLevel();
        this.DestroyObstacle();
    }

    DestroyObstacle() {
        obstacleAmount--;
        deleteObstacle();
        this.Destroy();
    }

    DestroyEnemy() {
        this.Destroy();
    }

    DestroyCollectible() {
        collectibleAmount--;
        deleteCollectible();
        this.Destroy();
    }

    Destroy(){
        this.objectSprite.destroy();
        //#TODO: destroy the object itself, not only the sprite
    }
}
