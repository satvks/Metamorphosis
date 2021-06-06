class Spider extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {  // scene - Menu/Play, (x, y)
        super(scene, x, y, texture, frame);     // texture - prefab, frame - state?
        scene.add.existing(this);
        //local variables

        this.spiderUI = scene.sound.add(''); // add rocket sfx
        this.spiderUI.volume = 0.30;
    }
}