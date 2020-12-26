//for changing the theme
let currentBackgroundImage = '1_background';
let currentObstacle1Image =  '1_obstacle1';
let currentObstacle2Image =  '1_obstacle2';
let currentEnemyImage = '1_enemy';
let currentCollectibleImage = '1_collectible';

function SetTheme(number){
    //generate new image references
     currentBackgroundImage = number + '_background';
     currentObstacle1Image =  number + '_obstacle1';
     currentObstacle2Image =  number + '_obstacle2';
     currentEnemyImage = number + '_enemy';
     currentCollectibleImage =  number + '_collectible';
};
