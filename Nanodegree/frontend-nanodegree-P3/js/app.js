// Enemies our player must avoid
var Enemy = function(startX, startY, speed, sprite) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = startX;
    this.y = startY;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = sprite;
    //TODO: create an array of enemies sprites and function to randomize
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype = {
    update: function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
        this.x += this.speed * dt;
        if (this.x > ctx.canvas.width) {
            // Move the enemy to its start position and randomize its speed and sprite
            this.x = -60;
            this.speed = 65*Math.floor(Math.random() * 5 + 1);
            this.sprite = this.selectSprite();
        }
        this.checkCollisions();
    },

    //Function to detect collisions with player
    checkCollisions: function() {
        var enemyLeftX = this.x - 60;
        var enemyRightX = this.x + 60;
        var enemyTopY = this.y;
        var enemyBottomY = this.y + 120;

            if (player.x > enemyLeftX && player.x < enemyRightX && player.y > enemyTopY && player.y < enemyBottomY) {
                player.resetPosition();
            }

    },
    // Draw the enemy on the screen, required method for game
    render: function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    },

    //Function to randomize enemy's picture
    selectSprite: function () {
        var pic;
        var modifier = Math.random()*100;
        if (modifier >= 0 && modifier < 25) {
            pic = 'images/char-boy.png';
        }
        if (modifier >= 25 && modifier < 50) {
            pic = 'images/char-cat-girl.png';
        }
        if (modifier >= 50 && modifier < 75) {
            pic = 'images/char-horn-girl.png';
        }
        if (modifier >= 75 && modifier < 100) {
            pic = 'images/char-pink-girl.png';
        }
        return pic;
    }


};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var startX = 205;
var startY = 460;

var Player = function (x, y, dt){
    this.x = startX;
    this.y = startY;
    this.sprite = 'images/enemy-bug_right.png';
    this.keyStatus = false;
    this.status = 'stop';
    this.wallChecker = false;
};

Player.prototype = {
        update: function(dt) {
           this.move(dt);
           this.changeSprite(); 
        },
        //Asset status while given key is pressed
        handleInput: function (key) {
            switch (key) {
                case ('left'):
                    this.status = "moveLeft";
                    break;
                case ('right'):
                    this.status = "moveRight";
                    break;
                case ('up'):
                    this.status = "moveTop";
                    break;
                case ('down'):
                    this.status = "moveBottom";
                    break;
                default: 
                    this.status = "stop";
            }
        },

        //Move player inside canvas boundaries to the given direction
        move: function (dt) {
            if (this.status === "moveLeft" && this.x > 0) {
                this.x -= dt * 160;
            }
            if (this.status === "moveRight" && this.x < ctx.canvas.width - 100) {
                this.x += dt * 160;
            }
            if (this.status === "moveTop" && this.y > 52) {
                this.y -= dt * 130;
            }
            if (this.status === "moveBottom" && this.y < ctx.canvas.height - 100) {
                this.y += dt * 130;
            }  
        
        },

        //Change player image while changing movement direction
        changeSprite: function () {
            if (this.status === "moveLeft") {
                this.sprite = 'images/enemy-bug_left.png';
            }
            if (this.status === "moveRight") {
                this.sprite = 'images/enemy-bug_right.png';
            }
            if (this.status === "moveTop") {
                this.sprite = 'images/enemy-bug_top.png';
            }
            if (this.status === "moveBottom") {
                this.sprite = 'images/enemy-bug_bottom.png';
            }
        },

        //Move player back to its initial position after collision with enemy
        resetPosition: function () {
            this.x = startX;
            this.y = startY;
            this.sprite = 'images/enemy-bug_right.png';
        },

        // Draw the player on the screen,
        render: function () {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        },

};

var Stone = function (x,y) {
    this.x = x;
    this.y = y;
    this.stoneLeftX = this.x - 80;
    this.stoneRightX = this.x + 80;
    this.stoneTopY = this.y - 80;
    this.stoneBottomY = this.y + 80;
    this.sprite = 'images/Rock.png';
};

Stone.prototype = {
    update: function(dt) {

    },


    render: function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

var allStones = [new Stone (300, 400), new Stone (100, 60)];

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(0, 60, 290, Enemy.prototype.selectSprite()),
                  new Enemy(0, 140, 200, Enemy.prototype.selectSprite()),
                  new Enemy(0, 230, 400, Enemy.prototype.selectSprite()),
                  new Enemy(0, 320, 320, Enemy.prototype.selectSprite())];
player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'stand',
        38: 'stand',
        39: 'stand',
        40: 'stand'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});