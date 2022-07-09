class GameOverScene extends Phaser.Scene {
    constructor() {
        super('gameover');
    }

    preload() {
        this.load.image('gameover', 'assets/gameover.png');
    }

    create() {
        this.gameWidth = this.sys.game.config.width;
        this.gameHeight = this.sys.game.config.height;
        this.add.image(this.gameWidth / 2, this.gameHeight / 2, 'gameover');
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (this.spaceKey.isDown) {
            this.scene.start('title');
        }
    }
}