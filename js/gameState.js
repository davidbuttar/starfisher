var gameState = function(){
    var that = {};
    var score = 0;
    var scoreText, levelText;
    var wordsCollected = 0;
    var round = 0;
    var wordsCollectedThisRound = 0;

    /**
     * Create all our words for the first time.
     */
    that.create = function(){
        that.reset();
        scoreText = game.add.text(scaleToPixelRatio(800), scaleToPixelRatio(1060), 'SCORE:'+score);
        scoreText.anchor.setTo(0.5);
        scoreText.font = 'Nunito';
        scoreText.fontSize = scaleToPixelRatio(20);
        scoreText.align = 'center';
        scoreText.fill = '#fff';
        scoreText.strokeThickness = 1;

        levelText = game.add.text(scaleToPixelRatio(800), scaleToPixelRatio(500), 'Level:'+round);
        levelText.anchor.setTo(0.5);
        levelText.font = 'Nunito';
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
    };

    /**
     * Called when a word has been collected.
     */
    that.wordCollected = function(){
        if(wordsCollectedThisRound !== 3) {
            wordsCollectedThisRound++;
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
        levelText.text = 'LEVEL:' +round;

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
        if(round === 6){
            that.reset();
        }
        wordsCollectedThisRound = 0;
        round += 1;
        updateLevelMessage();
    };

    return that;
};