class Shop extends Phaser.Scene {

    constructor() {
        super('Shop');
    }

    init(data) {
        this.data = data;
    }

    preload() {

    }

    create() {
        /*background*/
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "shopBackground");
        this.background.setOrigin(0, 0);
        this.background.setScale(3);

        this.add.text(config.width / 10, config.height / 15, "Shop", { font: config.width / 15 + "px Brush Script MT, cursive", fill: "black" });

        /*Shop*/
        // Add the rectangle to the scene
        this.blackBox = this.add.rectangle(config.width / 2, config.height / 1.7, config.width * 3/4 , config.height / 2, 0x000000, .9);

        this.waresAccent = this.add.rectangle(config.width / 2.015, config.height / 2.55, config.width / 8, config.height / 14, 0xf0e62e, .9);
        this.add.text(config.width / 2.24, config.height / 2.8, "Wares", {
            font: config.width / 30 + "px Brush Script MT, cursive", fill: "black",
        });
        this.add.text(config.width / 2.25, config.height / 2.8, "Wares", {
            font: config.width / 30 + "px Brush Script MT, cursive", fill: "white",
        });

        // Add cards
        this.cardLeft = this.add.image(config.width * 25 / 100, config.height / 1.65 , getRandLetter());
        this.cardLeft.setScale(.7);
        this.cardMid = this.add.image(config.width * 50 / 100, config.height / 1.65 , getRandLetter());
        this.cardMid.setScale(.7);
        this.cardRight = this.add.image(config.width * 75 / 100, config.height / 1.65 , getRandLetter());
        this.cardRight.setScale(.7);

        /*Boss Button*/
        const bossButton = this.add.text(config.width / 1.2, config.height / 6, 'To Boss →', {
            fontFamily: 'Arial',
            fontSize: '60px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: {
            x: 16,
            y: 8
            }
        }).setOrigin(0.5).setInteractive();
        bossButton.on('pointerup', () => {
            this.data.iterationIndex += 1;
            this.scene.start('Boss', this.data);
        });

    }

    update() {
        this.background.tilePositionY -= .5;
        
        //money count change test
        this.moneyText?.destroy(); // Clear previous money count
        this.moneyText = this.add.text(config.width / 9, config.height / 5, `Money: ${this.data.money}`, { font: "25px Arial", fill: "black" });
        this.data.money += 1;
    }
}

function getRandLetter() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet.charAt(randomIndex);
}

