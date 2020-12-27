
let transition;

function StartTransition(x,y){
    transition = mainScene.add.sprite(x,y,'transition');
    let frameNames = mainScene.textures.get('transition').getFrameNames();
    transition.setDepth(10);

    mainScene.anims.create({
        key: 'transitionAnimation',
        frames: mainScene.anims.generateFrameNames('transition', {
            start: 0,
            end: 9,
            suffix: '.png'
        }),
        frameRate: 10,
        repeat: 0
    });

    transition.play('transitionAnimation');
}

function GetCurrentTransitionFrame(){
    if(transition!=null){
        return transition.anims.currentFrame.index;
    }
}