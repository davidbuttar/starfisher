var wordBubbles = function(gameStateInst){
    var that = {};
    var bubbles = [];
    var generateWordsInstance = generateWords();
    var wordAdded = 0;
    var words;
    var lastIndex = 0;
    var reviveTimer = [];
    var userInput;

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
            y:scaleToPixelRatio(880),
            vx:scaleToPixelRatio(-100),
            vy:scaleToPixelRatio(-100)
        },
        {
            x:scaleToPixelRatio(100),
            y:scaleToPixelRatio(880),
            vx:scaleToPixelRatio(100),
            vy:scaleToPixelRatio(-100)
        }
    ];

    var scales ={
        'bucket1':0.8,
        'bucket2':0.9,
        'bucket3':1
    };

    /**
     * Create all our words for the first time.
     */
    that.create = function(collisionGroups, inUserInput){
        utils.resizePolygon('physicsData', 'physicsData1', 'Star', scales.bucket1);
        utils.resizePolygon('physicsData', 'physicsData2', 'Star', scales.bucket2);
        utils.resizePolygon('physicsData', 'physicsData3', 'Star', scales.bucket3);
        wordAdded = 0;
        bubbles = [];
        userInput = inUserInput;
        var words = generateWordsInstance.get(1, userInput.subject);
        for(var i = 0; i<8; i++) {
            that.add(words[i], collisionGroups);
        }
    };

    /**
     * Add word bubbles
     * @param word
     * @param collisionGroups
     */
    that.add = function(word, collisionGroups){
        var wordBubble = {};

        //  Create our ship sprite
        var bubble = game.add.sprite(-100, -100, 'atlas', 'star0000');
        bubble.scale.set(scales['bucket'+word.bucket]);

        game.physics.p2.enable(bubble);
        bubble.body.clearShapes();
        bubble.body.loadPolygon('physicsData'+word.bucket, 'Star');
        bubble.body.setCollisionGroup(collisionGroups[0]);
        bubble.body.collides(collisionGroups);

        // Using this to record how many hits on our objects from laser blasts.
        bubble.body.hits = 0;
        bubble.kill();

        var text = game.add.text(0, 10, word.term);
        text.anchor.setTo(0.5);
        text.font = 'Nunito';
        text.fontSize = 20;
        text.align = 'left';
        text.fill = '#222';
        text.rotation = Phaser.Math.degToRad(-45);
        text.strokeThickness = 0;

        bubble.addChild(text);

        bubble.wordRef = text;
        bubble.scaleRef = scales['bucket'+word.bucket];
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
        reviveTimer = [];
        words = generateWordsInstance.get(gameStateInst.getLevel(), userInput.subject);
        for(var i = 0; i<gameStateInst.WORDS_LIMIT; i++){
            reviveWord(bubbles[i].bubble, i);
        }
        lastIndex = 3;
    };

    /**
     *
     * @param bubble
     * @param index
     */
    function reviveWord(bubble, index){
        bubble.wordRef.text = words[index].term;
        bubble.body.hits = 0;
        bubble.body.x = startingPositions[wordAdded].x;
        bubble.body.y = startingPositions[wordAdded].y;
        bubble.body.angularVelocity = 0;
        bubble.body.rotation = Phaser.Math.degToRad(0);
        bubble.body.velocity.x= startingPositions[wordAdded].vx;
        bubble.body.velocity.y= startingPositions[wordAdded].vy;
        that.animateIn(bubble);
        bubble.revive();
        wordAdded++;
        if(wordAdded === startingPositions.length){
            wordAdded = 0;
        }
    }

    /**
     * Form closure round index value.
     * @param index
     */
    function reviveIndex(index){
        return function(){
            reviveWord(bubbles[index].bubble, index);
        }
    }

    /**
     * Set a bubble for removal.
     * @param bubble
     * @param callback
     */
    that.removeBubble = function(bubble, callback){
        bubble.removeNextStep = true;
        game.add.tween(bubble.sprite).to({ alpha: 0 }, 800, Phaser.Easing.Bounce.InOut, true, 0);
        var tween2 = game.add.tween(bubble.sprite.scale).to({ x: 0.0, y:0.0 }, 800, Phaser.Easing.Back.InOut, true, 0);
        tween2.onComplete.add( callback, this);
        lastIndex++;
        if(lastIndex < gameStateInst.MAX_WORDS){
            reviveTimer.push(game.time.events.add(4000, reviveIndex(lastIndex)));
        }
    };

    /**
     * Use tweens to give bubbles an interesting entrance.
     * @param bubble
     */
    that.animateIn = function(bubble){
        var initalScale = bubble.scaleRef;
        bubble.scale.x = 0.1;
        bubble.scale.y = 0.1;
        bubble.alpha = 1;
        var inTween = game.add.tween(bubble.scale).to({ x:initalScale, y:initalScale}, 800, Phaser.Easing.Back.Out, true, 0);
        //inTween.onComplete.add(function(){
            //bubble.revive();
        //});
    };


    /**
     * Use tweens to give bubbles an interesting entrance.
     * @param bubble
     */
    that.animateOut = function(bubble){
        bubble.kill();
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
        if(reviveTimer.length){
            reviveTimer.forEach(function(timer){
                game.time.events.remove(timer);
            });
        }
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