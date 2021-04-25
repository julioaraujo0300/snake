import Snake from "./snake.js"

export default class MainScene extends Phaser.Scene {
    constructor(){
        super("MainScene");
    }

    preload() {}

    create() {
        var background = this.add.grid(320, 320, 640, 640, 16, 16, 0x000000).setAltFillStyle(0x403e3c).setOutlineStyle();
        this.snake = new Snake(this);
    }

    update(time) {
        this.snake.update(time);
    }
}