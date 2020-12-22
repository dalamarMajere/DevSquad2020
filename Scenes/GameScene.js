class GameScene extends Phaser.Scene {
    constructor() {
        super({key:"GameScene"});
    }

    preload() {
        this.load.image('theme', 'Assets/winter-theme.jpg');
    }

    create(){
        this.image = this.add.image(400,300,'theme')

        this.input.keyboard.on('keyup', function(event){
            if(event.key == "p"){
                this.scene.start("MainMenu");
            }
        },this);
    }

    update() {

    }
}