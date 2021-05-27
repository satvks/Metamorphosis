class Level1 extends Phaser.Scene {
    constructor() {
        super("firstLevel");
    }
/* Game May Contain Multiple Levels. Name Subject to Change */
    preload() {
        this.load.image('room', 'assets/world/bans_bg1.png'); // big wan
        //Inchworm ART
        this.load.spritesheet('move', 'assets/sprites/InchMovementFinal.png', {frameWidth: 125, frameHeight: 125}); //invalid frame width.
        //SOUND
    }

    create() {
        this.add.image(0,0,'room').setOrigin(0,0);

        this.worm = this.physics.add.sprite(100, 200, 'move');

        this.worm.setBounce(0.2);
        this.worm.setCollideWorldBounds(true);

         // configure main camera (bg image is 3000x3000)
         this.cameras.main.setBounds(0, 0, 3540, 1440);
         this.cameras.main.setZoom(0.75);
         // have camera follow copter
         // startFollow(target [, roundPixels] [, lerpX] [, lerpY] [, offsetX] [, offsetY])
         this.cameras.main.startFollow(this.worm, true, 0.1, 0.1);
         // set camera dead zone
         this.cameras.main.setDeadzone(300, 300);
         this.cameras.main.setName("mainCam");

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
            this.worm.setVelocityX(-160);
            this.worm.flipX = true;

            this.worm.anims.play('right', true);
        }
        else if (cursors.right.isDown)
        {
            this.worm.setVelocityX(160);
            this.worm.flipX = false;

            this.worm.anims.play('right', true);
        }
        else
        {
            this.worm.setVelocityX(0);

            this.worm.anims.stop('right');
        }


    }

}
