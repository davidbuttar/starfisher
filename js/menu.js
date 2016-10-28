var Menu = function(game) {};


Menu.prototype = {
	
  menuConfig: {
    startY: 260,
    startX: 'center'
  },

  menuOptions: [
    { key: 'Main', title: 'Start'},
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
    this.titleText = game.make.text(game.world.centerX, 100, "Spacefisher", {
      font: 'bold 60pt TheMinion',
      fill: '#FDFFB5',
      align: 'center'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);
    this.optionCount = 1;
  },

  create: function(){
    var that = this;
		game.add.tileSprite(0, 0, game.width, game.height, 'space');

    game.stage.disableVisibilityChange = true;
    game.add.existing(this.titleText);

    this.menuOptions.forEach(function (option) {
      var node = that.addMenuOption(option.title, function () {
        that.game.state.start(option.key);
      });
      node.navState = option.key;
      that.menuNodes.push(node);
    });

    this.currentSelectedOption = 0; 
    this.menuNodes[0].setStyle(style.navitem.hover);
	},

  setMenuItem: function(menuIndex) {
    this.menuNodes[this.currentSelectedOption].setStyle(style.navitem.default);
    //this.menuNodes[0].setStyle(style.navitem.default);
    //this.menuNodes[1].setStyle(style.navitem.default);
    //this.menuNodes[2].setStyle(style.navitem.default);
    this.currentSelectedOption = menuIndex; 
    this.menuNodes[menuIndex].setStyle(style.navitem.hover);
  },

	update: function () {
    var that = this;
    var menuItemsLength = this.menuNodes.length - 1;
    this.game.input.keyboard.onDownCallback = function(e){
      
      if(e.keyCode === that.keyActions.up) {
        var indexValue = that.currentSelectedOption - 1; 
        if(that.currentSelectedOption - 1 < 0) {
          that.setMenuItem(menuItemsLength);
        } else {
          that.setMenuItem(indexValue);
        }
      }

      if(e.keyCode === that.keyActions.down) {
        var indexValue = that.currentSelectedOption + 1; 
        if(indexValue > menuItemsLength) {
          that.setMenuItem(0);
        } else {
          that.setMenuItem(indexValue);
        }
      }

      if(e.keyCode === that.keyActions.spacebar) {
        that.game.state.start(that.menuNodes[that.currentSelectedOption].navState);
      }

    }
  }

};

Phaser.Utils.mixinPrototype(Menu.prototype, utils);