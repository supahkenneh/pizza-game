class PlayScene extends Phaser.Scene {
    constructor() {
        super('game');
    }

    create() {
        this.add.text(20, 20, 'Playing game...', { font: '25px Arial', fill: 'yellow' });
    }
}