/* 
Custom ingredient sprite class
Parameters: scene, x position, y position, type string to be used as key/label, scale number if sprite needs to be scaled, and speed number
*/

class Ingredient extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type, scale, speed) {
        super(scene, x, y, type);
        this.setInteractive();
        this.setScale(scale);
        this.speed = speed;
        scene.ingredientList.add(this, 'game');
    }
}