class Ingredient extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type, scale, speed) {
        super(scene, x, y, type);
        this.setInteractive();
        this.setScale(scale);
        this.speed = speed;
        scene.ingredientList.add(this, 'game');
    }
}