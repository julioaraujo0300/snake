import MainScene from "./mainscene.js"

const config = {
    width: 160,
    height: 160,
    type: Phaser.auto,
    parent: 'game-canvas',
    scene: [MainScene]
}

new Phaser.Game(config);

