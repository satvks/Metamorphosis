class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() { 
        /* ur assets */
        this.load.image('metamorph', 'assets/metamorphosisTitle.png');
    }

    create() {
        /* create menu objects */
        let background = this.add.sprite(0, 0, 'metamorph').setOrigin(0, 0);
    }
}