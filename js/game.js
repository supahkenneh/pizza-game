const config = {
    widht: 800,
    height: 600,
    backgroundColor: 0x000000,
    scene: [TitleScene, PlayScene, PauseScene, WinScene, GameOverScene]
}

const game = new Phaser.Game(config);

