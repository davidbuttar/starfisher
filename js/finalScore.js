var FinalScore = function() {
    var that = {};
    var gameData;

    var goBack =  function(){
        game.state.start('Leaderboard', true, false, gameData);
    };

    that.init = function (gameDataIn) {

        gameData = gameDataIn;
        that.titleText = game.make.text(game.world.centerX, 80, "Final Score: "+gameData.score);
        that.titleText.anchor.setTo(0.5);
        that.titleText.font = 'Nunito';
        that.titleText.fontSize = 50;
        that.titleText.align = 'center';
        that.titleText.fill = '#70F8FF';
        that.titleText.strokeThickness = 1;
        that.titleText.setShadow(-4, 4, 'rgba(0,0,0,0.8)', 0);

        that.summaryText = game.make.text(game.world.centerX, 160, 'Congratulations you targeted '+gameData.subject+' with these ' +
            gameData.words.length+' words');
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

        // Add our collected words

        var leftOffset = 100;
        var topOffset = 250;
        var column = 0;

        gameData.words.forEach(function(word){
            var star = game.add.sprite(250*column + leftOffset, topOffset, 'bubble');
            var text = game.add.text(star.width/2, star.height/2 + 18, word);
            text.font = 'Nunito';
            text.fontSize = 52;
            text.align = 'left';
            text.fill = '#222';
            text.rotation = Phaser.Math.degToRad(-45);
            text.strokeThickness = 1;
            star.addChild(text);
            text.anchor.setTo(0.5);
            star.scale.set(0.35);

            if(column === 5){
                topOffset += 250;
                column = 0;
            }else{
                column++;
            }

        });

    };

    that.shutdown = function() {
        game.input.keyboard.removeKeyCapture(Phaser.Keyboard.SPACEBAR);
    };

    return that;
};