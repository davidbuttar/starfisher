Splash = function (game) {
    var that = {};
    
    that.init =  function () {
        game.add.tileSprite(0, 0, game.width, game.height, 'atlas', 'space0000');
        that.loadingBar = game.make.sprite(game.world.centerX - (387 / 2), 400, "loading");
        that.logo = game.make.sprite(game.world.centerX, 200, 'brand');
        that.status = game.make.text(game.world.centerX, 380, 'Loading...', {fill: 'white'});
        utils.centerGameObjects([that.logo, that.status]);

    };

    that.loadScripts = function () {

    };

    that.loadBgm = function () {
        game.load.audio('dangerous', 'assets/bgm/Dangerous.mp3');
        game.load.audio('blaster', 'assets/bgm/blaster.mp3');
        game.load.audio('thrusters', 'assets/bgm/ship_thrusters.ogg');
        game.load.audio('bonus', 'assets/bgm/bonus.ogg');
    };
    
    that.loadImages = function () {

    };

    that.loadFonts = function () {
        WebFontConfig = {
            //  'active' means all requested fonts have finished loading
            //  We set a 1 second delay before calling 'createText'.
            //  For some reason if we don't the browser cannot render the text the first time it's created.
            active: function () {
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
    };

    that.preload = function () {
        game.add.existing(that.logo).scale.setTo(0.5);
        game.add.existing(that.loadingBar);
        game.add.existing(that.status);
        game.load.setPreloadSprite(that.loadingBar);
        that.loadScripts();
        that.loadImages();
        that.loadFonts();
        that.loadBgm();
    };

    that.addGameStates =  function () {
        //Add all states
        game.state.add("Menu", Menu);
        game.state.add("Leaderboard", Leaderboard);
        game.state.add("Credits", Credits);
        game.state.add("FinalScore", FinalScore);
        game.state.add("Main", Main);
        game.state.add("GameOver", GameOver);
        game.state.add("GameIntro", GameIntro);
    };

    that.addGameMusic = function () {
        /*music = game.add.audio('dangerous');
        music.loop = true;
        music.play();*/
    };

    that.create = function () {
        that.addGameStates();
        that.addGameMusic();

        if (fontLoaded) {
            setTimeout(function () {
                that.status.setText('Ready!');
                game.time.advancedTiming = true;
                game.state.start("Menu");
            }, 100);
        } else {
            setTimeout(game.state.states.Splash.create, 10);
        }
    };

    return that;
};