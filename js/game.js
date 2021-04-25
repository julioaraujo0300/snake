import MainScene from "./mainscene.js"

const config = {
    width: 320,
    height: 320,
    type: Phaser.auto,
    parent: 'game-canvas',
    scene: [MainScene]
}

new Phaser.Game(config);

