class Level1 extends Phaser.Scene {
    constructor() {
        super("firstLevel");
    }
/* Game May Contain Multiple Levels. Name Subject to Change */
    preload() {
        this.load.image('background', 'assets/world/Level2.png'); // big wan
        this.load.image('leaf', 'assets/world/Leaf.png');
        //Inchworm ART
        this.load.spritesheet('move', 'assets/sprites/InchMovementFinal.png', {frameWidth: 125, frameHeight: 125}); //invalid frame width.
        //SOUND
    }

    create() {
        // background image
        this.background = this.add.image(0, -390,'background').setOrigin(0, 0);

        this.hud = this.add.group();
        {
            // display energy bar and amount
            this.energy = 100;
            this.energyText = this.add.text(20, 460, 'ENERGY:');
            this.energyAmount = this.add.text(100, 460, this.energy);
            this.energyText.setScrollFactor(0);
            this.energyAmount.setScrollFactor(0);
            this.hud.addMultiple([this.energyAmount, this.energyText]);

        }
        // consumables
        this.leaf = this.add.image(250, 540, 'leaf').setOrigin(0, 0);

        // place controlable worm
        this.worm = this.physics.add.sprite(100, 615, 'move');

        this.worm.setBounce(0.2);

        // configure main camera (bg image is 3000x3000)
        this.cameras.main.setBounds(0, 0, 3540, 3540);
        this.cameras.main.setZoom(0.75);
        
        this.worm.setCollideWorldBounds(true);
        // have camera follow worm
        // startFollow(target [, roundPixels] [, lerpX] [, lerpY] [, offsetX] [, offsetY])
        this.cameras.main.startFollow(this.worm, true, 0.1, 0.1);
        // set camera dead zone
        this.cameras.main.setDeadzone(300, 300);
        this.cameras.main.setName("mainCam");

        // right worm movement
        // left worm mvmnt uses flipped right.
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('move', { start: 0, end: 8 }),
            frameRate: 10,
            repeat: 0
        });

        cursors = this.input.keyboard.createCursorKeys();
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        this.gameOver = false;
    }

    update() {
        if(this.gameOver) {
            console.log('you lose');
            this.scene.start('menuScene');
        }
        if(this.energy > 0){
            // moving left
            if (cursors.left.isDown) {
                this.worm.setVelocityX(-160);

                this.worm.flipX = true;
                this.worm.anims.play('right', true);
                this.energy -= .1;
                this.energyAmount.text = Math.round(this.energy);
            }
            // moving right
            else if (cursors.right.isDown)
            {
                this.worm.setVelocityX(160);

                this.worm.flipX = false;
                this.worm.anims.play('right', true);
                this.energy -= .1;
                this.energyAmount.text = Math.round(this.energy);
            }
            // sitting still
            else
            {
                this.worm.setVelocityX(0);
                this.energy -=.02;
                this.energyAmount.text = Math.round(this.energy);
                //this.worm.anims.play('turn');
            }

            // consume
            if(Phaser.Input.Keyboard.JustDown(keyE) && 
            this.worm.x < this.leaf.x + this.leaf.width &&
            this.worm.x + this.worm.width > this.leaf.x) {
                this.leaf.alpha = 0;
                this.energy += 10;
                this.energyAmount.text = Math.round(this.energy);
            }
        }
        else {
            this.gameOver = true;
        }
    }

}
