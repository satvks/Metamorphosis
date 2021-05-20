class Level1 extends Phaser.Scene {
    constructor() {
        super("firstLevel");
    }
/* Game May Contain Multiple Levels. Name Subject to Change */
    preload() {
        this.load.image('room', 'assets/world/bans_bg1.png'); // big wan
        //Inchworm ART
        this.load.spritesheet('move', 'assets/world/InchMovementFinal.png', {frameWidth: 125, frameHeight: 125}); //invalid frame width.
        //SOUND
    }

    create() {
        this.add.image(0,0,'room').setOrigin(0,0);

        worm = this.physics.add.sprite(100, 200, 'move');

        worm.setBounce(0.2);
        worm.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('move', { start: 9, end: 18 }),
            frameRate: 10,
            repeat: -1
        });


        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('move', { start: 0, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        cursors = this.input.keyboard.createCursorKeys();

    }

    update() {
        if (cursors.left.isDown) {
            worm.setVelocityX(-160);

            worm.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            worm.setVelocityX(160);

            worm.anims.play('right', true);
        }
        else
        {
            worm.setVelocityX(0);

            worm.anims.play('turn');
        }


    }

}
