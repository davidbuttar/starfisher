var Leaderboard = function() {};


Leaderboard.prototype = {
  
  init: function (playerData) {

    this.titleText = game.make.text(game.world.centerX, 100, "High Scores", {
      font: 'bold 60pt '+utils.FONT1,
      fill: utils.TEXTCOLOR1,
      align: 'center'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);
    this.optionCount = 1;

    this.leaderboard = JSON.parse(localStorage.getItem( 'leaderboard'));

    if(playerData) {
      this.leaderboard.push(playerData);
      localStorage.setItem('leaderboard', JSON.stringify(this.leaderboard));
    }


    this.spacebarKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  },
	
	create: function(){
    var leadersCount = 0;
    
		game.add.tileSprite(0, 0, game.width, game.height, 'space');
    game.add.existing(this.titleText);

    this.leaderboard.sort(function(a, b) {
      return parseFloat(b.score) - parseFloat(a.score);
    });

    var topTen = this.leaderboard.slice(0,10);

    topTen.forEach(function (item) {
      var nameExtract = item.email && item.email.substring(0, item.email.indexOf('@')) || item.email;
      var name = nameExtract ? nameExtract : 'ghost player';

      var style = {
          font: '25pt '+utils.FONT1,
          srokeThickness: 4,
          align: 'left',
          fill: 'white'
        };

      var txt = game.add.text(game.world.centerX,
        (leadersCount * 60) + 200,
        (name + ': ' + item.score),
        style 
        );
      
      txt.anchor.setTo(0.5);
      txt.inputEnabled = true;

      leadersCount++;
    });

    var backToMenu = game.add.text(game.world.centerX,
      game.world.height - 50,
        'Hit Spacebar for Main Menu', 
        {
          font: '30pt '+utils.FONT1,
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

    this.spacebarKey.onDown.add(this.goBack, this);
	},

  goBack: function(){
    game.state.start('Menu');
  },

  shutdown: function() {
    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.SPACEBAR);
  }
};