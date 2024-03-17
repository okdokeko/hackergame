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
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "shopBackground");
        this.background.setOrigin(0, 0);
        this.background.setScale(3);

        this.add.text(config.width / 10, config.height / 15, "Shop", { font: config.width / 15 + "px Brush Script MT, cursive", fill: "black" });
        this.moneyText = this.add.text(config.width / 9, config.height / 5, `Money: ${this.data.money}`, { font: "25px Arial", fill: "black" });

        // Add the rectangle to the scene
        this.blackBox = this.add.rectangle(config.width / 2, config.height / 1.7, config.width / 2, config.height / 2, 0x000000, .9);

        this.waresAccent = this.add.rectangle(config.width / 2.015, config.height / 2.55, config.width / 8, config.height / 14, 0xf0e62e, .9);
        this.add.text(config.width / 2.24, config.height / 2.8, "Wares", {
            font: config.width / 30 + "px Brush Script MT, cursive", fill: "black",
        });
        this.add.text(config.width / 2.25, config.height / 2.8, "Wares", {
            font: config.width / 30 + "px Brush Script MT, cursive", fill: "white",
        });

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
        this.data.money += 1;
    }
}

