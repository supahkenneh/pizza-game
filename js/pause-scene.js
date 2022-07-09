class PauseScene extends Phaser.Scene {
    constructor() {
        super('pause');
    }

    preload() {
        this.load.image('pauseModal', 'assets/pausemodal.png');
    }

    create() {
        this.gameWidth = this.sys.game.config.width;
        this.gameHeight = this.sys.game.config.height;

        this.pauseModal = this.add.image(this.gameWidth / 2, this.gameHeight / 2, 'pauseModal');
        this.input.once('pointerdown', () => {
            this.pauseModal.visible = false;
            this.scene.resume('game');
        }, this)
    }
}