class TitleScene extends Phaser.Scene {
    constructor() {
        super('title');
    }

    preload() {
        this.load.image('title', 'assets/title.png');
    }

    create() {
        this.gameWidth = this.sys.game.config.width;
        this.gameHeight = this.sys.game.config.height;

        this.title = this.add.sprite(0, 0, 'title');
        this.title.setPosition(this.gameWidth / 2, this.gameHeight / 2);

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        this.scene.start('game');
        if (this.spaceKey.isDown) {
        }
    }
}