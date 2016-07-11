// Enemies our player must avoid
var Enemy = function(startX, startY, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = startX;
    this.y = startY;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = Enemy.prototype.selectSprite ();
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
    this.status = 'stop';
    this.level = 1;
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
            this.level = 1;
            key.status = "onground";
        },

        // Draw the player on the screen,
        render: function () {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
            ctx.font = "40px Arial Black";
            ctx.fillStyle = "white";
            ctx.fillText("Level " + this.level, 30, 105);
            ctx.strokeStyle = "black";
            ctx.strokeText("Level " + this.level, 30, 105);
        },

};

var Stone = function (y) {
    this.x = 101*(Math.floor(Math.random()*7));
    this.y = y;
    this.sprite = 'images/Rock.png';
};

Stone.prototype = {
    update: function(dt) {
        this.checkCollisions();
    },

    checkCollisions: function () {
        var stoneLeftX = this.x - 90;
        var stoneRightX = this.x + 90;
        var stoneTopY = this.y;
        var stoneBottomY = this.y + 140;
        if (player.x > stoneLeftX && player.x < stoneRightX &&
            player.y > stoneTopY && player.y < stoneBottomY) {
            switch (player.status) {
                case ('moveLeft'):
                    player.status = 'stop';
                    if (Math.abs (player.x - stoneRightX) < Math.abs (player.x - stoneLeftX)) {
                        player.x = stoneRightX;
                    }
                    else {
                        player.x = stoneLeftX;
                    }
                    break;
                case ('moveRight'):
                    player.status = 'stop';
                    if (Math.abs (player.x - stoneLeftX) < Math.abs (player.x - stoneRightX)) {
                        player.x = stoneLeftX;
                    }
                    else {
                        player.x = stoneRightX;
                    }
                    break;
                 case ('moveTop'):
                    player.status = 'stop';
                    if (Math.abs (player.y - stoneBottomY) < Math.abs (player.y - stoneTopY)) {
                        player.y = stoneBottomY;
                    }
                    else {
                        player.y = stoneTopY;
                    }
                    break;
                case ('moveBottom'):
                    player.status = 'stop';
                    if (Math.abs (player.y - stoneTopY) < Math.abs (player.y - stoneBottomY)) {
                        player.y = stoneTopY;
                    }
                    else {
                        player.y = stoneBottomY;
                    }
                    break;                
            }
        }
    },

    render: function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

var Key = function(y) {
    this.x = 101*(Math.floor(Math.random()*5) + 1);
    this.y = y;
    this.sprite = 'images/Key.png';
    this.width = 20;
    this.height = 50;
    this.status = "onground";
    this.renderStatus = "yes";
};

Key.prototype = {
    update: function(dt) {
        this.checkStatus();
        this.checkCollisions();
    },

    checkStatus: function() {
        if (this.status === "picked") {
            this.renderStatus = "no";
        } 
        else if (this.status === "onground") {
            this.renderStatus = "yes";
        }
    },

    checkCollisions: function () {
        var keyLeftX = this.x - 60;
        var keyRightX = this.x + 60;
        var keyTopY = this.y;
        var keyBottomY = this.y + 120;
        if (player.x > keyLeftX && player.x < keyRightX &&
            player.y > keyTopY && player.y < keyBottomY) {
            this.status = 'picked';
        }
    },

    render: function() {
        if (this.renderStatus === "yes") {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        }
    }
};

var Door = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/Selector.png';
};

Door.prototype = {
    update: function (dt) {
        this.checkCollisions();
    },

    checkCollisions: function () {
        var doorLeftX = this.x - 60;
        var doorRightX = this.x + 60;
        var doorTopY = this.y - 20;
        var doorBottomY = this.y + 120;
        if (key.status === 'picked' && player.x > doorLeftX && player.x < doorRightX &&
            player.y > doorTopY && player.y < doorBottomY) {
            key.status = 'onground';
            player.resetPosition();
            player.level += 1;
        }
    },

    render: function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

};




// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(0, 60, 290),
                  new Enemy(0, 140, 200),
                  new Enemy(0, 230, 400),
                  new Enemy(0, 320, 320)];
player = new Player();
var allStones = [new Stone (60), new Stone (230), new Stone (310)];
var key = new Key (140);
var door = new Door (505, 50);

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




