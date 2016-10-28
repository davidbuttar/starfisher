/**
 * Scales a number correctly to map the screen pixel ratio.
 * @param value
 */
function scaleToPixelRatio(value) {
	return value*1;
}

var
	game = new Phaser.Game(scaleToPixelRatio(1600), scaleToPixelRatio(1080), Phaser.AUTO, 'game'),
	fontLoaded = false;


Boot = function(game) {};

  
Boot.prototype = {

	loadScripts: function () {
		game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
		game.load.script('utils',  'js/utils.js');
		game.load.script('wordBubbles',  'js/wordBubbles.js');
		game.load.script('generateWords',  'js/generateWords.js');
		game.load.script('Menu',  'js/menu.js');
		game.load.script('Leaderboard',  'js/leaderboard.js');
		game.load.script('Main',  'js/main.js');
		game.load.script('GameOver',  'js/gameover.js');
		game.load.script('asteroids',  'js/asteroids.js');
		game.load.physics('physicsData', 'assets/sprites.json');
	},

	loadBgm: function () {
		// thanks Kevin Macleod at http://incompetech.com/
		game.load.audio('dangerous', 'assets/bgm/Dangerous.mp3');
	},
	// varios freebies found from google image search
	loadImages: function () {
		game.load.image('space', 'assets/space-bg.png');
		game.load.image('space2', 'assets/space-bg-2.png');
		game.load.image('bullet', 'assets/blast.png');
		game.load.image('rocket', 'assets/Rocket2.png');
		game.load.image('rocket', 'assets/Rocket3.png');
		game.load.image('bubble', 'assets/Star2.png');
		game.load.image('asteroid', 'assets/asteroid.png');
	},

	loadFonts: function () {
		WebFontConfig = {
			//  'active' means all requested fonts have finished loading
			//  We set a 1 second delay before calling 'createText'.
			//  For some reason if we don't the browser cannot render the text the first time it's created.
			active: function() {
				fontLoaded = true;
			},

			//  The Google Fonts we want to load (specify as many as you like in the array)
			google: {
				families: ['Nunito']
			},
			custom: {
				families: ['TheMinion'],
				urls: ['assets/style/theminion.css']
			}
		}
	},

	preload: function(){
		this.loadScripts();
		this.loadImages();
		this.loadFonts();
		this.loadBgm();
	},


	addGameStates: function () {

		//Add all states
		game.state.add("Menu", Menu);
		game.state.add("Leaderboard", Leaderboard);
		game.state.add("Main", Main);
		game.state.add("GameOver", GameOver);
	},

	addGameMusic: function () {
		music = game.add.audio('dangerous');
		music.loop = true;
		music.play();
	},
	
	create: function(){
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.addGameStates();
		this.addGameMusic();

		if(fontLoaded) {
			var that = this;
			setTimeout(function(){
				that.game.state.start("Main");
			},100);
		}else{
			setTimeout(this.game.state.states.Main.create, 10);
		}
	}
};

game.state.add('Boot', Boot);
game.state.start('Boot');