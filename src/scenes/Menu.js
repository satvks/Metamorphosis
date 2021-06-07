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
        this.titleScreen = this.add.tileSprite(0, 0, 1180, 720, 'title').setOrigin(0, 0);

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
