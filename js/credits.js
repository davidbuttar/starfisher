Credits = function(game) {
  var that = {};

  var spaceBarKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  that.init = function() {
    var logo = game.make.sprite(game.world.centerX, 200, 'brand');

    game.add.tileSprite(0, 0, game.width, game.height, 'space');
    utils.centerGameObjects([logo]);
    game.add.existing(logo).scale.setTo(0.5);
  };

  that.create = function() {
    var backToMenu = game.add.text(game.world.centerX,
      game.world.height - 50,
      'Hit Spacebar for Main Menu',
      {
        font: '30pt TheMinion',
        srokeThickness: 4,
        align: 'left',
        fill: 'red'
      });

    backToMenu.anchor.setTo(0.5);
    backToMenu.inputEnabled = true;

    backToMenu.alpha = 0;
    game.add.tween(backToMenu).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 250, true);

    backToMenu.events.onInputUp.add(function(){
      game.state.start('Menu');
    });

    spaceBarKey.onDown.add(function() {
      game.state.start('Menu');
    });
  };

  that.shutdown = function() {
    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.SPACEBAR);
  };

  return that;
};

Phaser.Utils.mixinPrototype(Credits.prototype, utils);