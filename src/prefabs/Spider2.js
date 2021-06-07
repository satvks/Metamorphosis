class Spider2 extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {  // scene - Menu/Play, (x, y)
        super(scene, x, y, texture, frame);     // texture - prefab, frame - state?
        scene.add.existing(this);
        console.log("spider created");
        this.create();
        scene.physics.add.existing(this);       // add to physics system
        //local variables
        //this.spiderUI = scene.sound.add(''); // add rocket sfx
       // this.spiderUI.volume = 0.30;
    }

    create() {
        console.log("create called")
        this.delay = Phaser.Math.Between(500,1200)
        this.timedEvent = this.scene.time.delayedCall(this.delay, () => { 
            this.spawnSpider(); 
        });
        this.looper = this.scene.time.addEvent({     // Interesting Dynamic occurs when uncommented...
            delay: 5000,                // ms
            callback: this.spiderCaller,
            //args: [],
            callbackScope: this,
            loop: true
        });
    }

    spiderCaller() {
        this.delay = Phaser.Math.Between(1000,12000);
        this.timedEvent = this.scene.time.delayedCall(this.delay, () => { 
            this.spawnSpider(); 
        });
    }

    spawnSpider() {
        //timer will call this function within 5-12 seconds
        
        console.log("spawning spider");

        this.x = this.scene.worm.x - 100;
        this.y = this.scene.worm.y - 1300
        // tween drags spider down
        this.scene.tweens.add({
            targets: this,        //CODE: LOAD IN SPIDER
            x: this.scene.worm.x - 100,
            y: this.scene.worm.y - 135,
            duration: 4500,
            ease: 'Back.easeOut',
            yoyo: true
        });
   }    


   
}