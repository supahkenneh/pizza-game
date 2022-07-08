class PlayScene extends Phaser.Scene {
    constructor() {
        super('game');
    }

    preload() {
        this.load.image('game-bg', 'assets/background.png');
    }

    create() {
        this.gameWidth = this.sys.game.config.width;
        this.gameHeight = this.sys.game.config.height;

        this.gameBg = this.add.tileSprite(0, 0, this.gameWidth, this.gameHeight, 'game-bg');
        this.gameBg.setOrigin(0, 0);
    }
}