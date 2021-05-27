class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        // load images
        this.load.image('title', 'assets/title.png')
    }
    
    create() {
        this.titleScreen = this.add.tileSprite(0, 0, 1180, 720, 'title').setOrigin(0, 0);

        // define keys
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.transition({
                target: 'instructionScene',
                duration: 2000,
                moveBelow: true,
                onUpdate: this.transitionOut,
            });
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.scene.start('firstLevel');
        }

    }

    transitionOut(progress) {
        this.titleScreen.x = (1180 * progress);
    }
}
