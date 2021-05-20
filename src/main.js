let config = {
    type: Phaser.CANVAS,
    height: 720,
    width: 1180,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    // physics: {
    //     default: 'arcade',
    //     arcade: {
    //         debug: true,
    //         gravity: {
    //             x: 0,
    //             y: 0
    //         }
    //     }
    // },
    scene: [ Menu, Instructions, Play ]
}

let game = new Phaser.Game(config);

// keyboard variables
let keyRIGHT, keyLEFT;
