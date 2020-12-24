//for changing the theme
let currentBackground = '1_background';
let currentObstacle1 =  '1_obstacle1';
let currentObstacle2 =  '1_obstacle2';
let currentEnemy = '1_enemy';
let currentCollectible = '1_collectible';

 function SetTheme(number){
    //generate new image references
     currentBackground = number + '_background';
     currentObstacle1 =  number + '_obstacle1';
     currentObstacle2 =  number + '_obstacle2';
     currentEnemy = number + '_enemy';
     currentCollectible =  number + '_collectible';
};
