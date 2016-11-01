var Menu = function(game) {};


Menu.prototype = {
	
  menuConfig: {
    startY: 260,
    startX: 'center'
  },

  menuOptions: [
    { key: 'Main', title: 'Play'},
    { key: 'Leaderboard', title: 'Leaderboard' },
    { key: 'Settings', title: 'Settings' }
  ],

  menuNodes: [],

  keyActions: {
    up: 38,
    down: 40,
    spacebar: 32
  },

	init: function () {
    this.titleText = game.make.text(game.world.centerX, 100, "Content Bombardment", {
      font: 'bold 60pt TheMinion',
      fill: '#FDFFB5',
      align: 'center'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);
    this.optionCount = 1;
    this.menuNodes = [];
    this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.spacebarKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  },

  create: function(){
    var that = this;
		game.add.tileSprite(0, 0, game.width, game.height, 'space');

    game.stage.disableVisibilityChange = true;
    game.add.existing(this.titleText);

    this.menuOptions.forEach(function (option) {
      var node = that.addMenuOption(option.title, function () {
        game.state.start(option.key);
      });
      node.navState = option.key;
      that.menuNodes.push(node);
    });

    this.currentSelectedOption = 0; 
    this.menuNodes[0].setStyle(style.navitem.hover);

    this.upKey.onDown.add(this.menuUp, this);
    this.downKey.onDown.add(this.menuDown, this);
    this.spacebarKey.onDown.add(this.menuSpacebar, this);
	},

  setMenuItem: function(menuIndex) {
    this.menuNodes[this.currentSelectedOption].setStyle(style.navitem.default);
    this.currentSelectedOption = menuIndex; 
    this.menuNodes[menuIndex].setStyle(style.navitem.hover);
  },

  menuUp: function(){
    var menuItemsLength = this.menuNodes.length - 1;
    var indexValue = this.currentSelectedOption - 1; 
    if(this.currentSelectedOption - 1 < 0) {
      this.setMenuItem(menuItemsLength);
    } else {
      this.setMenuItem(indexValue);
    }
  },
  menuDown: function(){
    var menuItemsLength = this.menuNodes.length - 1;
    var indexValue = this.currentSelectedOption + 1; 
    if(indexValue > menuItemsLength) {
      this.setMenuItem(0);
    } else {
      this.setMenuItem(indexValue);
    }
  },
  menuSpacebar: function(){
      game.state.start(this.menuNodes[this.currentSelectedOption].navState);
  },

  shutdown: function() {
    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.UP);
    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.DOWN);
    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.SPACEBAR);
  }

};

Phaser.Utils.mixinPrototype(Menu.prototype, utils);