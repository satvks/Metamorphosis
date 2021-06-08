class Final extends Phaser.Scene {
    constructor() {
        super("finalScene");
    }
    preload ()
    {
        this.load.image('Bg', 'assets/world/FinalBg.png');
        this.load.spritesheet('butterfly', 'assets/sprites/ButterFlyMoveFinal.png', { frameWidth: 300, frameHeight: 200 });
        this.load.audio('bgmusic', 'assets/sounds/NatureSound.wav');
    }

    create ()
    {
        this.background = this.add.tileSprite(0, 0, 1180, 720, 'Bg').setOrigin(0, 0);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        this.animation = this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('butterfly'),
            frameRate: 8
        });
        this.music = this.sound.add('bgmusic', {volume: 0.25, loop: true});
        this.music.play();

        this.sprite = this.add.sprite(50, 300, 'butterfly').setScale(1);

        this.sprite.play({ key: 'fly', repeat: -1 });

        this.tweens.add({
            targets: this.sprite,
            x: 1500,
            y: 0,
            duration: 7000,
            ease: 'Linear'
        });

        this.sprite.on('animationrepeat', function () {

        }, this);
    }

    update()
    {
        if(Phaser.Input.Keyboard.JustDown(keyM)) {
            this.sound.play('menuButton', { volume: 0.5});
            console.log("played sound");
            this.music.stop();
            this.scene.start('menuScene');
        }
    }
}
