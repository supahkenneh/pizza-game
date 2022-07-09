class WinScene extends Phaser.Scene {
    constructor() {
        super('win');
    }

    init(data) {
        this.finalScore = data;
    }

    preload() {
        this.load.image('winModal', 'assets/winmodal.png');
    }

    create() {
        this.gameWidth = this.sys.game.config.width;
        this.gameHeight = this.sys.game.config.height;
        this.add.image(this.gameWidth / 2, this.gameHeight / 2, 'winModal');
        this.add.text(this.gameWidth / 2 - 20, this.gameHeight / 2 + 125, `${this.finalScore}`, { fontSize: '28px', color: 'white' });
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (this.spaceKey.isDown) {
            this.scene.start('game');
        }
    }
}