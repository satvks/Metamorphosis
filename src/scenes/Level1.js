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
        
        this.worm.setCollideWorldBounds(false);
        // have camera follow worm
        // startFollow(target [, roundPixels] [, lerpX] [, lerpY] [, offsetX] [, offsetY])
        this.cameras.main.startFollow(this.worm, true, 0.1, 0.1);
        // set camera dead zone
        this.cameras.main.setDeadzone(300, 300);
        this.cameras.main.setName("mainCam");

        // animations
        // worm movement (right)
        // left worm mvmnt uses flipped right.
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('move', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'right2',
            frames: this.anims.generateFrameNumbers('move', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: 0
        });

        // KEYBOARD INPUTS
        cursors = this.input.keyboard.createCursorKeys();
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        //this.shiftPressed = false;
        this.shiftReleased = true;
        this.shiftObj = this.input.keyboard.addKey('shift');  // Get key object
        // this.shiftObj.on('down', function(event) {
        //     this.shiftReleased = false;
        //     // console.log("state change Shift unReleased");
        // });
        this.shiftObj.on('up', function(event) {
            this.shiftReleased = true;
            console.log(this.shiftReleased);
             console.log("state change Shift Released");
        });

        //this.input.keyboard.on('JustDown-shift', this.moveWorm());
        //this.controlsChecker(); // checks state of shift

        this.gameOver = false;


    }

    update() {
        if(this.gameOver) {
            console.log('you lose');
            this.scene.start('menuScene');
        }
        if(this.energy > 0){
            // if shift has once been released, it may be pressed for movement.
            console.log(this.shiftReleased);
            if(cursors.shift.isDown && this.shiftReleased) { // to move again, release must be true.
                this.worm.immovable = true;
                //  this.shiftReleased = false;
                // moving left
                //console.log("keypress shift")
                if (Phaser.Input.Keyboard.JustDown(cursors.left)) {
                    //console.log("keypress left");
                    this.worm.immovable = false;

                    //this.worm.setVelocityX(-160);
                    
                    this.worm.flipX = true;
                    this.worm.anims.play('right', true);
                    this.worm.setVelocityX(-160);
                    this.worm.on('animationcomplete', () => {
                        this.worm.setVelocityX(0);
                        this.shiftReleased = false;
                    });

                    this.energy -= .1;
                    this.energyAmount.text = Math.round(this.energy);
                }
                // moving right
                else if (Phaser.Input.Keyboard.JustDown(cursors.right)) {
                    //console.log("keypress right");
                    this.worm.immovable = false;

                    this.worm.setVelocityX(160);
                    this.worm.flipX = false;
                    this.worm.anims.play('right', true);
                    this.worm.on('animationcomplete', () => {
                        this.worm.setVelocityX(0);
                        this.shiftReleased = false;
                    });
                    
                    this.energy -= .1;
                    this.energyAmount.text = Math.round(this.energy);
                }
            }
            // sitting still
            else if(/*Phaser.Input.Keyboard.JustUp(cursors.shift)*/cursors.shift.isUp)
            {
                this.energy -=.02;
                this.energyAmount.text = Math.round(this.energy);
                //this.worm.anims.play('turn');
                this.shiftReleased = true;
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
