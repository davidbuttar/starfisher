var wordBubbles = function(){
    var that = {};
    var bubbles = [];
    var active = 0;
    var generateWordsInstance = generateWords();
    var inactive = 0;
    var score = 0;
    var wordAdded = 0;
    var scoreText;
    var wordsCollected = 0;
    var rounds = 0;

    var startingPositions = [
        {
            x:scaleToPixelRatio(70),
            y:scaleToPixelRatio(70),
            vx:scaleToPixelRatio(200),
            vy:scaleToPixelRatio(200)
        },
        {
            x:scaleToPixelRatio(1530),
            y:scaleToPixelRatio(70),
            vx:scaleToPixelRatio(-200),
            vy:scaleToPixelRatio(200)
        },
        {
            x:scaleToPixelRatio(1530),
            y:scaleToPixelRatio(1000),
            vx:scaleToPixelRatio(-200),
            vy:scaleToPixelRatio(-200)
        }
    ];

    /**
     * Create all our words for the first time.
     */
    that.create = function(collisionGroups){
        var words = generateWordsInstance.get();
        words.forEach(function (word, index) {
            game.time.events.add(200 * index, function(){
                that.add(word, collisionGroups);
            }, this);
        });

        scoreText = game.add.text(scaleToPixelRatio(800), scaleToPixelRatio(1060), 'SCORE:'+score);
        scoreText.anchor.setTo(0.5);
        scoreText.font = 'Nunito';
        scoreText.fontSize = scaleToPixelRatio(20);
        scoreText.align = 'center';
        scoreText.fill = '#fff';
        scoreText.strokeThickness = 1;
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
        var bubble = game.add.sprite(posX, posY, 'bubble');
        bubble.scale.set(scaleToPixelRatio(0.3));

        game.physics.p2.enable(bubble, true);
        bubble.body.clearShapes();
        bubble.body.loadPolygon('physicsData2', 'Star');
        bubble.body.setCollisionGroup(collisionGroups[0]);
        bubble.body.collides(collisionGroups);

        bubble.body.velocity.x= startingPositions[wordAdded].vx;
        bubble.body.velocity.y= startingPositions[wordAdded].vy;
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

    that.active = function(){
        return bubbles[active];
    };

    /**
     * Get a particular ship by index
     * @param index
     * @returns {*}
     */
    that.getShip = function(index){
        return bubbles[index];
    };

    function reset(){
        score = 0;
        wordsCollected = 0;
        rounds = 0;
    }

    function nextWordCycle(){
        if(inactive === 3){
            rounds++;
            inactive = 0;
            wordAdded = 0;
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
     * Update our score
     * @param newScore
     * @param numberOfWords
     */
    function updateScoreText(newScore, numberOfWords){
        var plural = numberOfWords === 1 ? '' : 'S';
        scoreText.text = 'SCORE:' +newScore+ ' | SUCCESSFULLY TARGETED '+numberOfWords +' WORD'+ plural;
    }

    /**
     * Called when a word has been collected.
     */
    that.wordCollected = function(){
        if(inactive !== 3) {
            inactive++;
            score += 100;
            wordsCollected++;
            updateScoreText(score, wordsCollected);
        }
        if(inactive === 3){
            game.time.events.add(4000, nextWordCycle, this);
        }
    };

    /**
     * Position text correctly.
     */
    that.update = function(){
        bubbles.forEach(function(bubble){
            if(bubble.bubble && bubble.bubble.exists){
                utils.screenWrap(bubble.bubble.body);
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