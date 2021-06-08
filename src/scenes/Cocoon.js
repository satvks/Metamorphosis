class Cocoon extends Phaser.Scene {
    constructor() {
        super("cocoonCutscene");
    }

    preload() {
        this.load.image('cocoon', 'assets/cocoon/cacoon_panels.png');
    }

    create() {
        this.cocoonImage = this.add.image(0, 0,'cocoon').setOrigin(0, 0);
        cursors = this.input.keyboard.createCursorKeys();

        this.input.keyboard.on('keydown-RIGHT', () => 
        {
            this.cameras.main.fadeOut(2500, 0, 0, 0);   // fadeout doesn't really work...?
            this.scene.start("finalScene");
        }, this);

    }
}
