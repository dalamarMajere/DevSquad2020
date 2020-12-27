let pointsForCollecting = 1;

class gameObject{
    constructor(type,x) {
        this.objectType = type;

        switch (this.objectType){
            case "collectible":
                collectibleAmount++;
                this.objectSprite = mainScene.add.sprite(x, 0, currentCollectibleImage);
                break;
            case "enemy":
                this.objectSprite = mainScene.add.sprite(x, 0, currentEnemyImage);
                break;
            case "obstacle":
                let index = Phaser.Math.Between(1, 2);
                if(index === 1){
                    this.objectSprite = mainScene.add.sprite(x, 0, currentObstacle1Image);
                }
                else{
                    this.objectSprite = mainScene.add.sprite(x, 0, currentObstacle2Image);
                    this.objectSprite.scale = 1.5;
                }
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

    CollisionWithPlayer() {
        switch (this.objectType) {
            case "collectible":
                //if its a collectible add points, and destroy the object
                score += pointsForCollecting;
                IncreaseEnergyLevel();
                this.Destroy();
                break;
            case "enemy":
                //if its an enemy end the game
                mainScene.scene.start("MainMenu");
                break;
            case "obstacle":
                //if its an obstacle end the game
                DecreaseEnergyLevel();
                this.Destroy();
                break;
            default:
                break;
        }
    }

    Destroy(){
        this.objectSprite.destroy();
        if (this.objectType == 'collectible')
            collectibleAmount--;
        //#TODO: destroy the object itself, not only the sprite
    }
}
