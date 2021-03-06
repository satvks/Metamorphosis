let config = {
    type: Phaser.CANVAS,
    height: 720,
    width: 1180,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
         physics: {
             default: 'arcade',
             arcade: {
                 debug: false,
                 gravity: {
                     x: 0,
                     y: 0
                 }
             }
         },
    scene: [ Menu, Instructions, Level1, Level2, Cocoon, Final, GameOver]
}

let game = new Phaser.Game(config);

// keyboard variables
let keyRIGHT, keyLEFT, keyP, keyE, keyA, keyS, keyW, keyD, keyM, keyR;

let cursors;
