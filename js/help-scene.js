class HelpScene extends Phaser.Scene {
    constructor() {
        super('help');
    }

    preload() {
        this.load.image('helptext', 'assets/helptext.png');
    }
    
    create() {
        this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'helptext');

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    update() {
        if (this.spaceKey.isDown) {
            this.scene.start('title');
        }
    }
}