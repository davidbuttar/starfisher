var Main = function (game) {
    var that = {};
    var cursors;
    var bullets;
    var rocket;
    var bulletTime = 0;
    var wordBubblesInstance = wordBubbles();

    function fireBullet() {
        if (game.time.now > bulletTime) {
            bullet = bullets.getFirstExists(false);

            if (bullet) {
                var radius = 90;
                var newX = shipManagerInstance.active().x + radius * Math.cos(shipManagerInstance.active().rotation);
                var newY = shipManagerInstance.active().y + radius * Math.sin(shipManagerInstance.active().rotation);
                bullet.reset(newX, newY);
                bullet.lifespan = 2000;
                bullet.rotation = shipManagerInstance.active().rotation;
                game.physics.arcade.velocityFromRotation(shipManagerInstance.active().rotation, 800, bullet.body.velocity);
                bulletTime = game.time.now + 50;
            }
        }

    }

    function screenWrap(sprite) {
        if (sprite.x < 0) {
            sprite.x = game.width;
        }
        else if (sprite.x > game.width) {
            sprite.x = 0;
        }

        if (sprite.y < 0) {
            sprite.y = game.height;
        }
        else if (sprite.y > game.height) {
            sprite.y = 0;
        }
    }


    that.create = function () {

        function resizePolygon(originalPhysicsKey, newPhysicsKey, shapeKey, scale) {
            var newData = [];
            game.cache._cache.physics[originalPhysicsKey].data[shapeKey].forEach(function (shapes) {
                var shapeArray = [];
                shapes.shape.forEach(function (values) {
                    shapeArray.push(values * scale);
                });
                newData.push({shape: shapeArray});

            });
            var item = {};
            item[shapeKey] = newData;
            game.load.physics(newPhysicsKey, '', item);
        }


        resizePolygon('physicsData', 'physicsData2', 'Star', scaleToPixelRatio(0.1));

        //  A spacey background
        //game.add.tileSprite(0, 0, game.width, game.height, 'space');

        game.stage.backgroundColor = '#ffffff';

        //  Enable P2
        game.physics.startSystem(Phaser.Physics.P2JS);

        //  Turn on impact events for the world, without this we get no collision callbacks
        game.physics.p2.setImpactEvents(true);

        game.physics.p2.restitution = 0.8;

        //  Create our ship sprite
        rocket = game.add.sprite(scaleToPixelRatio(80), scaleToPixelRatio(540), 'rocket');
        rocket.scale.set(scaleToPixelRatio(0.1));
        game.physics.p2.enable(rocket);

        //  Check for the block hitting another object
        rocket.body.onBeginContact.add(blockHit, this);


        //  This will run in Canvas mode, so let's gain a little speed and display
        game.renderer.clearBeforeRender = false;
        game.renderer.roundPixels = true;

        //  Game input
        cursors = game.input.keyboard.createCursorKeys();
        //game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

    };

    function blockHit (body, bodyB, shapeA, shapeB, equation) {

        //  The block hit something.
        //
        //  This callback is sent 5 arguments:
        //
        //  The Phaser.Physics.P2.Body it is in contact with. *This might be null* if the Body was created directly in the p2 world.
        //  The p2.Body this Body is in contact with.
        //  The Shape from this body that caused the contact.
        //  The Shape from the contact body.
        //  The Contact Equation data array.
        //
        //  The first argument may be null or not have a sprite property, such as when you hit the world bounds.
        if (body) {
            console.log('You last hit: ' + body.sprite.key);
            body.sprite.lifespan = 300;
        }
        else
        {
            console.log('You last hit: The wall :)');
        }

    }

    that.update = function () {
        //wordBubblesInstance.update();

        //bubble.body.setZeroVelocity();

        if (cursors.left.isDown) {rocket.body.rotateLeft(scaleToPixelRatio(60));}   //ship movement
        else if (cursors.right.isDown){rocket.body.rotateRight(scaleToPixelRatio(60));}
        else {rocket.body.setZeroRotation();}
        if (cursors.up.isDown){rocket.body.thrust(scaleToPixelRatio(2000));}
        else if (cursors.down.isDown){rocket.body.reverse(scaleToPixelRatio(400));}

        //wordBubblesInstance.update();
        wordBubblesInstance.update();
    };

    that.postUpdate = function () {

    };

    that.preRender = function () {
        //wordBubblesInstance.update();
    };

    that.render = function () {
        //wordBubblesInstance.debug();
    };

    that.gameOver = function () {
        this.game.state.start('GameOver');
    };

    return that;
};