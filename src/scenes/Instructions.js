class Instructions extends Phaser.Scene {
    constructor() {
        super("instructionScene");
    }
    preload() {
        // load images
        this.load.image('instructions', 'assets/instructions.png');
    }

    create() {
        this.instructionScreen = this.add.tileSprite(0, 0, 720, 1180, 'instructions_2').setOrigin(0, 0);

        // define keys
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.scene.start('menuScene');
        }
    }
}
