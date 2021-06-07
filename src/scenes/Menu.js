class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        // load images
        this.load.image('title', 'assets/menu/title.png')
        this.load.audio('menuButton', 'assets/sounds/MenuButtonSound.wav');
    }
    
    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FFFFFF',
            color: '#111111',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }
        this.titleScreen = this.add.tileSprite(0, 0, 1180, 720, 'title').setOrigin(0, 0);
        this.add.text(game.config.width/1.5, 2*game.config.height/25, 
            'Game Made by:', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/1.3, 2*game.config.height/14, 
            'Satvik Srinivasan', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/1.33, 2*game.config.height/10, 
            'Shaurya Bansal', menuConfig).setOrigin(0.5);
         this.add.text(game.config.width/1.37, 2*game.config.height/7.8, 
            'Tate Pieper', menuConfig).setOrigin(0.5);

        // define keys
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.sound.play('menuButton', { volume: 0.3});
            console.log("played sound");
            this.scene.transition({
                target: 'instructionScene',
                duration: 2000,
                moveBelow: true,
                onUpdate: this.transitionOut,
            });
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.sound.play('menuButton', { volume: 0.5});
            console.log("played sound");
            this.scene.start('firstLevel');
        }

    }

    transitionOut(progress) {
        this.titleScreen.x = (1180 * progress);
    }
}
