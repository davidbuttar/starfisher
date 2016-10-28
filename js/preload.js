var Preload = function(game){};

Preload.prototype = {

	preload: function(){
        game.load.image('space', 'assets/space-bg.png');
		game.load.image('space2', 'assets/space-bg-2.png');
        game.load.image('bullet', 'assets/blast.png');
        game.load.image('ship', 'assets/ship2.png');
		game.load.image('rocket', 'assets/Rocket2.png');
		game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
		game.load.image('bubble', 'assets/Star2.png');
		game.load.image('asteroid', 'assets/asteroid.png');
		game.load.physics('physicsData', 'assets/sprites.json');
	},

	create: function(){
		if(fontLoaded) {
			var that = this;
			setTimeout(function(){
				game.time.advancedTiming = true;
				that.game.state.start("Main");
			},100);
		}else{
			setTimeout(this.game.state.states.Preload.create, 10);
		}
	}
}