class PlayScene extends Phaser.Scene {
    constructor() {
        super('game');
    }

    preload() {
        this.load.image('game-bg', 'assets/background1.png');
        this.load.image('bacon', 'assets/bacon.png');
        this.load.image('cheese', 'assets/cheese.png');
        this.load.image('dough', 'assets/dough.png');
        this.load.image('fire', 'assets/fire.png');
        this.load.image('pineapple', 'assets/pineapple.png');
        this.load.image('tomato', 'assets/tomato.png');
        this.load.image('chicken', 'assets/chicken.png');
        this.load.image('mushroom', 'assets/mushroom.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.image('pause', 'assets/pause.png');
    }

    create() {
        this.gameWidth = this.sys.game.config.width;
        this.gameHeight = this.sys.game.config.height;

        // set bg
        this.gameBg = this.add.tileSprite(0, 0, this.gameWidth, this.gameHeight, 'game-bg');
        this.gameBg.setOrigin(0, 0);

        // set prompts
        this.prompt = this.generatePrompt();
        this.score = 0;
        this.add.text(20, 20, `Order: ${this.prompt.order}`, { fontSize: '24px', color: 'white' });
        this.ingredientText = this.add.text(20, 50, `Ingredients Needed: ${this.prompt.ingredients}`, { fontSize: '24px', color: 'white' });
        this.scoreText = this.add.text(20, 80, `Score: ${this.score}`, { fontSize: '24px', color: 'white' });


        // add items as group
        this.ingredientList = this.add.group();
        this.ingredientList.add(new Ingredient(this, Phaser.Math.Between(0, this.gameWidth), Phaser.Math.Between(0, this.gameHeight), 'dough', 0.05, Phaser.Math.Between(2, 8)));
        this.ingredientList.add(new Ingredient(this, Phaser.Math.Between(0, this.gameWidth), Phaser.Math.Between(0, this.gameHeight), 'cheese', 0.1, Phaser.Math.Between(2, 8)));
        this.ingredientList.add(new Ingredient(this, Phaser.Math.Between(0, this.gameWidth), Phaser.Math.Between(0, this.gameHeight), 'bacon', 0.1, Phaser.Math.Between(2, 8)));
        this.ingredientList.add(new Ingredient(this, Phaser.Math.Between(0, this.gameWidth), Phaser.Math.Between(0, this.gameHeight), 'fire', 0.25, Phaser.Math.Between(2, 8)));
        this.ingredientList.add(new Ingredient(this, Phaser.Math.Between(0, this.gameWidth), Phaser.Math.Between(0, this.gameHeight), 'tomato', 0.025, Phaser.Math.Between(2, 8)));
        this.ingredientList.add(new Ingredient(this, Phaser.Math.Between(0, this.gameWidth), Phaser.Math.Between(0, this.gameHeight), 'pineapple', 0.075, Phaser.Math.Between(2, 8)));
        this.ingredientList.add(new Ingredient(this, Phaser.Math.Between(0, this.gameWidth), Phaser.Math.Between(0, this.gameHeight), 'chicken', 0.075, Phaser.Math.Between(2, 8)));
        this.ingredientList.add(new Ingredient(this, Phaser.Math.Between(0, this.gameWidth), Phaser.Math.Between(0, this.gameHeight), 'mushroom', 1, Phaser.Math.Between(2, 8)));
        // add bombs as group
        this.bombs = this.add.group();
        for (let i = 0; i < 15; i++) {
            let bomb = new Bomb(this, Phaser.Math.Between(0, this.gameWidth), Phaser.Math.Between(0, this.gameHeight), Phaser.Math.Between(2, 8));
            this.bombs.add(bomb);
        };

        // add pause button and set pause logic
        this.pause = this.add.image(this.gameWidth - 50, 50, 'pause');
        this.pause.setScale(0.25);
        this.pause.setInteractive().on('pointerdown', () => {
            this.pauseGame();
        })

        this.input.on('gameobjectdown', this.takeIngredient, this);
    }

    update() {
        // loop through ingredient group and move ingredient items
        for (let i = 0; i < this.ingredientList.getChildren().length; i++) {
            this.moveIngredients(this.ingredientList.getChildren()[i], this.ingredientList.getChildren()[i].speed)
        }
        // loop through bombs and move bombs
        for (let i = 0; i < this.bombs.getChildren().length; i++) {
            this.moveIngredients(this.bombs.getChildren()[i], this.bombs.getChildren()[i].speed);
        }

        // check for win condition
        if (!this.prompt.ingredients.length) {
            this.winGame();
        }
    }

    // generates random prompt for game - pizza type and ingredients needed to be clicked on 
    generatePrompt() {
        let promptArr = [
            { order: 'Chicken Pizza', ingredients: ['dough', 'cheese', 'tomato', 'chicken'] },
            { order: 'Bacon Pizza', ingredients: ['dough', 'cheese', 'tomato', 'bacon'] },
            { order: 'Pineapple Pizza', ingredients: ['dough', 'cheese', 'tomato', 'pineapple'] },
            { order: 'Spicy Pizza', ingredients: ['dough', 'cheese', 'tomato', 'fire'] },
            { order: 'Mushroom Pizza', ingredients: ['dough', 'cheese', 'tomato', 'mushroom'] }
        ];

        return promptArr[Math.floor(Math.random() * promptArr.length)];
    }

    // move ingredients, ingredients fall and reset in random x location 
    moveIngredients(ingredient, speed) {
        if (ingredient) {
            ingredient.y += speed;
            if (ingredient.y >= this.gameHeight) {
                this.resetPosition(ingredient);
            }
        }
    }

    // resets ingredient position to top of screen with random x
    resetPosition(ingredient) {
        ingredient.x = Phaser.Math.Between(0, this.gameWidth);
        ingredient.y = 0;
    }

    // take ingredient or bomb, if bomb then trigger game loss, if ingredient then check if ingredient is in prompt, + score if present, - score if not
    takeIngredient(pointer, ingredient) {
        if (ingredient.type !== 'Image') {
            if (ingredient.texture.key === 'bomb') {
                this.scene.start('gameover');
            }
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

    // pause game and launch pause scene
    pauseGame() {
        this.scene.pause();
        this.scene.launch('pause');
    }

    // show win scene
    winGame() {
        this.scene.pause()
        this.scene.launch('win', this.score);
    }
}