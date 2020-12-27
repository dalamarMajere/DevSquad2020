
var config = {
    type:Phaser.AUTO,
    width:600,
    height:800,
    scene: [GameScene, MainMenu],
    physics : {
        default:'arcade'
    }
}

var game = new Phaser.Game(config);


