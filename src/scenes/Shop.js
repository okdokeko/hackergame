class Shop extends Phaser.Scene {
    constructor() {
        super('Shop');
    }

    init(data) {
        this.data = data;
    }

    preload() {
        // preload assets here
    }

    create() {
        /* background */
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "shopBackground").setOrigin(0, 0).setScale(3);
        this.add.text(config.width / 10, config.height / 15, "Shop", { font: config.width / 15 + "px Brush Script MT, cursive", fill: "black" });

        /* Shop */
        this.blackBox = this.add.rectangle(config.width / 2, config.height * 5/8, config.width * 6/7, config.height * 5/8, 0x000000, .9);
        this.waresAccent = this.add.rectangle(config.width / 2.015, config.height / 2.55, config.width / 8, config.height / 14, 0xf0e62e, .9);
        this.add.text(config.width / 2.24, config.height / 2.8, "Wares", {
            font: config.width / 30 + "px Brush Script MT, cursive", fill: "black",
        });
        this.add.text(config.width / 2.25, config.height / 2.8, "Wares", {
            font: config.width / 30 + "px Brush Script MT, cursive", fill: "white",
        });

        const letterCostMap = {
            'a': 3, 'b': 2, 'c': 1, 'd': 2, 'e': 3, 'f': 2, 'g': 1, 'h': 2, 'i': 3,
            'j': 2, 'k': 2, 'l': 1, 'm': 2, 'n': 3, 'o': 3, 'p': 2, 'q': 2, 'r': 3,
            's': 3, 't': 3, 'u': 2, 'v': 2, 'w': 2, 'x': 2, 'y': 2, 'z': 1
        };

        // Add cards
        const cards = [this.card1, this.card2, this.card3, this.card4, this.card5];
        const positions = [18, 34, 50, 66, 82]; // Position percentages for cards
        positions.forEach((position, index) => {
            const cardChar = getRandLetter();
            const card = this.add.image(config.width * position / 100, config.height / 1.65, cardChar).setScale(.7);
            card.setInteractive();

            card.on('pointerover', () => {
                this.tweens.add({
                    targets: card,
                    scaleX: 0.8,
                    scaleY: 0.8,
                    yoyo: true,
                    repeat: -1,
                    duration: 300
                });
            });

            card.on('pointerout', () => {
                this.tweens.killTweensOf(card);
                card.setScale(0.7);
            });

            card.on('pointerup', () => {
                if (this.data.money >= letterCostMap[cardChar]) {
                    this.data.money -= letterCostMap[cardChar];
                    this.tweens.add({
                        targets: card,
                        x: config.width / 2,
                        y: config.height / 2,
                        duration: 500,
                        ease: 'Power2'
                    });
                } else {
                    // handle insufficient funds
                }
            });

            cards[index] = card;

            // Add price button and text
            this.add.text(config.width * position / 100, config.height * 85 / 100, `Cost: ${letterCostMap[cardChar]}`, {
                fontFamily: 'Arial',
                fontSize: '24px',
                color: '#000000',
                backgroundColor: '#FFD1DC',
                padding: { x: 10, y: 5 }
            }).setOrigin(0.5).setInteractive();
        });

        /* Boss Button */
        const bossButton = this.add.text(config.width / 1.2, config.height / 6, 'To Boss →', {
            fontFamily: 'Arial',
            fontSize: '60px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 16, y: 8 }
        }).setOrigin(0.5).setInteractive();

        bossButton.on('pointerup', () => {
            this.data.iterationIndex += 1;
            this.scene.start('Boss', this.data);
        });
    }

    update() {
        this.background.tilePositionY -= .5;
        this.moneyText?.destroy(); // Clear previous money count
        this.moneyText = this.add.text(config.width / 9, config.height / 5, `Money: ${this.data.money}`, { font: "25px Arial", fill: "black" });
    }
}

function getRandLetter() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    return alphabet.charAt(Math.floor(Math.random() * alphabet.length));
}
