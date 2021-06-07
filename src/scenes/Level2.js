class Level2 extends Phaser.Scene {
    constructor() {
        super("firstLevel");
    }
/* Game May Contain Multiple Levels. Name Subject to Change */
    preload() {
        this.load.image('background', 'assets/world/Level2.png'); // big wan
        this.load.image('leaf', 'assets/world/Leaf.png');
        this.load.image('tulip1', 'assets/world/Tulip1.png');   // dimensions for all is 350x500
        this.load.image('tulip2', 'assets/world/Tulip2.png');
        this.load.image('rose', 'assets/world/Rose.png');
        this.load.image('spider', 'assets/sprites/level_1_spider.png'); //309x470
        //Tulips and Rose.
        //Inchworm ART
        this.load.spritesheet('move', 'assets/sprites/InchMovementFinal.png', {frameWidth: 125, frameHeight: 125}); //invalid frame width.

        //SOUND
        this.load.audio('music', 'assets/sounds/MetamorphosisGardenTheme.wav');
    }

    create() {
        // WORLD LAYOUT/SETUP
        this.background = this.add.image(0, -390,'background').setOrigin(0, 0);
        this.music = this.sound.add('music', {volume: 0.25, loop: true});
        this.music.play();

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

        // leaf group
        this.leaves = this.add.group();
        //this.leaf = this.add.image(250, 540, 'leaf').setOrigin(0, 0); //sample Leaf

        //this.physics.add.overlap(sprite, healthGroup, this.eatLeaf); sample code 4 roses
        //this.add.image(350, 540, 'leaf').setOrigin(0, 0);
        this.loadLevel();

        // // tulip and rose prefab
        // this.tulip1 = this.add.image(250, 410, 'tulip1');
        // this.tulip2 = this.add.image(-10, 10, 'tulip2');
        // this.rose  = this.add.image(-10, -10, 'rose');

        // SPIDER
        this.spider = new Spider2(
            this,
            10,
            10,
            'spider'
        );

        // WORM DEFINED + CAMERA FOLLOW
        this.worm = this.physics.add.sprite(100, 615, 'move');

        this.worm.setBounce(0.2);
        this.worm.body.setSize(90, 90, 5, 5);

        // configure main camera (bg image is 3000x3000)
        this.cameras.main.setBounds(0, 0, 3540, 3540);
        this.cameras.main.setZoom(0.85);
        
        this.worm.setCollideWorldBounds(false);
        // have camera follow worm
        // startFollow(target [, roundPixels] [, lerpX] [, lerpY] [, offsetX] [, offsetY])
        this.cameras.main.startFollow(this.worm, true, 0.1, 0.1);
        // set camera dead zone
        this.cameras.main.setDeadzone(500, 500);
        //this.cameras.main.setName("mainCam");

        // WORM ANIMATIONS
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


        // KEYBOARD INPUT HANDLING ft. events
        cursors = this.input.keyboard.createCursorKeys();
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.shiftReleased = true;
        this.shiftObj = this.input.keyboard.addKey('shift');  // Get key object
        // this.shiftObj.on('down', function(event) {
        //     this.shiftReleased = false;
        //     // console.log("state change Shift unReleased");
        // });

        this.shiftObj.on('up', function(event) {
            this.shiftReleased = true;
            // console.log(this.shiftReleased);
            //  console.log("state change Shift Released");
        });

        //this.input.keyboard.on('JustDown-shift', this.moveWorm());
        //this.controlsChecker(); // checks state of shift

        this.gameOver = false;

    }

    update() {
        this.physics.world.collide(
            this.worm, 
            this.spider, 
            function() {
                this.gameOver = true;
            }, 
            null, 
            this);

        if(this.gameOver) {
            this.music.stop(); // stop music
            console.log('you lose');
            this.worm.alpha = 0;
            this.time.addEvent({
                delay: 3000,
                loop: false,
                callback: () => {
                    this.scene.start("menuScene");
                }
            });
        }
        if(this.worm.x > 3550) {
            this.music.stop(); // stop music
            //do a fade transition
            //camera.fade(2500, 0, 0, 0, false, this.transitionCutscene)
        }
        
        if(this.energy > 0 || this.spider){
            // if shift has once been released, it may be pressed for movement.
            //console.log(this.shiftReleased);
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

                    this.energy -= 0.5;
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
                    
                    this.energy -= 0.5;
                    this.energyAmount.text = Math.round(this.energy);
                }
            } 
            else if(cursors.shift.isUp && this.shiftReleased == false) {       // on release
                this.energy -=.05;
                this.energyAmount.text = Math.round(this.energy);
                (this.worm.flipX == false) ? this.worm.setVelocityX(180) : this.worm.setVelocityX(-180);

                this.worm.anims.play('right2');
                this.worm.on('animationcomplete', () => {
                    this.worm.setVelocityX(0);
                    //this.shiftReleased = true;
                });
                this.shiftReleased = true;
            }
            else {
                this.energy -= .05;
                this.energyAmount.text = Math.round(this.energy);
                this.worm.setVelocityX(0);
                this.worm.anims.stop();
            }

            this.leaves.getChildren().forEach(function(leaf) {
                // consume
                if(Phaser.Input.Keyboard.JustDown(keyE) && 
                this.worm.x < leaf.x + leaf.width &&
                this.worm.x + this.worm.width > leaf.x) {
                    leaf.destroy();
                    this.energy += 10;
                    this.energyAmount.text = Math.round(this.energy);
                    console.log(this.leaves.children);
                }
            }, this); 
        }
        else {
            this.gameOver = true;
        }
    }

    // Loads in Tulips and Roses
    loadLevel() {
        // random int between [0,3), decides flower type
        for(let xpos = 245; xpos < 3550; xpos += 1120) {
            this.leaves.create(xpos + Phaser.Math.Between(10,200), 540, 'leaf').setOrigin(0,0);
        }
    }

    transitionCutscene() {
        console.log("cutsccene starts");
    }
}
