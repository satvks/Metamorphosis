class Spider extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {  // scene - Menu/Play, (x, y)
        super(scene, x, y, texture, frame);     // texture - prefab, frame - state?
        scene.add.existing(this);
        //local variables
        this.spiderUI = scene.sound.add(''); // add rocket sfx
        this.spiderUI.volume = 0.30;
    }

    create() {
        // a timer which calls back at random times?

    }

    spawnSpider() {
        //timer will call this function within 5-12 seconds
        console.log("spawning spider");
        let delay = Phaser.Math.Between(5000,12000)
        var timer = scene.time.delayedCall(delay, spawnSpider, this);

        // tween drags spider down
        this.tweens.add({
            targets: spider,        //CODE: LOAD IN SPIDER
            x: scene.worm.x,        //CODE: WORM NOT ACCESSED YET
            duration: 5500,
            ease: 'Back.easeOut',
            yoyo: true
        });

   }    


   
}