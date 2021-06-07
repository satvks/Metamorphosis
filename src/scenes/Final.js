class Final extends Phaser.Scene {
    constructor() {
        super("finalScene");
    }
    preload ()
    {
        this.load.image('Bg', 'assets/world/FinalBg.png');
        this.load.spritesheet('butterfly', 'assets/sprites/ButterFlyMoveFinal.png', { frameWidth: 300, frameHeight: 200 });
    }

    create ()
    {
        this.background = this.add.image(500, 500,'Bg').setOrigin(0, 0);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        this.animation = this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('butterfly'),
            frameRate: 2
        });

        this.sprite = this.add.sprite(50, 300, 'butterfly').setScale(1);

        sprite.play({ key: 'fly', repeat: -1 });

        this.tweens.add({
            targets: sprite,
            x: 1500,
            duration: 10000,
            ease: 'Linear'
        });

        sprite.on('animationrepeat', function () {

        }, this);
    }

    update()
    {
        if(Phaser.Input.Keyboard.JustDown(keyM)) {
            this.sound.play('menuButton', { volume: 0.5});
            console.log("played sound");
            this.scene.start('menuScene');
        }
    }
}
