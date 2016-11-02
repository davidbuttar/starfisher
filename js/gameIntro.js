var GameIntro = function(game) {};


GameIntro.prototype = {

	init: function () {
    this.titleText = game.make.text(game.world.centerX, 100, "Content Bombardment", {
      font: 'bold 60pt '+utils.FONT1,
      fill: utils.TEXTCOLOR1,
      align: 'center'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);
    this.spacebarKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    game.add.plugin(Fabrique.Plugins.InputField);
  },

  addInputs: function() {
    this.emailText = game.make.text(game.world.centerX, 260, "Your Email", {
      font: 'bold 30pt '+utils.FONT1,
      fill: '#fff',
      align: 'center'
    });

    this.emailInput = game.make.inputField(game.world.centerX - 300, 300, {
      font: '30px Arial',
      fill: '#212121',
      fontWeight: 'bold',
      width: 600,
      height: 40,
      padding: 20,
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 6
    });

    this.contentText = game.make.text(game.world.centerX, 450, "Content", {
      font: 'bold 30pt '+utils.FONT1,
      fill: '#fff',
      align: 'center'
    });

    this.contentInput = game.make.inputField(game.world.centerX - 300, 490, {
      font: '30px Arial',
      fill: '#212121',
      fontWeight: 'bold',
      height: 40,
      width: 600,
      padding: 20,
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 6
    });

    this.playActionText = game.make.text(game.world.centerX, 800, "Start", {
      font: 'bold 30pt '+utils.FONT1,
      fill: 'red',
      align: 'center'
    });

    this.backToMenuText = game.make.text(game.world.centerX, 700, "Back to menu", {
      font: 'bold 30pt '+utils.FONT1,
      fill: 'white',
      align: 'center'
    });

    this.backToMenuText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.backToMenuText.anchor.set(0.5);
    this.emailText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.emailText.anchor.set(0.5);
    this.contentText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.contentText.anchor.set(0.5);
    this.playActionText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.playActionText.anchor.set(0.5);

    game.add.existing(this.emailText);
    game.add.existing(this.emailInput);
    game.add.existing(this.contentText);
    game.add.existing(this.contentInput);
    game.add.existing(this.playActionText);
    game.add.existing(this.backToMenuText);

    this.playActionText.inputEnabled = true;
    this.backToMenuText.inputEnabled = true;
  },

  create: function(){
		game.add.tileSprite(0, 0, game.width, game.height, 'space');

    game.stage.disableVisibilityChange = true;
    game.add.existing(this.titleText);

    this.spacebarKey.onDown.add(this.startGame, this);

    this.addInputs();

    this.playActionText.visible = false;

    this.playActionText.events.onInputUp.add(this.startGame, this);

    this.backToMenuText.events.onInputUp.add(function() {
      game.state.start('Menu');
    });

    this.playActionText.alpha = 0;
    game.add.tween(this.playActionText).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 250, true);
	},

  startGame: function(){
    if(this.emailInput.value && this.contentInput.value) {
      var player = {
        email: this.emailInput.value,
        subject: this.contentInput.value
      };

      game.state.start('Main', true, false, player);
    }
  },

  showPlayAction: function() {
    this.playActionText.visible = this.emailInput.value && this.contentInput.value;
  },

  update: function() {
    this.showPlayAction();
  },

  shutdown: function() {
    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.SPACEBAR);
  }

};

Phaser.Utils.mixinPrototype(Menu.prototype, utils);