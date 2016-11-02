var gameState = function(){
    var that = {};
    that.MAX_LEVELS = 6;
    var score = 0;
    var scoreText, levelText;
    var wordsCollected = 0;
    var round = 0;
    var wordsCollectedThisRound = 0;
    var wordsCollection = [];


    /**
     * Create all our words for the first time.
     */
    that.create = function(){
        that.reset();
        scoreText = game.add.text(scaleToPixelRatio(800), scaleToPixelRatio(1060), 'SCORE:'+score);
        scoreText.anchor.setTo(0.5);
        scoreText.font = utils.FONT1;
        scoreText.fontSize = scaleToPixelRatio(20);
        scoreText.align = 'center';
        scoreText.fill = '#fff';
        scoreText.strokeThickness = 1;

        levelText = game.add.text(scaleToPixelRatio(800), scaleToPixelRatio(500), 'Avoid the bombardment, shoot the stars to get the perfect content.'+round);
        levelText.anchor.setTo(0.5);
        levelText.font = utils.FONT1;
        levelText.fontSize = scaleToPixelRatio(30);
        levelText.align = 'center';
        levelText.fill = '#fff';
        levelText.strokeThickness = 1;
        levelText.alpha = 0;
    };

    /**
     * Reset the game state, to start a new game.
     */
    that.reset = function(){
        score = 0;
        wordsCollected = 0;
        round = 0;
        wordsCollection = [];
    };

    /**
     * Get the collected words.
     */
    that.getWordsCollection = function(){
      return wordsCollection;
    };

    /**
     * Called when a word has been collected.
     */
    that.wordCollected = function(word){
        if(wordsCollectedThisRound !== 3) {
            wordsCollectedThisRound++;
            wordsCollection.push(word);
            that.incrementScore();
        }
    };

    /**
     * Is the round over.
     * @returns {boolean}
     */
    that.roundOver = function(){
        return wordsCollectedThisRound === 3;
    };

    that.getLevel = function(){
      return round;
    };

    that.getScore = function(){
        return score;
    };

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
     * Our current level.
     */
    function updateLevelMessage(){
        var inTween = game.add.tween(levelText).to({ alpha: 1}, 800, Phaser.Easing.Back.In, true);
        inTween.onComplete.add(function(){
            game.add.tween(levelText).to({ alpha: 0}, 800, Phaser.Easing.Back.Out, true, 2000);
        }, this);

        if(round === 1){
            levelText.text = 'Avoid the bombardment\n fire at the stars to get the perfect content.\n\n Press spacebar to fire and use the cursor keys to fly the ship';
        }else {
            levelText.text = 'LEVEL:' + round;
        }

    }

    /**
     * Update our score
     */
    that.incrementScore = function(){
        score += 100;
        wordsCollected++;
        updateScoreText(score, wordsCollected);
    };

    /**
     * Update our score
     */
    that.nextRound = function(){
        if(round === that.MAX_LEVELS){
            that.reset();
        }
        wordsCollectedThisRound = 0;
        round += 1;
        updateLevelMessage();
    };

    /**
     * Is the game complete.
     * @returns {boolean}
     */
    that.gameComplete = function(){
        return (round === that.MAX_LEVELS);
    };

    return that;
};