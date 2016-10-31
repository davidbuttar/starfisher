var Leaderboard = function() {};


Leaderboard.prototype = {
  
  init: function () {
    this.titleText = game.make.text(game.world.centerX, 100, "High Scores", {
      font: 'bold 60pt TheMinion',
      fill: '#FDFFB5',
      align: 'center'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);
    this.optionCount = 1;

    this.leaderboard = JSON.parse(localStorage.getItem( 'leaderboard'));
    this.spacebarKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  },
	
	create: function(){
    var leadersCount = 0;
    
		game.add.tileSprite(0, 0, game.width, game.height, 'space');
    game.add.existing(this.titleText);

    this.leaderboard.sort(function(a, b) {
      return parseFloat(b.score) - parseFloat(a.score);
    });

    this.leaderboard.forEach(function (item) {
      var that = this;

      var style = {
          font: '30pt TheMinion',
          srokeThickness: 4,
          align: 'left',
          fill: 'white',
          tabs: 350
        }

      var txt = game.add.text(game.world.centerX + 150, 
        (leadersCount * 80) + 340, 
        (item.name + '\t' + item.score),
        style 
        );
      
      txt.anchor.setTo(0.5);
      txt.inputEnabled = true;

      leadersCount++;
    });

    var backToMenu = game.add.text(game.world.centerX, 
        (leadersCount * 80) + 400, 
        'Hit Spacebar for Main Menu', 
        {
          font: '30pt TheMinion',
          srokeThickness: 4,
          align: 'left',
          fill: 'red'
        });
      
      backToMenu.anchor.setTo(0.5);
      backToMenu.inputEnabled = true;

      backToMenu.events.onInputUp.add(function(){
        game.state.start('Menu');
      });

      this.spacebarKey.onDown.add(this.goBack, this);
	},

  goBack: function(){
    game.state.start('Menu');
  },

  shutdown: function() {
    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.SPACEBAR);
  }
};