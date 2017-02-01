var Main = function (game) {
    var that = {};
    var cursors;
    var bullets;
    var rocket;
    var bullet;
    var bulletTime = 0;
    var gameStateInstance = gameState(that);
    var wordBubblesInstance = wordBubbles(gameStateInstance);
    var asteroidsInstance = asteroids(gameStateInstance);
    var starField;
    var tooCloseCount = 0;
    var requiredHits = 4;
    var blaster, thrusters, bonus, bang;

    that.userInput;

    function fireBullet() {
        if (game.time.now > bulletTime) {
            blaster.play();
            bullet = bullets.getFirstExists(false);
            var rocketRadius = rocket.height / 2 + scaleToPixelRatio(15);
            if (bullet) {
                bullet.showEndSummary(rocket.x + rocketRadius * Math.cos(rocket.rotation - Phaser.Math.degToRad(90)),
                    rocket.y + rocketRadius * Math.sin(rocket.rotation - Phaser.Math.degToRad(90)));
                bullet.lifespan = 1000;
                bullet.body.velocity.x = rocket.body.velocity.x;
                bullet.body.velocity.y = rocket.body.velocity.y;
                bullet.body.rotation = rocket.rotation;
                bullet.body.thrust(scaleToPixelRatio(7000));
                bulletTime = game.time.now + 50;
            }
        }
    }

    /**
     * The user search terms etc.
     * @param data
     */
    that.init = function(data){
        that.userInput = data;
    };

    that.create = function () {

        starField = game.add.tileSprite(0, 0, game.width, game.height, 'atlas', 'space0000');

        // Setting the frame rate should improve performance but due to bug: https://github.com/photonstorm/phaser/issues/2801
        // it is causing flickering images.
        // Frame rate also appears to effect p2 physics so removing this double the forces all round.
        game.time.desiredFps = 30;

        //  Enable P2
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.camera.roundPx = false;

        //  Turn on impact events for the world, without this we get no collision callbacks
        game.physics.p2.setImpactEvents(true);
        game.physics.p2.restitution = 0.7;
        //game.physics.p2.useElapsedTime = true;

        // Set up our collision groups.
        var bulletCollisionGroup = game.physics.p2.createCollisionGroup();
        var wordCollisionGroup = game.physics.p2.createCollisionGroup();
        var shipCollisionGroup = game.physics.p2.createCollisionGroup();
        var asteroidCollisionGroup = game.physics.p2.createCollisionGroup();

        //  Create our ship sprite
        rocket = game.add.sprite(scaleToPixelRatio(800), scaleToPixelRatio(600), 'atlas', 'rocket0000');
        //rocket = game.add.sprite(scaleToPixelRatio(200), scaleToPixelRatio(60), 'atlas', 'rocket0000');
        rocket.scale.set(scaleToPixelRatio(0.5));
        game.physics.p2.enable(rocket);
        rocket.body.mass = 0.5;
        rocket.body.setCollisionGroup(shipCollisionGroup);
        rocket.body.collides([wordCollisionGroup, asteroidCollisionGroup], hitRocket);

        gameStateInstance.create();

        wordBubblesInstance.create([wordCollisionGroup, asteroidCollisionGroup, bulletCollisionGroup, shipCollisionGroup], that.userInput);
        asteroidsInstance.create([asteroidCollisionGroup, wordCollisionGroup, bulletCollisionGroup, shipCollisionGroup]);

        // Add our game bullets
        bullets = game.add.group();
        for (var i = 0; i < 10; i++) {
            var bullet = bullets.create(0, 0, 'atlas', 'bullet0000');
            bullet.scale.set(scaleToPixelRatio(0.5));
            game.physics.p2.enable(bullet);
            bullet.body.mass = 0.1;
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
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.ESC]);

        gameStateInstance.showStartMessages();

        //explosion = game.add.audio('explosion');
        //sword = game.add.audio('sword');
        blaster = game.add.audio('blaster');
        blaster.allowMultiple = true;
        bang = game.add.audio('bang');
        bang.allowMultiple = true;
        bang.volume = 0.15;
        thrusters = game.add.audio('thrusters');
        bonus = game.add.audio('bonus');

        thrusters.play('', 0, 0.05, true);

        //  Being mp3 files these take time to decode, so we can't play them instantly
        //  Using setDecodedCallback we can be notified when they're ALL ready for use.
        //  The audio files could decode in ANY order, we can never be sure which it'll be.

        //game.sound.setDecodedCallback([ blaster ], start, this);
    };

    /**
     * Start the lastest round.
     */
    function startLevel(){

        if(gameStateInstance.gameComplete()){
            that.gameOver();
            return;
        }

        gameStateInstance.startLevel();

    }

    /**
     * Add the roids and words for the start of the next level
     */
    that.startLevel = function(){
        game.time.events.add(2000, function(){
            asteroidsInstance.newCycle();
        }, this);

        game.time.events.add(3200, function(){
            wordBubblesInstance.newCycle();
        }, this);
    };

    /**
     * End the current level
     */
    that.endLevel = function(){
        asteroidsInstance.roundOver();
        wordBubblesInstance.roundOver();
    };

    function hitWord(body1, body2){
        body1.sprite.lifespan = 1;
        if(body2.sprite.frameName === 'star0000') {
            body2.hits++;
            if (body2.hits === requiredHits) {
                gameStateInstance.wordCollected(body2.sprite.wordRef.text);
                bonus.play();
                wordBubblesInstance.removeBubble(body2, function(){
                    gameStateInstance.checkLevelOver();
                });
            }
        }
    }

    /**
     * Check if the rockey is less than 15 pixels away 10 times in a row if it is move it
     * @param body1
     * @param body2
     */
    function hitRocket(body1, body2){
        if(body2.sprite.frameName === 'rock0000'){
            gameStateInstance.registerRocketHit();
            bang.play();
            var distance = game.math.distance(body1.x, body1.y, body2.x, body2.y);
            if(distance < 75){
                tooCloseCount++;
            }else{
                tooCloseCount = 0;
            }
            if(tooCloseCount === 6){
                body1.x = body1.x+110;
                body1.y = body1.y+110;
            }
        }
    }

    that.update = function () {

        //Respond to user input
        if (cursors.left.isDown) {
            rocket.body.rotateLeft(scaleToPixelRatio(100));
        } else if (cursors.right.isDown) {
            rocket.body.rotateRight(scaleToPixelRatio(100));
        } else {
            rocket.body.setZeroRotation();
        }

        if (cursors.up.isDown) {
            rocket.body.thrust(scaleToPixelRatio(1900));
            if(thrusters.volume !== 1) {
                rocket.frameName = 'rocket0001';
                thrusters.volume = 1;
            }
        } else if (cursors.down.isDown) {
            rocket.body.reverse(scaleToPixelRatio(40));
        }

        if(cursors.up.isUp){
            rocket.frameName = 'rocket0000';
            thrusters.volume = 0.05;
        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            if(gameStateInstance.currentState() === 'showSummary'){
                gameStateInstance.endSummary();
            }else{
                fireBullet();
            }
        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
            that.restart();
        }

        wordBubblesInstance.update();
        asteroidsInstance.update(rocket);
        utils.constrainVelocity(rocket,55);
        utils.screenWrap(rocket.body);
        gameStateInstance.updateTime();
    };

    that.postUpdate = function () {

    };

    that.gameOver = function () {
        game.time.events.add(2000, function(){
            game.state.start('FinalScore', true, false, {
                score:gameStateInstance.getScore(),
                words:gameStateInstance.getWordsCollection(),
                email:that.userInput.email,
                subject:that.userInput.subject
            });
            gameStateInstance.reset();
        });
    };

    that.render = function(){
        //game.debug.text(game.time.fps, 2, 24, "#00ff00");
    };

    that.restart = function () {
        gameStateInstance.reset();
        game.state.start('Menu');
    };

    that.shutdown = function(){
        thrusters.destroy();
        bonus.destroy();
        blaster.destroy();
    };

    return that;
};