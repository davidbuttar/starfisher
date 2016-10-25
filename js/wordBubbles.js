var wordBubbles = function(){
    var that = {};
    var bubbles = [];
    var active = 0;
    var generateWordsInstance = generateWords();
    var generating = false;
    var score = 0;

    /**
     * Add bubble word
     *
     * @param game
     * @param posX
     * @param posY
     */
    that.add = function(game, word){
        var wordBubble = {};
        var posX = scaleToPixelRatio(1400);
        var posY = scaleToPixelRatio(200);

        //  Create our ship sprite
        var bubble = game.add.sprite(posX, posY, 'bubble');
        bubble.scale.set(scaleToPixelRatio(0.1));

        game.physics.p2.enable(bubble);
        bubble.body.clearShapes();

        bubble.body.loadPolygon('physicsData2', 'Star');
        bubble.body.velocity.y= scaleToPixelRatio(200);
        bubble.body.velocity.x= scaleToPixelRatio(-200);

        var text = game.add.text(0, 0, word.term);
        text.anchor.setTo(0.5);
        text.font = 'Nunito';
        text.fontSize = 110;
        text.align = 'left';
        text.fill = '#444';
        text.strokeThickness = 1;

        bubble.addChild(text);

        wordBubble.text = text;
        wordBubble.bubble = bubble;

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

    /**
     * Position text correctly.
     */
    that.update = function(){


        var removalRequred = false;

        bubbles.forEach(function(bubble){
            if(bubble.bubble && !bubble.bubble.exists){
                removalRequred = true;
                score += 100;
                console.log('Score: '+score);
                bubble.bubble.destroy(true);
            }
        });

        if(removalRequred) {
            bubbles = bubbles.filter(function (bubble) {
                return bubble.bubble.exists;
            });
        }

        if(bubbles.length === 0 && !generating){
            var words = generateWordsInstance.get();
            generating = true;
            words.forEach(function (word, index) {
                setTimeout(function () {
                    generating = false;
                    that.add(game, word);
                }, 2000 * index);
            });
        }
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