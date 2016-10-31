var asteroids = function(){
    var that = {};
    var bubbles = [];
    var wordAdded = 0;
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
        var words = generateWordsInstance.get();
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

        var wordBubble = {};
        utils.resizePolygon('physicsData', 'physicsData3', 'asteroid', scaleToPixelRatio(0.3));

        //  Create our ship sprite
        var bubble = game.add.sprite(-200, -200, 'asteroid');
        bubble.scale.set(scaleToPixelRatio(0.3));

        game.physics.p2.enable(bubble);
        bubble.body.clearShapes();
        bubble.body.loadPolygon('physicsData3', 'asteroid');
        bubble.body.setCollisionGroup(collisionGroups[0]);
        bubble.body.collides(collisionGroups);

        bubble.body.velocity.x= startingPositions[wordAdded].vx;
        bubble.body.velocity.y= startingPositions[wordAdded].vy;

        // Using this to record how many hits on our objects from laser blasts.
        bubble.body.hits = 0;

        bubble.lifespan = 1;

        var text = game.add.text(0, 0, word.term);
        text.anchor.setTo(0.5);
        text.font = 'Nunito';
        text.fontSize = 54;
        text.align = 'left';
        text.fill = '#fff';
        text.strokeThickness = 1;
        text.setShadow(-4, 4, 'rgba(0,0,0,0.4)', 0);

        bubble.addChild(text);

        wordBubble.text = text;
        wordBubble.bubble = bubble;
        wordAdded++;

        bubbles.push(wordBubble);
    };


    /**
     * Get asteroid at given index.
     * @param index
     * @returns {*}
     */
    that.get = function(index){
        return bubbles[index].bubble;
    };

    /**
     * Start a fresh cycle of words.
     */
    that.newCycle = function(){
        wordAdded = 0;
        bubbles.forEach(function(bubble){
            bubble.bubble.body.hits = 0;
            bubble.bubble.body.x = startingPositions[wordAdded].x;
            bubble.bubble.body.y = startingPositions[wordAdded].y;
            bubble.bubble.body.angularVelocity = 0;
            bubble.bubble.body.rotation = Phaser.Math.degToRad(0);
            bubble.bubble.body.velocity.x= startingPositions[wordAdded].vx;
            bubble.bubble.body.velocity.y= startingPositions[wordAdded].vy;
            that.animateIn(bubble.bubble);
            bubble.bubble.revive();
            wordAdded++;
        });
    };

    /**
     * Use tweens to give bubbles an interesting entrance.
     * @param bubble
     */
    that.animateIn = function(bubble){
        bubble.scale.x = 0.1;
        bubble.scale.y = 0.1;
        bubble.alpha = 1;
        game.add.tween(bubble.scale).to({ x: 0.3, y:0.3 }, 800, Phaser.Easing.Back.Out, true, 0);
    };

    /**
     * Use tweens to give bubbles an interesting entrance.
     * @param bubble
     */
    that.animateOut = function(bubble){
        bubble.body.removeNextStep = true;
        game.add.tween(bubble).to({ alpha: 0 }, 400, Phaser.Easing.Bounce.Out, true, 0);
        game.add.tween(bubble.scale).to({ x: 0.1, y:0.1 }, 400, Phaser.Easing.Back.Out, true, 0);
    };

    /**
     * End of level remove remaining asteroids
     */
    that.roundOver = function(){
        bubbles.forEach(function(bubble){
            that.animateOut(bubble.bubble);
        });
    };

    /**
     * Position text correctly.
     */
    that.update = function(rocket, level){
        console.log(level);
        bubbles.forEach(function(bubble){
            if(bubble.bubble && bubble.bubble.exists){
                utils.screenWrap(bubble.bubble.body);
                utils.accelerateToObject(bubble.bubble, rocket, 400*level);
                utils.constrainVelocity(bubble.bubble, 90);
            }
        });
    };

    /**
     * Show bounding borders for debug
     */
    that.debug = function(){
        bubbles.forEach(function(bubble){
            game.debug.body(bubble);
        });
    };

    return that;
};