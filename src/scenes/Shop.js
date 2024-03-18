class Shop extends Phaser.Scene {
    constructor() {
        super('Shop');
    }

    init(data) {
        this.data = data;
        this.sessionPurchases = [];
    }

    preload() {
        // Preload your assets here, ensure the shopBackground is loaded
    }

    create() {
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "shopBackground").setOrigin(0, 0).setScale(3);

        // Displaying the shop title more elegantly
        this.add.text(config.width / 10, config.height / 15, "Shop", { 
            font: `bold ${config.width / 15}px Arial`, 
            fill: "#d9d9d9",
            shadow: { color: '#000', fill: true, offsetX: 2, offsetY: 2, blur: 8 }
        });

        // Updated UI for money display
        this.moneyText = this.add.text(16, 16, `Money: ${this.data.money}`, { 
            fontSize: '32px', 
            fill: '#ffd700', // Gold color
            fontStyle: 'bold',
            shadow: { color: '#000', fill: true, offsetX: 2, offsetY: 2, blur: 8 }
        });

        const letterCostMap = {
            'a': 3, 'b': 2, 'c': 1, // Continue with your mapping...
        };

        this.generateCards(letterCostMap);

        // Displaying session purchases with an enhanced UI
        this.purchasesText = this.add.text(config.width / 2, config.height - 40, "Bought Cards: ", {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#ffffff',
            backgroundColor: '#333333',
            padding: { x: 20, y: 10 },
            borderRadius: 5
        }).setOrigin(0.5).setStyle({ backgroundColor: '#333333' });

        // "Go to Boss" button with improved styling
        const bossButton = this.add.text(config.width - 200, 16, 'Go to Boss', {
            font: '22px Arial',
            fill: '#fff',
            backgroundColor: '#ff3333',
            padding: { x: 10, y: 5 },
            borderRadius: 5
        }).setInteractive().setStyle({ backgroundColor: '#ff3333' });

        bossButton.on('pointerdown', () => {
            this.scene.start('Boss', { ...this.data, sessionPurchases: this.sessionPurchases });
        });
    }

    generateCards(letterCostMap) {
        const positions = [18, 34, 50, 66, 82];
        positions.forEach(position => {
            this.generateCard(position, letterCostMap);
        });
    }

    generateCard(position, letterCostMap) {
        const cardChar = Phaser.Math.RND.pick(Object.keys(letterCostMap));
        const card = this.add.image(config.width * position / 100, config.height / 1.65, cardChar).setScale(.7).setInteractive();

        // Displaying the price tag with enhanced visibility
        const priceTag = this.add.text(card.x, card.y + 60, `Cost: ${letterCostMap[cardChar.toLowerCase()]}`, {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: '#fff',
            backgroundColor: '#007bff', // Bright blue for visibility
            padding: { x: 5, y: 5 },
            borderRadius: 5
        }).setOrigin(0.5).setStyle({ backgroundColor: '#007bff' });

        card.on('pointerup', () => {
            if (this.data.money >= letterCostMap[cardChar]) {
                this.data.money -= letterCostMap[cardChar];
                this.sessionPurchases.push(cardChar); // Add to session purchases
                this.updatePurchasesDisplay(); // Update the display of bought cards
                card.destroy(); // Remove the bought card
                priceTag.destroy(); // Also remove the price tag
                this.generateCard(position, letterCostMap); // Generate a new card
                this.moneyText.setText(`Money: ${this.data.money}`); // Update money display
            } else {
                // Handle insufficient funds with perhaps a UI prompt
            }
        });
    }

    updatePurchasesDisplay() {
        this.purchasesText.setText(`Bought Cards: ${this.sessionPurchases.join(', ')}`);
    }
}
