var wordBubbles = function(gameStateInst){
    var that = {};
    var bubbles = [];
    var generateWordsInstance = generateWords();
    var wordScale = 0.35;
    var wordAdded = 0;

    var startingPositions = [
        {
            x:scaleToPixelRatio(100),
            y:scaleToPixelRatio(100),
            vx:scaleToPixelRatio(100),
            vy:scaleToPixelRatio(100)
        },
        {
            x:scaleToPixelRatio(1530),
            y:scaleToPixelRatio(70),
            vx:scaleToPixelRatio(-100),
            vy:scaleToPixelRatio(100)
        },
        {
            x:scaleToPixelRatio(1530),
            y:scaleToPixelRatio(1000),
            vx:scaleToPixelRatio(-100),
            vy:scaleToPixelRatio(-100)
        }
    ];

    /**
     * Create all our words for the first time.
     */
    that.create = function(collisionGroups){
        wordAdded = 0;
        bubbles = [];
        var words = generateWordsInstance.get(1);
        words.forEach(function (word) {
            that.add(word, collisionGroups);
        });
    };

    /**
     * Add word bubbles
     * @param word
     * @param collisionGroups
     */
    that.add = function(word, collisionGroups){
        var wordBubble = {};

        utils.resizePolygon('physicsData', 'physicsData2', 'Star', scaleToPixelRatio(wordScale));
        //  Create our ship sprite
        var bubble = game.add.sprite(-100, -100, 'bubble');
        bubble.scale.set(wordScale);

        game.physics.p2.enable(bubble);
        bubble.body.clearShapes();
        bubble.body.loadPolygon('physicsData2', 'Star');
        bubble.body.setCollisionGroup(collisionGroups[0]);
        bubble.body.collides(collisionGroups);

        // Using this to record how many hits on our objects from laser blasts.
        bubble.body.hits = 0;
        bubble.kill();

        var text = game.add.text(0, 24, word.term);
        text.anchor.setTo(0.5);
        text.font = 'Nunito';
        text.fontSize = 52;
        text.align = 'left';
        text.fill = '#222';
        text.rotation = Phaser.Math.degToRad(-45);
        text.strokeThickness = 1;

        bubble.addChild(text);

        bubble.wordRef = text;
        //wordBubble.text = text;
        wordBubble.bubble = bubble;

        wordAdded++;

        bubbles.push(wordBubble);
    };

    /**
     * Start a fresh cycle of words.
     */
    that.newCycle = function(){
        wordAdded = 0;
        var words = generateWordsInstance.get(gameStateInst.getLevel());
        bubbles.forEach(function(bubble, index){
            bubble.bubble.wordRef.text = words[index].term;
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
     * Set a bubble for removal.
     * @param bubble
     */
    that.removeBubble = function(bubble, callback){
        bubble.removeNextStep = true;
        game.add.tween(bubble.sprite).to({ alpha: 0 }, 800, Phaser.Easing.Bounce.InOut, true, 0);
        var tween2 = game.add.tween(bubble.sprite.scale).to({ x: 0.0, y:0.0 }, 800, Phaser.Easing.Back.InOut, true, 0);
        tween2.onComplete.add(function(){
            callback();
        }, this);
    };

    /**
     * Use tweens to give bubbles an interesting entrance.
     * @param bubble
     */
    that.animateIn = function(bubble){
        bubble.scale.x = 0.1;
        bubble.scale.y = 0.1;
        bubble.alpha = 1;
        game.add.tween(bubble.scale).to({ x: scaleToPixelRatio(wordScale), y:scaleToPixelRatio(wordScale) }, 800, Phaser.Easing.Back.Out, true, 0);
    };

    /**
     * Position text correctly.
     */
    that.update = function(){
        bubbles.forEach(function(bubble){
            if(bubble.bubble && bubble.bubble.exists){
                utils.screenWrap(bubble.bubble.body);
                utils.constrainVelocity(bubble.bubble, 75);
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