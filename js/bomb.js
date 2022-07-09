class Bomb extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, speed) {
        super(scene, x, y, 'bomb');
        this.setInteractive();
        this.speed = speed;
        scene.bombs.add(this, 'game');
    }
}