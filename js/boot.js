/**
 * Scales a number correctly to map the screen pixel ratio.
 * @param value
 */
function scaleToPixelRatio(value) {
	return value*1;
}

var game = new Phaser.Game(scaleToPixelRatio(1600), scaleToPixelRatio(1080), Phaser.AUTO, 'game'),

Boot = function(game) {};

  
Boot.prototype = {

	preload: function(){
    game.load.image('loading',  'assets/loading.png');
    game.load.image('brand',    'assets/logo.png');
    game.load.script('utils',   'js/utils.js');
    game.load.script('splash',  'js/splash.js');
		game.load.image('space', 'assets/space-bg.png');
		game.load.image('space2', 'assets/space-bg-2.png');

		var leaderboard = [{name: 'david', score: 500},{name: 'krish', score: 1000},{name: 'tiago', score: 700}];
		
		if(localStorage.getItem( 'leaderboard') === null){
      localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
  	}
	},
	
	create: function(){
		game.state.add('Splash', Splash);
    game.state.start('Splash');
	}
};

game.state.add('Boot', Boot);
game.state.start('Boot');