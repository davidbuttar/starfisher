var FinalScore = function() {
    var that = {};
    var gameData;

    var goBack =  function(){
        game.state.start('Leaderboard', true, false, gameData);
    };

    that.init = function (gameDataIn) {
        console.log(gameDataIn);
        gameData = gameDataIn;
        that.titleText = game.make.text(game.world.centerX, 80, "Final Score: "+gameData.score);
        that.titleText.anchor.setTo(0.5);
        that.titleText.font = 'Nunito';
        that.titleText.fontSize = 50;
        that.titleText.align = 'center';
        that.titleText.fill = '#70F8FF';
        that.titleText.strokeThickness = 1;
        that.titleText.setShadow(-4, 4, 'rgba(0,0,0,0.8)', 0);

        that.summaryText = game.make.text(game.world.centerX, 160, 'Congratulations you targeted clinton with these ' +
            gameData.words.length+' terms');
        that.summaryText.anchor.setTo(0.5);
        that.summaryText.font = 'Nunito';
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

        var backToMenu = game.add.text(game.world.centerX, 1000,
            'Hit Spacebar to Continue',
            {
                font: 'Nunito',
                srokeThickness: 4,
                align: 'left',
                fill: 'red'
            });

        backToMenu.anchor.setTo(0.5);
        backToMenu.fontSize = 38;
        backToMenu.inputEnabled = true;

        backToMenu.events.onInputUp.add(function(){
            game.state.start('Menu');
        });
    };

    that.shutdown = function() {
        game.input.keyboard.removeKeyCapture(Phaser.Keyboard.SPACEBAR);
    };

    return that;
};