var GameTitle = function(game){};

GameTitle.prototype = {

	create: function(){
		var that = this;
		var playButton = game.add.button(game.width / 2, game.height / 2 + 100, "playbutton", function(){
			that.game.state.start("Main");
		});
		playButton.anchor.set(0.5);
	}

};