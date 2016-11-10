var FinalScore = function() {
    var that = {};
    var gameData;

    var goBack =  function(){
        game.state.start('Leaderboard', true, false, gameData);
    };

    that.init = function (gameDataIn) {

        gameData = gameDataIn;
        that.titleText = game.make.text(game.world.centerX, 80, "You did it! Final Score: "+gameData.score);
        that.titleText.anchor.setTo(0.5);
        that.titleText.font = utils.FONT1;
        that.titleText.fontSize = 50;
        that.titleText.align = 'center';
        that.titleText.fill = utils.TEXTCOLOR1;
        that.titleText.strokeThickness = 1;
        that.titleText.setShadow(-4, 4, 'rgba(0,0,0,0.8)', 0);

        that.summaryText = game.make.text(game.world.centerX, 160, 'You targeted '+gameData.subject+' with these 3 personas');
        that.summaryText.anchor.setTo(0.5);
        that.summaryText.font = utils.FONT1;
        that.summaryText.fontSize = 38;
        that.summaryText.align = 'center';
        that.summaryText.fill = '#70F8FF';
        that.summaryText.strokeThickness = 1;
        that.summaryText.setShadow(-4, 4, 'rgba(0,0,0,0.8)', 0);

        that.spacebarKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    };

    that.create = function(){
        game.add.tileSprite(0, 0, game.width, game.height, 'space');
        game.add.existing(that.titleText);
        game.add.existing(that.summaryText);
        that.spacebarKey.onDown.add(goBack, this);

        var backToMenu = game.add.text(game.world.centerX, game.world.height - 20,
            'Hit Spacebar to Continue',
            {
                font: utils.FONT1,
                srokeThickness: 4,
                align: 'left',
                fill: 'red'
            });

        backToMenu.anchor.setTo(0.5);
        backToMenu.fontSize = 38;
        backToMenu.inputEnabled = true;

        backToMenu.alpha = 0;
        game.add.tween(backToMenu).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 250, true);

        backToMenu.events.onInputUp.add(function(){
            game.state.start('Menu');
        });

        // Add our collected words
        var captured1 = game.add.text(scaleToPixelRatio(game.world.centerX), scaleToPixelRatio(350), gameData.words[0].join(', '));
        utils.applyCommonStyle(captured1, 30);
        captured1.wordWrap = true;
        captured1.wordWrapWidth = 900;

        // Add our collected words
        var captured2 = game.add.text(scaleToPixelRatio(game.world.centerX), scaleToPixelRatio(450), gameData.words[1].join(', '));
        utils.applyCommonStyle(captured2, 30);
        captured2.wordWrap = true;
        captured2.wordWrapWidth = 900;

        // Add our collected words
        var captured3 = game.add.text(scaleToPixelRatio(game.world.centerX), scaleToPixelRatio(550), gameData.words[2].join(', '));
        utils.applyCommonStyle(captured3, 30);
        captured3.wordWrap = true;
        captured3.wordWrapWidth = 900;

    };

    that.shutdown = function() {
        game.input.keyboard.removeKeyCapture(Phaser.Keyboard.SPACEBAR);
    };

    return that;
};