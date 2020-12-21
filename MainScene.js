class MainScene extends Phaser.Scene {
    constructor() {
        super({key:"MainScene"});
    }

    create() {

    }

    preload() {
        this.load.image('theme', 'Assets/winter-theme.jpg');
    }

    create(){
        this.image = this.add.image(400,300,'theme')
    }

    update() {

    }
}