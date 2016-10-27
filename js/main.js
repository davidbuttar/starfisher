var Main = function (game) {
    var that = {};
    var cursors;
    var bullets;
    var rocket;
    var bullet;
    var bulletTime = 0;
    var wordBubblesInstance = wordBubbles();
    var starfield, starField2;

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

        starfield = game.add.tileSprite(0, 0, game.width, game.height, 'space');
        starField2 = game.add.tileSprite(0, 0, game.width, game.height, 'space2');


        //  Enable P2
        game.physics.startSystem(Phaser.Physics.P2JS);

        //  Turn on impact events for the world, without this we get no collision callbacks
        game.physics.p2.setImpactEvents(true);
        game.physics.p2.restitution = 0.7;

        // Set up our collision groups.
        var bulletCollisionGroup = game.physics.p2.createCollisionGroup();
        var wordCollisionGroup = game.physics.p2.createCollisionGroup();

        //  Create our ship sprite
        rocket = game.add.sprite(scaleToPixelRatio(800), scaleToPixelRatio(540), 'rocket');
        rocket.scale.set(scaleToPixelRatio(0.1));
        game.physics.p2.enable(rocket);

        wordBubblesInstance.create([wordCollisionGroup, bulletCollisionGroup]);

        // Add our game bullets
        bullets = game.add.group();
        for (var i = 0; i < 10; i++) {
            var bullet = bullets.create(0, 0, 'bullet');
            bullet.scale.set(scaleToPixelRatio(0.5));
            game.physics.p2.enable(bullet,false);
            //  Tell the panda to use the pandaCollisionGroup
            bullet.body.setCollisionGroup(bulletCollisionGroup);
            bullet.body.collides(wordCollisionGroup, hitWord);
            bullet.kill();
        }

        //  Check for the block hitting another object
        //rocket.body.onBeginContact.add(blockHit, this);

        //  This will run in Canvas mode, so let's gain a little speed and display
        game.renderer.clearBeforeRender = false;
        game.renderer.roundPixels = true;

        //  Game input
        cursors = game.input.keyboard.createCursorKeys();
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

    };

    function hitWord(body1, body2){
        body1.sprite.lifespan = 1;
        body2.hits++;
        if(body2.hits === 6) {
            body2.sprite.lifespan = 300;
            wordBubblesInstance.wordCollected(body2);
        }
    }

    function blockHit (body, bodyB, shapeA, shapeB, equation) {
        if (body) {
            console.log('You last hit: ' + body.sprite.key);
            if(!body.hit) {
                body.sprite.lifespan = 300;
                wordBubblesInstance.wordCollected(body);
            }
        }

    }

    that.update = function () {
        //wordBubblesInstance.update();

        //bubble.body.setZeroVelocity();
        starfield.tilePosition.y += 0.1;
        starfield.tilePosition.x += 0.1;
        starField2.tilePosition.x -= 0.2;
        starField2.tilePosition.y -= 0.02;

        if (cursors.left.isDown) {rocket.body.rotateLeft(scaleToPixelRatio(60));}   //ship movement
        else if (cursors.right.isDown){rocket.body.rotateRight(scaleToPixelRatio(60));}
        else {rocket.body.setZeroRotation();}
        if (cursors.up.isDown){rocket.body.thrust(scaleToPixelRatio(2000));}
        else if (cursors.down.isDown){rocket.body.reverse(scaleToPixelRatio(400));}

        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
        {
            fireBullet();
        }

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