class PlayScene extends Phaser.Scene {
    constructor() {
        super('game');
    }

    preload() {
        this.load.image('game-bg', 'assets/background.png');
        this.load.image('bacon', 'assets/bacon.png');
        this.load.image('cheese', 'assets/cheese.png');
        this.load.image('dough', 'assets/dough.png');
        this.load.image('fire', 'assets/fire.png');
        this.load.image('pineapple', 'assets/pineapple.png');
        this.load.image('tomato', 'assets/tomato.png');
        this.load.image('chicken', 'assets/chicken.png');
        this.load.image('pause', 'assets/pause.png');
    }

    create() {
        this.gameWidth = this.sys.game.config.width;
        this.gameHeight = this.sys.game.config.height;

        // set bg
        this.gameBg = this.add.tileSprite(0, 0, this.gameWidth, this.gameHeight, 'game-bg');
        this.gameBg.setOrigin(0, 0);

        // set prompt
        this.prompt = this.generatePrompt();
        this.score = 0;
        this.add.text(20, 20, `Order: ${this.prompt.order}`, { fontSize: '24px', color: 'white' });
        this.ingredientText = this.add.text(20, 50, `Ingredients Needed: ${this.prompt.ingredients}`, { fontSize: '24px', color: 'white' });
        this.scoreText = this.add.text(20, 80, `Score: ${this.score}`, { fontSize: '24px', color: 'white' });


        // add items
        this.dough = this.add.sprite(this.gameWidth / 2 - 300, Phaser.Math.Between(0, this.gameHeight / 2), 'dough');
        this.dough.setScale(0.05);
        this.dough.setInteractive();
        this.cheese = this.add.sprite(this.gameWidth / 2 - 200, Phaser.Math.Between(0, this.gameHeight / 2), 'cheese');
        this.cheese.setScale(0.1);
        this.cheese.setInteractive();
        this.bacon = this.add.sprite(this.gameWidth / 2 - 100, Phaser.Math.Between(0, this.gameHeight / 2), 'bacon');
        this.bacon.setScale(0.1);
        this.bacon.setInteractive();
        this.fire = this.add.sprite(this.gameWidth / 2, Phaser.Math.Between(0, this.gameHeight / 2), 'fire');
        this.fire.setScale(0.25);
        this.fire.setInteractive();
        this.tomato = this.add.sprite(this.gameWidth / 2 + 100, Phaser.Math.Between(0, this.gameHeight / 2), 'tomato');
        this.tomato.setScale(0.025)
        this.tomato.setInteractive();
        this.pineapple = this.add.sprite(this.gameWidth / 2 + 200, Phaser.Math.Between(0, this.gameHeight / 2), 'pineapple');
        this.pineapple.setScale(0.075);
        this.pineapple.setInteractive();
        this.chicken = this.add.sprite(this.gameWidth / 2 + 200, Phaser.Math.Between(0, this.gameHeight / 2), 'chicken');
        this.chicken.setScale(0.075);
        this.chicken.setInteractive();

        this.pause = this.add.image(this.gameWidth - 50, 50, 'pause');
        this.pause.setScale(0.25);
        this.pause.setInteractive().on('pointerdown', () => {
            this.pauseGame();
        })

        this.input.on('gameobjectdown', this.takeIngredient, this);
    }

    update() {
        this.moveIngredients(this.dough, 3);
        this.moveIngredients(this.cheese, 3);
        this.moveIngredients(this.bacon, 3);
        this.moveIngredients(this.fire, 6);
        this.moveIngredients(this.tomato, 3);
        this.moveIngredients(this.pineapple, 5);
        this.moveIngredients(this.chicken, 4);

        if (!this.prompt.ingredients.length) {
            this.winGame();
        }
    }

    generatePrompt() {
        let promptArr = [
            { order: 'Chicken Pizza', ingredients: ['dough', 'cheese', 'tomato', 'chicken'] },
            { order: 'Bacon Pizza', ingredients: ['dough', 'cheese', 'tomato', 'bacon'] },
            { order: 'Pineapple Pizza', ingredients: ['dough', 'cheese', 'tomato', 'pineapple'] },
            { order: 'Spicy Pizza', ingredients: ['dough', 'cheese', 'tomato', 'fire'] }
        ];

        return promptArr[Math.floor(Math.random() * promptArr.length)];
    }

    moveIngredients(ingredient, speed) {
        ingredient.y += speed;
        if (ingredient.y >= this.gameHeight) {
            this.resetPosition(ingredient);
        }
    }

    resetPosition(ingredient) {
        ingredient.x = Phaser.Math.Between(0, this.gameHeight);
        ingredient.y = 0;
    }

    takeIngredient(pointer, ingredient) {
        if (ingredient.type !== 'Image') {
            let index = this.prompt.ingredients.indexOf(ingredient.texture.key);
            if (index !== -1) {
                this.prompt.ingredients.splice(index, 1);
                this.ingredientText.setText(`Ingredients Needed: ${this.prompt.ingredients}`);
                this.score += 100;
                this.scoreText.setText(`Score: ${this.score}`);
                ingredient.visible = false;
            } else {
                this.score -= 50;
                this.scoreText.setText(`Score: ${this.score}`);
            }
        }
    }

    pauseGame() {
        this.scene.pause();
        this.scene.launch('pause');
    }

    winGame() {
        this.scene.pause()
        this.scene.launch('win', this.score);
    }
}