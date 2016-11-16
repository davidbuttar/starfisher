var GameIntro = function (game) {
};


GameIntro.prototype = {

    init: function () {

        if(utils.SKIP_EMAIL){
            game.state.start('Main', true, false, {email:'test', subject:'clinton'});
            return;
        }


        this.titleText = game.make.text(game.world.centerX, 100, "Content Bombardment", {
            font: 'bold 60pt ' + utils.FONT1,
            fill: utils.TEXTCOLOR1,
            align: 'center'
        });
        this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        this.titleText.anchor.set(0.5);
        this.spacebarKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        game.add.plugin(Fabrique.Plugins.InputField);

        document.getElementById( 'user-data' ).style.display = 'block';
        document.getElementById("email").value = '';
    },

    addInputs: function () {
        this.emailText = game.make.text(game.world.centerX, 260, "Your Email", {
            font: 'bold 30pt ' + utils.FONT1,
            fill: '#fff',
            align: 'center'
        });

        this.contentText = game.make.text(game.world.centerX, 450, "Your Topic", {
            font: 'bold 30pt ' + utils.FONT1,
            fill: '#fff',
            align: 'center'
        });

        this.playActionText = game.make.text(game.world.centerX, 800, "Start", {
            font: 'bold 30pt ' + utils.FONT1,
            fill: 'red',
            align: 'center'
        });

        this.backToMenuText = game.make.text(game.world.centerX, 700, "Back to menu", {
            font: 'bold 30pt ' + utils.FONT1,
            fill: 'white',
            align: 'center'
        });

        this.backToMenuText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        this.backToMenuText.anchor.set(0.5);
        this.emailText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        this.emailText.anchor.set(0.5);
        this.contentText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        this.contentText.anchor.set(0.5);
        this.playActionText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        this.playActionText.anchor.set(0.5);

        game.add.existing(this.emailText);
        game.add.existing(this.contentText);
        game.add.existing(this.playActionText);
        game.add.existing(this.backToMenuText);

        this.playActionText.inputEnabled = true;
        this.backToMenuText.inputEnabled = true;
    },

    create: function () {
        game.add.tileSprite(0, 0, game.width, game.height, 'atlas', 'space0000');

        game.stage.disableVisibilityChange = true;
        game.add.existing(this.titleText);

        this.spacebarKey.onDown.add(this.startGame, this);

        this.addInputs();

        this.playActionText.visible = false;

        this.playActionText.events.onInputUp.add(this.startGame, this);

        this.backToMenuText.events.onInputUp.add(function () {
            game.state.start('Menu');
        });

        this.playActionText.alpha = 0;
        game.add.tween(this.playActionText).to({alpha: 1}, 500, Phaser.Easing.Linear.None, true, 0, 250, true);
    },

    startGame: function () {
        if (document.getElementById("email").value && document.getElementById("topic").value) {
            var player = {
                email: document.getElementById("email").value,
                subject: document.getElementById("topic").value
            };

            game.state.start('Main', true, false, player);
            document.getElementById( 'user-data' ).style.display = 'none';
        }
    },

    showPlayAction: function () {
        this.playActionText.visible = document.getElementById("email").value && document.getElementById("topic").value;
    },

    update: function () {
        this.showPlayAction();
    },

    shutdown: function () {
        game.input.keyboard.removeKeyCapture(Phaser.Keyboard.SPACEBAR);
    }

};

Phaser.Utils.mixinPrototype(Menu.prototype, utils);