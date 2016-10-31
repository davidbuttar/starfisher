var fontLoaded = false;

Splash = function(game) {};

Splash.prototype = {

  init: function () {
    game.add.tileSprite(0, 0, game.width, game.height, 'space');
    this.loadingBar = game.make.sprite(game.world.centerX-(387/2), 400, "loading");
    this.logo       = game.make.sprite(game.world.centerX, 200, 'brand');
    this.status     = game.make.text(game.world.centerX, 380, 'Loading...', {fill: 'white'});
    utils.centerGameObjects([this.logo, this.status]);
  },

	loadScripts: function () {
		game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
		game.load.script('wordBubbles',  'js/wordBubbles.js');
		game.load.script('generateWords',  'js/generateWords.js');
		game.load.script('asteroids',  'js/asteroids.js');
		game.load.physics('physicsData', 'assets/sprites.json');
		game.load.script('Menu',  'js/menu.js');
		game.load.script('Leaderboard',  'js/leaderboard.js');
		game.load.script('Main',  'js/main.js');
		game.load.script('GameOver',  'js/gameover.js');
		game.load.script('style',  'js/style.js');
		game.load.script('GameState',  'js/GameState.js');
	},

	loadBgm: function () {
		game.load.audio('dangerous', 'assets/bgm/Dangerous.mp3');
	},
	loadImages: function () {

		game.load.image('bullet', 'assets/blast.png');
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
    game.add.existing(this.logo).scale.setTo(0.5);
    game.add.existing(this.loadingBar);
    game.add.existing(this.status);
    this.load.setPreloadSprite(this.loadingBar);
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
    this.status.setText('Ready!');
		this.addGameStates();
		this.addGameMusic();
		
    if(fontLoaded) {
			setTimeout(function(){
				game.time.advancedTiming = true;
				game.state.start("Menu");
			},100);
		}else{
			setTimeout(game.state.states.Boot.create, 10);
		}
	}
};