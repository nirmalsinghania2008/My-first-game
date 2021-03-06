var mainState={
    
    
    preload:function(){
game.load.image('player', 'assets/player.png');
game.load.image('wallV', 'assets/wallVertical.png');
game.load.image('wallH', 'assets/wallHorizontal.png');
        game.load.image('coin', 'assets/coin.png');
    },
    
    create: function(){
        this.coin = game.add.sprite(60, 140, 'coin');
// Add Arcade physics to the coin
game.physics.arcade.enable(this.coin);
// Set the anchor point of the coin to its center
this.coin.anchor.setTo(0.5, 0.5);
        
        // Display the score
this.scoreLabel = game.add.text(30, 30, 'score: 0',
{ font: '18px Arial', fill: '#ffffff' });
// Initialise the score variable
this.score = 0;
        
        
        
        game.stage.backgroundColor = '#3498db';
        game.physics.startSystem(Phaser.Physics.ARCADE);    this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
        this.player.anchor.setTo(0.5, 0.5)
        
        game.physics.arcade.enable(this.player);
// Add vertical gravity to the player
this.player.body.gravity.y = 500;
        this.cursor = game.input.keyboard.createCursorKeys();
      this.createWorld();  
    },
    update :function(){
        game.physics.arcade.collide(this.player, this.walls);
           if (!this.player.inWorld) {
this.playerDie();
};
        game.physics.arcade.overlap(this.player, this.coin, this.takeCoin, null, this);
        this.movePlayer();
        
     
    },
    
    
    movePlayer: function() {
// If the left arrow key is pressed
if (this.cursor.left.isDown) {
// Move the player to the left
this.player.body.velocity.x = -200;
}
// If the right arrow key is pressed
else if (this.cursor.right.isDown) {
// Move the player to the right
this.player.body.velocity.x = 200;
}
// If neither the right or left arrow key is pressed
else {
// Stop the player
this.player.body.velocity.x = 0;
}
// If the up arrow key is pressed and the player is touching the ground
if (this.cursor.up.isDown && this.player.body.touching.down) {
// Move the player upward (jump)
this.player.body.velocity.y = -320;
}
},
    createWorld: function() {
// Create our wall group with Arcade physics
this.walls = game.add.group();
this.walls.enableBody = true;
// Create the 10 walls
game.add.sprite(0, 0, 'wallV', 0, this.walls); // Left
game.add.sprite(480, 0, 'wallV', 0, this.walls); // Right
game.add.sprite(0, 0, 'wallH', 0, this.walls); // Top left
game.add.sprite(300, 0, 'wallH', 0, this.walls); // Top right
game.add.sprite(0, 320, 'wallH', 0, this.walls); // Bottom left
game.add.sprite(300, 320, 'wallH', 0, this.walls); // Bottom right
game.add.sprite(-100, 160, 'wallH', 0, this.walls); // Middle left
game.add.sprite(400, 160, 'wallH', 0, this.walls); // Middle right
var middleTop = game.add.sprite(100, 80, 'wallH', 0, this.walls);
middleTop.scale.setTo(1.5, 1);
var middleBottom = game.add.sprite(100, 240, 'wallH', 0, this.walls);
middleBottom.scale.setTo(1.5, 1);
// Set all the walls to be immovable
this.walls.setAll('body.immovable', true);
},
    playerDie: function() {
game.state.start('main');
},
    
    takeCoin: function(player, coin) {
// Kill the coin to make it disappear from the game
// Define 2 random variables
var newX = game.rnd.integerInRange(10, game.world.width - 20);
var newY = game.rnd.integerInRange(10, game.world.height - 20);
// Set the new coin position
this.coin.reset(newX, newY);
        
// Increase the score by 5
this.score += 5;
// Update the score label
this.scoreLabel.text = 'score: ' + this.score;
    }
};


var game=new Phaser.Game(500,340,Phaser.AUTO,'gameDiv');
game.state.add('main',mainState);
game.state.start('main');