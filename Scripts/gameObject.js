let pointsForCollecting = 1;

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
            key: '1_animation',
            frames: mainScene.anims.generateFrameNames('1_collectible', {
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
        let index = Phaser.Math.Between(1, 2);
        if(index === 1){
            this.objectSprite = mainScene.physics.add.sprite(x, 0, currentObstacle1Image);
        }
        else{
            this.objectSprite = mainScene.physics.add.sprite(x, 0, currentObstacle2Image);
        }
        mainScene.physics.add.collider(mainScene.ground, this.objectSprite,
            this.DestroyObstacle, null, this);
        mainScene.physics.add.collider(player, this.objectSprite,
            this.CollisionWithPlayer, null, this);
    }

    GetCollectible() {
        score += pointsForCollecting;
        IncreaseEnergyLevel();
        collectibleAmount--;
        this.Destroy();
    }

    CollisionWithPlayer() {
        obstacleAmount--;
        DecreaseEnergyLevel();
        this.Destroy();
    }

    DestroyObstacle() {
        obstacleAmount--;
        this.Destroy();
    }

    DestroyEnemy() {
        this.Destroy();
    }

    DestroyCollectible() {
        collectibleAmount--;
        this.Destroy();
    }

    Destroy(){
        this.objectSprite.destroy();
        //#TODO: destroy the object itself, not only the sprite
    }
}
