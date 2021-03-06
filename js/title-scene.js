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

        this.helpText = this.add.text(this.gameWidth - 150, this.gameHeight - 30, 'How To Play', { fontSize: '20px' });
        this.helpText.setInteractive().on('pointerdown', () => {
            this.scene.start('help');
        })

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (this.spaceKey.isDown) {
            this.scene.start('game');
        }
    }
}