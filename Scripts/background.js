let backgroundSprites = [];

function CreateBackground() {
    backgroundSprites = [];

    //start covering the screen from this place
    let coveredHeight = -3200; //#TODO: change to const

    //keep making new background sprites until the whole screen is covered
    do{
        //create new sprite
        let newBgSprite = mainScene.add.sprite(0,coveredHeight,currentBackgroundImage);
        //setup the sprite
        newBgSprite.setOrigin(0,0);
        //push it into backgroundSprites Array
        backgroundSprites.push(newBgSprite);
        //increase the covered space
        coveredHeight += newBgSprite.height;

    }while(coveredHeight < windowHeight)
}

function MoveBackgroundOverTime() {

    //if there are background sprites
    if(backgroundSprites.length < 1)
        return null;

    //move the background each frame
    for(let i = 0 ; i < backgroundSprites.length;i++){
        backgroundSprites[i].y += difficulty;
    }

    //if the last image rolls off the screen
    if(backgroundSprites[backgroundSprites.length-1].y > windowHeight){
        //remove it from the end of the array
        let poppedSprite = backgroundSprites.pop();
        //change the sprites position to the first sprites position minus its height
        poppedSprite.y = backgroundSprites[0].y - poppedSprite.height;
        //place it at the start of the array
        backgroundSprites.unshift(poppedSprite);
    }
}
