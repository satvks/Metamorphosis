class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        // load images
        this.load.image('title', 'assets/title.png')
    }
    
    create() {
        this.titleScreen = this.add.tileSprite(0, 0, 900, 500, 'title').setOrigin(0, 0);

        // define keys
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start('instructionScene');
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.scene.start('playScene');
        }

    }
}
