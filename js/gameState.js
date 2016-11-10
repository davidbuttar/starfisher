var gameState = function(main){
    var that = {};
    var mainGame = main;
    var score = 0;
    var curAvoidScore = 0;
    var curTimeScore = 0;
    var scoreText, levelText, timerText, outOfTime, personasCaptured, captured, timeBonus, avoidBonus;
    var wordsCollected = 0;
    var round = 0;
    var wordsCollectedThisRound = 0;
    var wordsCollection = [];
    var curwordsCollection = [];
    var rocketHits = 0;
    var rocketHitTimer = false;
    var timer;
    var timesUp = false;
    var currentState = 'startMessage';
    var levelDuration = 60;


    that.MAX_LEVELS = 3;
    that.MAX_WORDS = 8;
    that.WORDS_LIMIT = 4;
    that.SKIP_INTRO = true;

    function applyCommonStyle(text, size, transparent){
        text.anchor.setTo(0.5);
        text.font = utils.FONT1;
        text.fontSize = scaleToPixelRatio(size);
        text.align = 'center';
        text.fill = '#fff';
        text.strokeThickness = 1;
        if(transparent){
            text.alpha = 0;
        }
    }

    /**
     * Create all our words for the first time.
     */
    that.create = function(){
        scoreText = game.add.text(scaleToPixelRatio(game.world.centerX), scaleToPixelRatio(game.world.height-20), 'SCORE:'+score);
        applyCommonStyle(scoreText, 20);

        levelText = game.add.text(scaleToPixelRatio(game.world.centerX), scaleToPixelRatio(400), 'Avoid the bombardment, shoot the stars to get the perfect content.'+round);
        applyCommonStyle(levelText, 30, true);

        timerText = game.add.text(scaleToPixelRatio(game.world.width-20), scaleToPixelRatio(20), '59');
        applyCommonStyle(timerText, 30);

        addLevelSummary();
    };

    function addLevelSummary(){
        var start = 150;
        outOfTime = game.add.text(scaleToPixelRatio(game.world.centerX), scaleToPixelRatio(game.world.centerY), 'Level Complete');
        applyCommonStyle(outOfTime, 24, true);

        personasCaptured = game.add.text(scaleToPixelRatio(game.world.centerX), scaleToPixelRatio(start+100), 'Your words');
        applyCommonStyle(personasCaptured, 24, true);

        captured = game.add.text(scaleToPixelRatio(game.world.centerX), scaleToPixelRatio(start+200), '');
        applyCommonStyle(captured, 24, true);
        captured.wordWrap = true;
        captured.wordWrapWidth = 900;

        timeBonus = game.add.text(scaleToPixelRatio(game.world.centerX), scaleToPixelRatio(start+300), 'Time Bonus: ');
        applyCommonStyle(timeBonus, 24, true);
        avoidBonus = game.add.text(scaleToPixelRatio(game.world.centerX), scaleToPixelRatio(start+400), 'Avoid Bonus: ');
        applyCommonStyle(avoidBonus, 24, true);
    }

    /**
     * Show the end of level summary.
     */
    that.showSummary = function(){
        var firstMessage = timesUp ? 'Times up, Persona Captured' : 'Persona Captured';
        outOfTime.text = firstMessage;
        captured.text = curwordsCollection.join(', ');
        avoidBonus.text = 'Dodge Bonus: '+curAvoidScore;
        timeBonus.text = 'Time Bonus: '+curTimeScore;
        var inTween = game.add.tween(outOfTime).to({ alpha: 1}, 800, Phaser.Easing.Back.In, true);

        inTween.onComplete.add(function(){
            game.time.events.add(1000, function() {
                game.add.tween(outOfTime).to({alpha: 0}, 800, Phaser.Easing.Back.Out, true);
                game.add.tween(personasCaptured).to({alpha: 1}, 800, Phaser.Easing.Back.In, true, 200);
                game.add.tween(avoidBonus).to({alpha: 1}, 800, Phaser.Easing.Back.In, true, 200);
                game.add.tween(timeBonus).to({alpha: 1}, 800, Phaser.Easing.Back.In, true, 200);
                var showCapturedTween = game.add.tween(captured).to({alpha: 1}, 800, Phaser.Easing.Back.In, true, 200);

                showCapturedTween.onComplete.add(function(){
                    game.time.events.add(2000, function(){
                        game.add.tween(personasCaptured).to({alpha: 0}, 800, Phaser.Easing.Back.Out, true);
                        game.add.tween(avoidBonus).to({alpha: 0}, 800, Phaser.Easing.Back.Out, true);
                        game.add.tween(timeBonus).to({alpha: 0}, 800, Phaser.Easing.Back.Out, true);
                        game.add.tween(captured).to({alpha: 0}, 800, Phaser.Easing.Back.Out, true);
                        if(round === that.MAX_LEVELS){
                            mainGame.gameOver();
                        }else{
                            that.showStartMessages();
                        }
                    });
                });

            });
        }, this);
    };

    /**
     * Reset the game state, to start a new game.
     */
    that.reset = function(){
        score = 0;
        wordsCollected = 0;
        rocketHits = 0;
        round = 0;
        wordsCollection = [];
        curwordsCollection = [];
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
        if(wordsCollectedThisRound !== that.MAX_WORDS) {
            wordsCollectedThisRound++;
            wordsCollection.push(word);
            curwordsCollection.push(word);
            that.incrementScore();
        }
    };

    /**
     * Show our initial messages.
     */
    that.showStartMessages = function(){
        round += 1;
        updateLevelMessage();
    };

    /**
     * Is the round over.
     * @returns {boolean}
     */
    that.checkLevelOver = function(){
        var over = currentState === 'startLevel' &&
            (wordsCollectedThisRound === that.MAX_WORDS || timesUp);
        if(over){
            that.endLevel();
        }
        return over;
    };

    /**
     * Apply end of level process
     */
    that.endLevel = function(){
        currentState = 'endLevel';
        mainGame.endLevel();
        applyScoreBonus();
        timer.destroy();
        that.showSummary();
    };

    /**
     * Update our score
     */
    that.startLevel = function(){
        rocketHits = 0;
        wordsCollectedThisRound = 0;
        curwordsCollection = [];
        mainGame.startLevel();
        timesUp = false;
        currentState = 'startLevel';
        // Start time for level
        timer = game.time.create(false);
        timer.add(Phaser.Timer.SECOND * levelDuration, function(){
            timesUp = true;
            that.checkLevelOver();
        });
        timer.start();
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
            that.startLevel();
        }, this);

        if(round === 1){
            levelText.text = 'Avoid the bombardment\n fire at the stars to get the perfect content.\n\n Press spacebar to fire and use the cursor keys to fly the ship';
        }else {
            levelText.text = 'Incoming grapeshot PERSONA for ' + mainGame.userInput.subject+ '...';
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
     * At end of level apply bonus scoring for not being hit by asteroid
     */
    function applyScoreBonus(){
        if(rocketHits<16){
            curTimeScore = Math.round(timer.events[0].timer.duration / 10);
            curAvoidScore = (62 *(15-rocketHits));
            score = score + curAvoidScore + curTimeScore;
        }
    }

    /**
     * Register a hit on the rocket after a period
     */
    that.registerRocketHit = function(){
        clearTimeout(rocketHitTimer);
        rocketHitTimer = setTimeout(function(){
            rocketHits++;
        }, 80);
    };

    /**
     * Is the game complete.
     * @returns {boolean}
     */
    that.gameComplete = function(){
        return (round === that.MAX_LEVELS);
    };

    /**
     * Update our timer.
     */
    that.updateTime = function(){
        if(timer && timer.events[0]) {
            timerText.text = Math.round(timer.events[0].timer.duration / 1000);
        }
    };

    return that;
};