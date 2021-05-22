class Instructions extends Phaser.Scene {
    constructor() {
        super("instructionScene");
    }
    preload() {
        // load images
        this.load.image('instructions', 'assets/instructions_2.png');
    }

    create() {
        this.instructionScreen = this.add.tileSprite(0, 0, 900, 500, 'instructions').setOrigin(0, 0);

        // define keys
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.scene.start('menuScene');
        }
    }
}
