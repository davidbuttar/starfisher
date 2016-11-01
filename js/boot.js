/**
 * Scales a number correctly to map the screen pixel ratio.
 * @param value
 */
function scaleToPixelRatio(value) {
    return value * 1;
}

var game = new Phaser.Game(scaleToPixelRatio(1600), scaleToPixelRatio(1080), Phaser.AUTO, 'game');

Boot = function (game) {};

Boot.prototype = {

    preload: function () {
        game.load.image('loading', 'assets/loading.png');
        game.load.image('brand', 'assets/logo.png');
        game.load.script('utils', 'js/utils.js');
        game.load.script('splash', 'js/splash.js');
        game.load.image('space', 'assets/space-bg.png');
        game.load.image('space2', 'assets/space-bg-2.png');
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        game.load.script('wordBubbles', 'js/wordBubbles.js');
        game.load.script('generateWords', 'js/generateWords.js');
        game.load.script('asteroids', 'js/asteroids.js');
        game.load.physics('physicsData', 'assets/sprites.json');
        game.load.script('Menu', 'js/menu.js');
        game.load.script('Leaderboard', 'js/leaderboard.js');
        game.load.script('FinalScore', 'js/finalScore.js');
        game.load.script('Main', 'js/main.js');
        game.load.script('GameOver', 'js/gameover.js');
        game.load.script('style', 'js/style.js');
        game.load.script('GameState', 'js/gameState.js');
        game.load.script('GameIntro', 'js/gameIntro.js');
        game.load.script('Credits', 'js/credits.js');

        var leaderboard = [{email: 'david', score: 500}, {email: 'krish', score: 1000}, {email: 'tiago', score: 700}];

        if (localStorage.getItem('leaderboard') === null) {
            localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
        }
    },

    create: function () {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.state.add('Splash', Splash);
        game.state.start('Splash');
    }
};

game.state.add('Boot', Boot);
game.state.start('Boot');