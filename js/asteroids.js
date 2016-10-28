var asteroids = function(){
    var that = {};
    var bubbles = [];
    var wordAdded = 0;
    var generateWordsInstance = generateWords();

    var startingPositions = [
        {
            x:scaleToPixelRatio(200),
            y:scaleToPixelRatio(70),
            vx:scaleToPixelRatio(250),
            vy:scaleToPixelRatio(250)
        },
        {
            x:scaleToPixelRatio(1430),
            y:scaleToPixelRatio(70),
            vx:scaleToPixelRatio(-200),
            vy:scaleToPixelRatio(250)
        },
        {
            x:scaleToPixelRatio(1430),
            y:scaleToPixelRatio(1000),
            vx:scaleToPixelRatio(-250),
            vy:scaleToPixelRatio(-200)
        }
    ];

    /**
     * Create all our words for the first time.
     */
    that.create = function(collisionGroups){
        var words = generateWordsInstance.get();
        words.forEach(function (word, index) {
            game.time.events.add((200 * index) + 2000, function(){
                that.add(word, collisionGroups);
            }, this);
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
        var posX = startingPositions[wordAdded].x;
        var posY = startingPositions[wordAdded].y;

        //  Create our ship sprite
        var bubble = game.add.sprite(posX, posY, 'asteroid');
        bubble.scale.set(scaleToPixelRatio(0.3));

        game.physics.p2.enable(bubble);
        //bubble.body.clearShapes();
        //bubble.body.loadPolygon('physicsData2', 'Star');
        bubble.body.setCollisionGroup(collisionGroups[0]);
        bubble.body.collides(collisionGroups);

        bubble.body.velocity.x= startingPositions[wordAdded].vx;
        bubble.body.velocity.y= startingPositions[wordAdded].vy;

        // Using this to record how many hits on our objects from laser blasts.
        bubble.body.hits = 0;

        var text = game.add.text(0, 0, word.term);
        text.anchor.setTo(0.5);
        text.font = 'Nunito';
        text.fontSize = 70;
        text.align = 'left';
        text.fill = '#444';
        text.strokeThickness = 1;

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

    function nextWordCycle(){
        if(inactive === 3){
            rounds++;
            if(rounds === 10){
                reset();
            }
            bubbles.forEach(function(bubble, index){
                bubble.bubble.body.hits = 0;
                game.time.events.add(200 * index, function() {
                    bubble.bubble.body.x= startingPositions[wordAdded].x;
                    bubble.bubble.body.y= startingPositions[wordAdded].y;
                    bubble.bubble.body.velocity.x= startingPositions[wordAdded].vx;
                    bubble.bubble.body.velocity.y= startingPositions[wordAdded].vy;
                    bubble.bubble.revive();
                    wordAdded++;
                });
            });
        }
    }

    /**
     * Position text correctly.
     */
    that.update = function(rocket){
        bubbles.forEach(function(bubble){
            if(bubble.bubble && bubble.bubble.exists){
                utils.screenWrap(bubble.bubble.body);
                utils.constrainVelocity(bubble.bubble, 75);
                utils.accelerateToObject(bubble.bubble, rocket, 500);
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