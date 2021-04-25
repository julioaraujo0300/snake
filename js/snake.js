export default class Snake{
    constructor(scene) {
        this.scene = scene;
        this.timeLastMove = 0;
        this.moveInterval = 500;

        this.tileSize = 16;

        this.direction = Phaser.Math.Vector2.DOWN;
        this.body = [];
        this.color = [];

        this.color.push(0x002654);
        this.color.push(0x54bd04);
        this.color.push(0xff08d2);
        this.color.push(0xf6ff00);
        this.color.push(0xff9500);
        
        this.body.push(
            this.scene.add
            .rectangle(this.scene.game.config.width / 2, this.scene.game.config.height / 2, 16, 16, 0x40ff00).setOrigin(0)
        );

        this.apple = this.scene.add
            .rectangle(32, 32,
                this.tileSize, this.tileSize, 0xff0d00).setOrigin(0);

        this.placeApple();

        this.scene.input.keyboard.on('keydown', e => {
            this.keydown(e);
        })
    }


    writeOutput(text){
        document.write(`<h2>${text}</h2>`)
    }


    placeApple(){
        // console.log("function called");
        this.appleX = Math.floor(Math.random() * this.scene.game.config.width / this.tileSize) * this.tileSize;
        this.appleY = Math.floor(Math.random() * this.scene.game.config.height / this.tileSize) * this.tileSize;
        this.checkForBug();
        this.apple.x = this.appleX;
        this.apple.y = this.appleY;
    }

    checkForBug(){
        for (let i = 0; i < this.body.length; i++){
            if(this.body[i].x == this.appleX && this.body[i].y == this.appleY){
                console.log("bug happened");
                this.placeApple();
            }
        }
    }

    keydown(event) {
        switch(event.keyCode) {
            case 37:
                if(this.direction !== Phaser.Math.Vector2.RIGHT){
                    this.direction = Phaser.Math.Vector2.LEFT;
                }
                break;
            case 38:
                if(this.direction !== Phaser.Math.Vector2.DOWN){
                    this.direction = Phaser.Math.Vector2.UP;
                }
                break;
            case 39:
                if(this.direction !== Phaser.Math.Vector2.LEFT){
                    this.direction = Phaser.Math.Vector2.RIGHT;
                }
                break;
            case 40:
                if(this.direction !== Phaser.Math.Vector2.UP){
                    this.direction = Phaser.Math.Vector2.DOWN;
                }
                break;
        }
    }

    

    update(time){
        if(time >= this.timeLastMove + this.moveInterval){
            this.timeLastMove = time;
            this.move();
        }
    }

    checkApple(x, y){
        if(this.apple.x === x && this.apple.y === y) {
            this.placeApple();
            let randomColor = Math.floor(Math.random() * this.color.length);
            this.body.push(
                this.scene.add.rectangle(0,0,this.tileSize,this.tileSize,this.color[randomColor]).setOrigin(0)
            );
            if(this.moveInterval >= 160){
                this.moveInterval -= 20;
            }
        }
    }

    checkDeath(x,y){
        if(x < 0 || x >= this.scene.game.config.width || y < 0 || y >= this.scene.game.config.height){
            this.scene.scene.restart();
        }

        let tail = this.body.slice(1);
        if(tail.some(segment => segment.x === x & segment.y === y)){
            this.scene.scene.restart();
        }
    }

    move() {
        // this.body[1].x = this.body[0].x;
        // this.body[1].y = this.body[0].y;
        let x = this.body[0].x + this.direction.x * this.tileSize;
        let y = this.body[0].y + this.direction.y * this.tileSize;

        this.checkApple(x, y);
        this.checkDeath(x, y);

        for(let i = this.body.length - 1; i > 0; i--){
            this.body[i].x = this.body[i -1].x;
            this.body[i].y = this.body[i -1].y;
        }
        this.body[0].x = x;
        this.body[0].y = y;
    }
}