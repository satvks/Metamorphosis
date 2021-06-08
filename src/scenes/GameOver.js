class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOver");
    }
    preload() {
        this.load.image('gameOver', 'assets/menu/GameOver.png');
    }
    create() {
        this.background = this.add.tileSprite(0, 0, 1180, 720, 'gameOver').setOrigin(0, 0);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }
    update() {
        if(Phaser.Input.Keyboard.JustDown(keyM)) {
            this.scene.start("menuScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.start("firstLevel");
        }
    }
}