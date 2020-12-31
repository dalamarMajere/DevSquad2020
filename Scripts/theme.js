//for changing the theme
let currentBackgroundImage = '1_background';
let currentObstacle1Image =  '1_obstacle1';
let currentObstacle2Image =  '1_obstacle2';
let currentObstacle3Image =  '1_obstacle3';
let currentEnemyImage = '1_enemy';
let currentCollectibleImage = 'collectible';
let currentAnimation = 'animation';

function SetTheme(number){
    //generate new image references
     currentBackgroundImage = number + '_background';
     currentObstacle1Image =  number + '_obstacle1';
     currentObstacle2Image =  number + '_obstacle2';
     currentObstacle3Image =  number + '_obstacle3';
     currentEnemyImage = number + '_enemy';
}
