import MainScene from "./mainscene.js"

const config = {
    width: 640,
    hright: 640,
    type: Phaser.auto,
    parent: 'game-canvas',
    scene: [MainScene]
}

new Phaser.Game(config);

