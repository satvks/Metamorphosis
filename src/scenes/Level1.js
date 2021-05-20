class Level1 extends Phaser.Scene {
    constructor() {
        super("firstLevel");
    }
/* Game May Contain Multiple Levels. Name Subject to Change */
    preload() {
        /* need assets loaded here! */
    }

    create() {
        this.add.image(0,0,'room').setOrigin(0,0);

        worm = this.physics.add.sprite(100, 200, 'move');

        worm.setBounce(0.2);
        worm.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('move', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'move', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('move', { start: 5, end: 9 }),
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
