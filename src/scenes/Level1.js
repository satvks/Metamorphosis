class Level1 extends Phaser.Scene {    
    constructor() {
        super("firstLevel");
    }
    preload() {
        // load images
        this.load.image('background', 'assets/level_1/level_1_background.png');
        this.load.image('egg', 'assets/level_1/egg.png');
        this.load.image('eggCracked1', 'assets/level_1/egg_crack_1.png');
        this.load.image('eggCracked2', 'assets/level_1/egg_crack_2.png');
        this.load.image('eggCracked3', 'assets/level_1/egg_crack_3.png');
        this.load.image('eggHatched', 'assets/level_1/egg_hatched.png');
        this.load.image('crack', 'assets/level_1/egg_shell.png');
        this.load.image('spider', 'assets/level_1/level_1_spider.png');

        // load spritesheets
        // inchworm hatch
        this.load.spritesheet('launch', 'assets/level_1/breaking_out.png', {frameWidth: 15, frameHeight: 400, frameStart: 0,
            frameEnd: 24});

        // button presses
        this.load.spritesheet('buttonW', 'assets/level_1/button_W.png', {frameWidth: 200, frameHeight: 200, frameStart: 0,
            frameEnd: 1});
        this.load.spritesheet('buttonA', 'assets/level_1/button_A.png', {frameWidth: 200, frameHeight: 200, frameStart: 0,
            frameEnd: 1});
        this.load.spritesheet('buttonS', 'assets/level_1/button_S.png', {frameWidth: 200, frameHeight: 200, frameStart: 0,
            frameEnd: 1});
        this.load.spritesheet('buttonD', 'assets/level_1/button_D.png', {frameWidth: 200, frameHeight: 200, frameStart: 0,
            frameEnd: 1});

        // music
        this.load.audio('eggMusic', 'assets/sounds/EggMusic.wav');
    }
    create() {
        //LOCAL VARIABLES
        this.eggHatched = false; // Tate Keys
        this.eggEaten = false;
        this.hatchProgress = 0;
        this.quickButtons = [];
        this.animPlaying = false;

        // background images and sprites
        this.background = this.add.tileSprite(0, 0, 1180, 720, 'background').setOrigin(0, 0);
        this.music = this.sound.add('eggMusic', { volume: 0.29, loop: true});
        this.music.play();
        this.egg = this.add.tileSprite(480, 546, 15, 20, 'egg');
        this.cracked1 = this.add.tileSprite(480, 546, 15, 20, 'eggCracked1');
        this.cracked2 = this.add.tileSprite(480, 546, 15, 20, 'eggCracked2');
        this.cracked3 = this.add.tileSprite(480, 546, 15, 20, 'eggCracked3');
        this.hatched = this.add.tileSprite(480, 546, 15, 20, 'eggHatched');

        // animation config
        this.anims.create({
            key: 'pow',
            frames: this.anims.generateFrameNumbers('launch', {start: 0, end: 24, first: 0}),
            frameRate: 30
        })
        this.anims.create({
            key: 'W',
            frames: this.anims.generateFrameNumbers('buttonW', {start: 0, end: 1, first: 0}),
            frameRate: 3,
            delay: 200,
            hideOnComplete: true,
            repeat: -1
        })
        this.anims.create({
            key: 'A',
            frames: this.anims.generateFrameNumbers('buttonA', {start: 0, end: 1, first: 0}),
            frameRate: 3,
            hideOnComplete: true,
            repeat: -1
        })
        this.anims.create({
            key: 'S',
            frames: this.anims.generateFrameNumbers('buttonS', {start: 0, end: 1, first: 0}),
            frameRate: 3,
            hideOnComplete: true,
            repeat: -1
        })
        this.anims.create({
            key: 'D',
            frames: this.anims.generateFrameNumbers('buttonD', {start: 0, end: 1, first: 0}),
            frameRate: 3,
            hideOnComplete: true,
            repeat: -1
        })

        // hide necessary egg frames
        this.cracked1.alpha = 0;
        this.cracked2.alpha = 0;
        this.cracked3.alpha = 0;
        this.hatched.alpha = 0;

        // define keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // create quick time event button sequence (randomizes each time)
        for(let i = 0; i < 10; i++) {
            let temp = Math.floor(Math.random() *  (3 - 0 + 1)) + 0;
            this.quickButtons.push(temp);
            
            // replacing number with letter value
            if(this.quickButtons[i] == 0) {
                this.quickButtons[i] = "W";
            } else if (this.quickButtons[i] == 1) {
                this.quickButtons[i] = "A";
            } else if (this.quickButtons[i] == 2) {
                this.quickButtons[i] = "S";
            } else {
                this.quickButtons[i] = "D";
            }
        }
        console.log(this.quickButtons);

        // create key combo for quick time event
        this.combo = this.input.keyboard.createCombo(this.quickButtons, {
            resetOnWrongKey: false,
            maxKeyDelay: 0
        }); 
        this.input.keyboard.on('keycombomatch', function(event) {
            this.eggHatched = true;
            console.log("Quick time event complete!");
        });

        // particles depicting egg hatching (constant)
        this.particles = this.add.particles('crack');
        this.smallCrack = this.particles.createEmitter({
            x: this.egg.x,
            y: this.egg.y,
            speed: 50,
            gravityX: 0,
            gravityY: 150,
            scale: 0.4,
            lifespan: 300,
            quantity: 2,
            frequency: 1500
            
        });

        // particles depicting egg hatching (on button press)
        this.bigCrack = this.particles.createEmitter({
            x: this.egg.x,
            y: this.egg.y,
            speed: 70,
            gravityX: 0,
            gravityY: 150,
            scale: 0.5,
            lifespan: 300,
            quantity: 6
        })
        this.bigCrack.pause();

        this.spider = new Spider(this, 480, 100, 'spider', 0, -0.5);

        cursors = this.input.keyboard.createCursorKeys();
    }
    update() {
        if(Phaser.Input.Keyboard.JustDown(cursors.space)) { 
            this.music.stop();
            this.scene.start('cocoonCutscene')};

        if(!this.eggHatched && !this.eggEaten){
            this.spider.update();

            // check if spider has made it to the egg
            this.checkCollision();

            // give player quick time event button prompt
            this.buttonPrompt(this.combo, this.animPlaying);
            this.animPlaying = true;

            // check if they press the correct button
            this.hatchProgress = this.combo.progress * 10 + 1;

            // display egg hatching progress
            if(this.hatchProgress == 3) {
                this.egg.alpha = 0;
                this.cracked1.alpha = 1;
            }
            else if(this.hatchProgress == 5) {
                this.cracked1.alpha = 0;
                this.cracked2.alpha = 1;
            }
            else if(this.hatchProgress == 8) {
                this.cracked2.alpha = 0;
                this.cracked3.alpha = 1;
            }
            else if(this.hatchProgress == 10) {
                this.cracked3.alpha = 0;
                this.hatched.alpha = 1;
                this.smallCrack.pause();
                this.eggHatched = true;
                let wormBirth = this.add.sprite(this.egg.x - 8, this.egg.y / 1.5, 'launch').setOrigin(0, 0);
                wormBirth.anims.play('pow');
                wormBirth.on('animationcomplete', () => {
                    this.music.stop();
                    this.scene.start('secondLevel');
                    this.scene.stop('firstLevel');
                })
            }
        } 
    }

    checkCollision() {
        if(this.spider.y > 440){
            this.eggEaten =  true;
            this.music.stop();
            this.scene.start('gameOver');
        }    
        else {
            return false;
        }
    }
    buttonPrompt(letters, anim) {
        let val = letters.current;
        let pressThis;

        // check the current keycode of the array and play appropriate animation to prompt the 
        // player wich button to press
        if(letters.current == 65) {
            pressThis = this.add.sprite(600, 200, 'buttonA').setOrigin(0, 0);
            if(!anim) {
                pressThis.anims.play('A');
                //anim = true;
                console.log(" Press A!");
            }

        } else if(val == 68) {
            pressThis = this.add.sprite(600, 200, 'buttonD').setOrigin(0, 0);
            if(!anim) {
                pressThis.anims.play('D');
                //anim = true;
                console.log(" Press D!");
            }

        } else if(val == 83) {
            pressThis = this.add.sprite(600, 200, 'buttonS').setOrigin(0, 0);
            if(!anim) {
                pressThis.anims.play('S');
                //anim = true;
                console.log(" Press S!");
            }

        } else if(val == 87) {
            pressThis = this.add.sprite(600, 200, 'buttonW').setOrigin(0, 0);
            if(!anim) {
                pressThis.anims.play('W');
                //anim = true;
                console.log(" Press W!");
            }
        }
    }
   
    // particle effect for correct button press
    emitOnce(emit) {
        emit.explode(4);
        emit.resume();
        this.hatchProgress++;
        console.log("Crack!");
    }
}
