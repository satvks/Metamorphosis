class Instructions extends Phaser.Scene {
    constructor() {
        super("instructionScene");
    }
    preload() {
        // load images
        this.load.image('instructions', 'assets/menu/instructions.png');
        // sounds
        this.load.audio('menuButton', 'assets/sounds/MenuButtonSounds.wav');
    }

    create() {
        this.instructionScreen = this.add.tileSprite(0, 0, 1180, 720, 'instructions').setOrigin(0, 0);
        //this.transitionIn();
        // define keys
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.sound.play('menuButton', {volume: 0.3});
            //console.log("played sound");
            this.scene.transition({
                target: 'menuScene',
                duration: 2000,
                moveBelow: true,
                onUpdate: this.transitionOut,
            });
        }
    }
    
    transitionOut(progress) {
        this.instructionScreen.x = (1180 * progress);
    }
}
