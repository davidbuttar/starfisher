var Preload = function(game){};

Preload.prototype = {

	preload: function(){
        game.load.image('space', 'assets/background.jpg');
        game.load.image('bullet', 'assets/blast.png');
        game.load.image('ship', 'assets/ship2.png');
		game.load.image('rocket', 'assets/Rocket.png');
		game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
		game.load.image('bubble', 'assets/Star.png');
		game.load.physics('physicsData', 'assets/sprites.json');
	},

	create: function(){
		if(fontLoaded) {
			this.game.state.start("Main");
		}else{
			setTimeout(this.game.state.states.Preload.create, 10);
		}
	}
}