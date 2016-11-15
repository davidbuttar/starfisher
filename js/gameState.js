var gameState = function(main){
    var that = {};
    var mainGame = main;
    var score = 0;
    var curAvoidScore = 0;
    var curTimeScore = 0;
    var scoreText, levelText, timerText, outOfTime, personasCaptured, captured, timeBonus, avoidBonus, spacebarPress;
    var wordsCollected = 0;
    var round = 0;
    var wordsCollectedThisRound = 0;
    var wordsCollection = [];
    var curWordsCollection = [];
    var rocketHits = 0;
    var rocketHitTimer = false;
    var timer;
    var timesUp = false;
    var currentState = 'startMessage';
    var levelDuration = 60;
    var timeLeft = levelDuration;


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
        scoreText = game.add.text(scaleToPixelRatio(10), scaleToPixelRatio(game.world.height-34), 'SCORE:'+score);
        applyCommonStyle(scoreText, 20);
        scoreText.anchor.setTo(0);
        scoreText.align = 'left';

        levelText = game.add.text(scaleToPixelRatio(game.world.centerX), scaleToPixelRatio(400), 'Avoid the bombardment, shoot the stars to get the perfect content.'+round);
        applyCommonStyle(levelText, 30, true);

        timerText = game.add.text(scaleToPixelRatio(game.world.width-58), scaleToPixelRatio(game.world.height-20), 'Timer:60');
        applyCommonStyle(timerText, 20);

        addLevelSummary();
    };

    function addLevelSummary(){
        var start = 150;
        outOfTime = game.add.text(scaleToPixelRatio(game.world.centerX), scaleToPixelRatio(game.world.centerY), 'Level Complete');
        applyCommonStyle(outOfTime, 24, true);

        personasCaptured = game.add.text(scaleToPixelRatio(game.world.centerX), scaleToPixelRatio(start+100), 'Your words');
        applyCommonStyle(personasCaptured, 25, true);

        captured = game.add.text(scaleToPixelRatio(game.world.centerX), scaleToPixelRatio(start+200), '');
        applyCommonStyle(captured, 30, true);
        captured.wordWrap = true;
        captured.wordWrapWidth = 900;

        timeBonus = game.add.text(scaleToPixelRatio(game.world.centerX), scaleToPixelRatio(start+300), 'Time Bonus: ');
        applyCommonStyle(timeBonus, 24, true);
        avoidBonus = game.add.text(scaleToPixelRatio(game.world.centerX), scaleToPixelRatio(start+350), 'Avoid Bonus: ');
        applyCommonStyle(avoidBonus, 24, true);

        spacebarPress = game.add.text(game.world.centerX, game.world.height - 180,
            'Hit Spacebar to Continue',
            {
                font: utils.FONT1,
                srokeThickness: 4,
                align: 'left',
                fill: 'red'
            });

        spacebarPress.anchor.setTo(0.5);
        spacebarPress.fontSize = 34;
        spacebarPress.alpha = 0;
        spacebarPress.inputEnabled = true;

    }

    /**
     * Show the end of level summary.
     */
    that.showSummary = function(){
        var firstMessage = timesUp ? 'Times up, Persona Captured' : 'Persona Captured';
        outOfTime.text = firstMessage;
        captured.text = curWordsCollection.join(', ');
        avoidBonus.text = 'Dodge Bonus: '+curAvoidScore;
        timeBonus.text = 'Time Bonus: '+curTimeScore;
        var inTween = game.add.tween(outOfTime).to({ alpha: 1}, 800, Phaser.Easing.Back.In, true);

        inTween.onComplete.add(function(){
            game.time.events.add(1000, function() {
                game.add.tween(outOfTime).to({alpha: 0}, 800, Phaser.Easing.Back.Out, true);
                game.add.tween(personasCaptured).to({alpha: 1}, 800, Phaser.Easing.Back.In, true, 200);
                game.add.tween(avoidBonus).to({alpha: 1}, 800, Phaser.Easing.Back.In, true, 200);
                game.add.tween(timeBonus).to({alpha: 1}, 800, Phaser.Easing.Back.In, true, 200);
                game.add.tween(captured).to({alpha: 1}, 800, Phaser.Easing.Back.In, true, 200);
                game.add.tween(spacebarPress).to( { alpha: 1 }, 1000, Phaser.Easing.Back.In, true, 200).onComplete.
                add(function(){
                    currentState = 'showSummary';
                });
            });
        }, this);
    };


    /**
     * Move on from the end of level summary.
     */
    that.endSummary = function(){
        currentState = 'showStartMessages';
        game.time.events.add(200, function(){
            game.add.tween(personasCaptured).to({alpha: 0}, 800, Phaser.Easing.Back.Out, true);
            game.add.tween(avoidBonus).to({alpha: 0}, 800, Phaser.Easing.Back.Out, true);
            game.add.tween(timeBonus).to({alpha: 0}, 800, Phaser.Easing.Back.Out, true);
            game.add.tween(captured).to({alpha: 0}, 800, Phaser.Easing.Back.Out, true);
            game.add.tween(spacebarPress).to({alpha: 0}, 800, Phaser.Easing.Back.Out, true);
            if(round === that.MAX_LEVELS){
                mainGame.gameOver();
            }else{
                that.showStartMessages();
            }
        });
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
        curWordsCollection = [];
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
            curWordsCollection.push(word);
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
        wordsCollection.push(curWordsCollection);
        that.showSummary();
    };

    /**
     * Update our score
     */
    that.startLevel = function(){
        rocketHits = 0;
        wordsCollectedThisRound = 0;
        curWordsCollection = [];
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
     */
    function updateScoreText(newScore){
        scoreText.text = 'SCORE: ' +newScore;
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
        score += 200;
        wordsCollected++;
        updateScoreText(score, wordsCollected);
    };

    /**
     * At end of level apply bonus scoring for not being hit by asteroid
     */
    function applyScoreBonus(){
        curTimeScore = Math.round(timer.events[0].timer.duration / 10);
        // round out the time score nicely
        curTimeScore = Math.round(curTimeScore/100)*100;
        curAvoidScore = rocketHits<16 ? (50 *(15-rocketHits)) : 0;
        score = score + curAvoidScore + curTimeScore;
        updateScoreText(score);
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

    that.currentState = function(){
        return currentState;
    };

    /**
     * Update our timer.
     */
    that.updateTime = function(){
        if(timer && timer.events[0]) {
            var nextTime = Math.round(timer.events[0].timer.duration / 1000);
            if(nextTime !== timeLeft){
                timerText.text = 'Timer:'+nextTime;
                timeLeft = nextTime;
            }

        }
    };

    return that;
};