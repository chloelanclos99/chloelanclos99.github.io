var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 1000, "y": groundY - 100 },
                { "type": "sawblade", "x": 2000, "y": groundY },
                { "type": "enemy", "x": 400, "y": groundY - 50},
                { "type": "enemy", "x": 800, "y": groundY - 50},
                { "type": "enemy", "x": 1200, "y": groundY - 50},
                { "type": "myobstacle", "x":3000, "y": groundY - 150},
                { "type": "myobstacle", "x": 4000, "y": groundY - 150},
                { "type": "reward", "x": 2000, "y": groundY - 50},
            ]
            
        };
        for (var i = 0; i < levelData.gameItems.length; i++) {
        var eachElement = levelData.gameItems[i];
        var eachElementX = eachElement.x;
        var eachElementY = eachElement.y;
        var eachElementType = eachElement.type;
        if ( eachElementType === "sawblade") {
            createSawBlade(eachElementX, eachElementY);
        } else if (eachElementType === "enemy") {
            createEnemy(eachElementX, eachElementY);
        } else if (eachElementType === "myobstacle") {
            createMyObstacle(eachElementX, eachElementY);
        } else if (eachElementType === "reward") {
            createReward(eachElementX, eachElementY);
        }
    }
        
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        function createSawBlade(x, y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            sawBladeHitZone.x = x;
            sawBladeHitZone.y = y;
            game.addGameItem(sawBladeHitZone);    
            var obstacleImage = draw.bitmap('img/sawblade.png');
            obstacleImage.x = -25;
            obstacleImage.y = -25;
            sawBladeHitZone.addChild(obstacleImage);
        }

        function createMyObstacle(x, y) {
            var hitZoneSize = 10;
            var damageFromObstacle = 5;
            var bombHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            bombHitZone.x = x;
            bombHitZone.y = y;
            game.addGameItem(bombHitZone);    
            var obstacleImage = draw.bitmap('img/My-Image.png');
            obstacleImage.x = -10;
            obstacleImage.y = -10;
            bombHitZone.addChild(obstacleImage);
        } ;

        function createEnemy(x, y) {
            var enemy = game.createGameItem('enemy',25);
            var redSquare = draw.rect(50, 50, 'red');
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = x;
            enemy.y = y;
            game.addGameItem(enemy);
            enemy.velocityX = -1;
            enemy.rotationalVelocity = 10;
            enemy.onPlayerCollision = function() {
                game.changeIntegrity(-10);  
                console.log('The enemy has hit Halle');
            };
            enemy.onProjectileCollision = function() {
                game.increaseScore(100);
                console.log('Halle has hit the enemy');
                enemy.fadeOut();
            }
        }

        function createReward(x, y) {
            var reward = game.createGameItem('reward',25);
            var purpCircle = draw.circle(25,'purple');
            purpCircle.x = -5;
            purpCircle.y = -5;
            reward.addChild(purpCircle);
            reward.x = x;
            reward.y = y;
            game.addGameItem(reward);
            reward.velocityX = -1;
            reward.rotationalVelocity = 10;
            reward.onPlayerCollision = function() {
                game.increaseScore(1000);  
                reward.fadeOut();
            };
        }
        
    
        
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
