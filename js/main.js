var Main = function (game) {
    var that = {};
    var cursors;
    var bullets;
    var rocket;
    var bullet;
    var bulletTime = 0;
    var wordBubblesInstance = wordBubbles();
    var asteroidsInstance = asteroids();
    var gameStateInstance = gameState();
    var starField;

    function fireBullet() {
        if (game.time.now > bulletTime) {
            bullet = bullets.getFirstExists(false);
            var rocketRadius = rocket.height / 2 + scaleToPixelRatio(15);
            if (bullet) {
                bullet.reset(rocket.x + rocketRadius * Math.cos(rocket.rotation - Phaser.Math.degToRad(90)),
                    rocket.y + rocketRadius * Math.sin(rocket.rotation - Phaser.Math.degToRad(90)));
                bullet.lifespan = 1000;
                bullet.body.rotation = rocket.rotation;
                bullet.body.thrust(scaleToPixelRatio(80000));
                bulletTime = game.time.now + 50;
            }
        }
    }

    that.create = function () {
        utils.resizePolygon('physicsData', 'physicsData2', 'Star', scaleToPixelRatio(0.1));

        starField = game.add.tileSprite(0, 0, game.width, game.height, 'space');

        game.time.desiredFps = 30;

        //  Enable P2
        game.physics.startSystem(Phaser.Physics.P2JS);

        //  Turn on impact events for the world, without this we get no collision callbacks
        game.physics.p2.setImpactEvents(true);
        game.physics.p2.restitution = 0.7;

        // Set up our collision groups.
        var bulletCollisionGroup = game.physics.p2.createCollisionGroup();
        var wordCollisionGroup = game.physics.p2.createCollisionGroup();
        var shipCollisionGroup = game.physics.p2.createCollisionGroup();
        var asteroidCollisionGroup = game.physics.p2.createCollisionGroup();

        //  Create our ship sprite
        rocket = game.add.sprite(scaleToPixelRatio(800), scaleToPixelRatio(540), 'rocket');
        rocket.scale.set(scaleToPixelRatio(0.5));
        game.physics.p2.enable(rocket);
        rocket.body.setCollisionGroup(shipCollisionGroup);
        rocket.body.collides([wordCollisionGroup, asteroidCollisionGroup]);

        gameStateInstance.create();

        wordBubblesInstance.create([wordCollisionGroup, asteroidCollisionGroup, bulletCollisionGroup, shipCollisionGroup]);
        asteroidsInstance.create([asteroidCollisionGroup, wordCollisionGroup, bulletCollisionGroup, shipCollisionGroup]);

        // Add our game bullets
        bullets = game.add.group();
        for (var i = 0; i < 10; i++) {
            var bullet = bullets.create(0, 0, 'bullet');
            bullet.scale.set(scaleToPixelRatio(0.5));
            game.physics.p2.enable(bullet,false);
            bullet.body.setCollisionGroup(bulletCollisionGroup);
            bullet.body.collides([wordCollisionGroup, asteroidCollisionGroup], hitWord);
            bullet.kill();
        }

        //  This will run in Canvas mode, so let's gain a little speed and display
        game.renderer.clearBeforeRender = false;
        game.renderer.roundPixels = true;

        //  Game input
        cursors = game.input.keyboard.createCursorKeys();
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

        nextRound();

    };

    /**
     * Start the lastest round.
     */
    function nextRound(){
        gameStateInstance.nextRound();

        game.time.events.add(3500, function(){
            asteroidsInstance.newCycle();
        }, this);

        game.time.events.add(3000, function(){
            wordBubblesInstance.newCycle();
        }, this);
    }

    function hitWord(body1, body2){
        body1.sprite.lifespan = 1;
        if(body2.sprite.key === 'bubble') {
            body2.hits++;
            if (body2.hits === 6) {
                body2.sprite.lifespan = 300;
                //wordBubblesInstance.wordCollected(body2);
                gameStateInstance.wordCollected();
            }
        }
        if(gameStateInstance.roundOver()){
            asteroidsInstance.roundOver();
            nextRound();
        }
    }

    that.update = function () {

        //Respond to user input
        if (cursors.left.isDown) {
            rocket.body.rotateLeft(scaleToPixelRatio(90));
        } else if (cursors.right.isDown) {
            rocket.body.rotateRight(scaleToPixelRatio(90));
        } else {
            rocket.body.setZeroRotation();
        }

        if (cursors.up.isDown) {
            rocket.body.thrust(scaleToPixelRatio(2000));
        } else if (cursors.down.isDown) {
            rocket.body.reverse(scaleToPixelRatio(400));
        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            fireBullet();
        }

        wordBubblesInstance.update();
        asteroidsInstance.update(rocket);

        utils.constrainVelocity(rocket,85);

        utils.screenWrap(rocket.body);

    };

    that.postUpdate = function () {

    };

    that.gameOver = function () {
        this.game.state.start('GameOver');
    };

    that.render = function(){
        game.debug.text(game.time.fps, 2, 24, "#00ff00");
    };

    return that;
};