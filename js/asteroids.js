var asteroids = function(curGameState){
    var that = {};
    var asteroidList = [];
    var wordAdded = 0;
    var scale = 0.35;
    var generateWordsInstance = generateWords();

    var startingPositions = [
        {
            x:scaleToPixelRatio(200),
            y:scaleToPixelRatio(70),
            vx:scaleToPixelRatio(150),
            vy:scaleToPixelRatio(150)
        },
        {
            x:scaleToPixelRatio(1430),
            y:scaleToPixelRatio(70),
            vx:scaleToPixelRatio(-100),
            vy:scaleToPixelRatio(150)
        },
        {
            x:scaleToPixelRatio(1430),
            y:scaleToPixelRatio(1000),
            vx:scaleToPixelRatio(-150),
            vy:scaleToPixelRatio(-100)
        }
    ];

    /**
     * Create all our words for the first time.
     */
    that.create = function(collisionGroups){
        wordAdded = 0;
        asteroidList = [];
        var words = generateWordsInstance.getGeneric();
        words.forEach(function (word) {
            that.add(word, collisionGroups);
        });
    };

    /**
     * Add bubble word
     *
     * @param game
     * @param posX
     * @param posY
     */
    that.add = function(word, collisionGroups){

        var asteroidObj = {};
        utils.resizePolygon('physicsData', 'physicsData3', 'asteroid', scaleToPixelRatio(scale));

        //  Create our ship sprite
        var asteroid = game.add.sprite(-200, -200, 'asteroid');
        asteroid.scale.set(scaleToPixelRatio(scale));

        game.physics.p2.enable(asteroid);
        console.log(asteroid.body);
        asteroid.body.clearShapes();
        asteroid.body.loadPolygon('physicsData3', 'asteroid');
        asteroid.body.setCollisionGroup(collisionGroups[0]);
        asteroid.body.collides(collisionGroups);

        asteroid.body.velocity.x= startingPositions[wordAdded].vx;
        asteroid.body.velocity.y= startingPositions[wordAdded].vy;

        // Using this to record how many hits on our objects from laser blasts.
        asteroid.body.hits = 0;

        asteroid.lifespan = 1;

        var text = game.add.text(0, 0, word.term);
        text.anchor.setTo(0.5);
        text.font = 'Nunito';
        text.fontSize = 54;
        text.align = 'left';
        text.fill = '#fff';
        text.strokeThickness = 1;
        text.setShadow(-4, 4, 'rgba(0,0,0,0.8)', 0);

        asteroid.addChild(text);

        asteroidObj.text = text;
        asteroidObj.bubble = asteroid;
        wordAdded++;

        asteroidList.push(asteroidObj);
    };


    /**
     * Get asteroid at given index.
     * @param index
     * @returns {*}
     */
    that.get = function(index){
        return asteroidList[index].bubble;
    };

    /**
     * Start a fresh cycle of words.
     */
    that.newCycle = function(){
        wordAdded = 0;
        asteroidList.forEach(function(asteroid){
            console.log(asteroid.bubble);
            asteroid.bubble.body.hits = 0;
            asteroid.bubble.body.x = startingPositions[wordAdded].x;
            asteroid.bubble.body.y = startingPositions[wordAdded].y;
            asteroid.bubble.body.angularVelocity = 0;
            asteroid.bubble.body.rotation = Phaser.Math.degToRad(0);
            asteroid.bubble.body.velocity.x= startingPositions[wordAdded].vx;
            asteroid.bubble.body.velocity.y= startingPositions[wordAdded].vy;
            that.animateIn(asteroid.bubble);
            asteroid.bubble.revive();
            wordAdded++;
        });
    };

    /**
     * Use tweens to give bubbles an interesting entrance.
     * @param asteroid
     */
    that.animateIn = function(asteroid){
        asteroid.scale.x = 0.1;
        asteroid.scale.y = 0.1;
        asteroid.alpha = 1;
        game.add.tween(asteroid.scale).to({ x: scaleToPixelRatio(scale), y:scaleToPixelRatio(scale) }, 800, Phaser.Easing.Back.Out, true, 0);
    };

    /**
     * Use tweens to give bubbles an interesting entrance.
     * @param asteroid
     */
    that.animateOut = function(asteroid){
        asteroid.body.removeNextStep = true;
        game.add.tween(asteroid).to({ alpha: 0 }, 400, Phaser.Easing.Bounce.Out, true, 0);
        game.add.tween(asteroid.scale).to({ x: 0.1, y:0.1 }, 400, Phaser.Easing.Back.Out, true, 0);
    };

    /**
     * End of level remove remaining asteroids
     */
    that.roundOver = function(){
        asteroidList.forEach(function(asteroid){
            that.animateOut(asteroid.bubble);
        });
    };

    /**
     * Position text correctly.
     */
    that.update = function(rocket){
        asteroidList.forEach(function(asteroid){
            if(asteroid.bubble && asteroid.bubble.exists){
                utils.screenWrap(asteroid.bubble.body);
                utils.accelerateToObject(asteroid.bubble, rocket, 400*curGameState.getLevel());
                utils.constrainVelocity(asteroid.bubble, 90);
            }
        });
    };

    /**
     * Show bounding borders for debug
     */
    that.debug = function(){
        asteroidList.forEach(function(asteroid){
            game.debug.body(asteroid);
        });
    };

    return that;
};