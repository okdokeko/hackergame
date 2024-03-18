
class Shop extends Phaser.Scene {
    constructor() {
        super('Shop');
    }

    init(data) {
        this.data = data;
        // Ensure the deck is initialized for the session
        if (!this.data.deck) {
            this.data.deck = new Deck();
        }
    }

    preload() {
        // Preload your assets here
    }

    create() {
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "shopBackground").setOrigin(0, 0).setScale(3);
        this.add.text(config.width / 10, config.height / 15, "Shop", { font: `${config.width / 15}px Brush Script MT, cursive`, fill: "black" });

        this.blackBox = this.add.rectangle(config.width / 2, config.height * 5 / 8, config.width * 6 / 7, config.height * 5 / 8, 0x000000, 0.9);
        this.waresAccent = this.add.rectangle(config.width / 2.015, config.height / 2.55, config.width / 8, config.height / 14, 0xf0e62e, 0.9);
        this.add.text(config.width / 2.24, config.height / 2.8, "Wares", {
            font: `${config.width / 30}px Brush Script MT, cursive`, fill: "black",
        }).setShadow(2, 2, "#333333", 2, false, true);

        // Assuming a predefined letterCostMap and config object exists
        const letterCostMap = {
            'a': 3, 'b': 2, 'c': 1, 'd': 2, 'e': 3, 'f': 2, 'g': 1, 'h': 2, 'i': 3,
            'j': 2, 'k': 2, 'l': 1, 'm': 2, 'n': 3, 'o': 3, 'p': 2, 'q': 2, 'r': 3,
            's': 3, 't': 3, 'u': 2, 'v': 2, 'w': 2, 'x': 2, 'y': 2, 'z': 1
        };

        this.generateCards(letterCostMap);

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

    generateCards(letterCostMap) {
        const positions = [18, 34, 50, 66, 82];
        positions.forEach(position => {
            this.generateCard(position, letterCostMap);
        });
    }

    generateCard(position, letterCostMap) {
        const cardChar = Phaser.Math.RND.pick(Object.keys(letterCostMap));
        const card = this.add.image(config.width * position / 100, config.height / 1.65, cardChar).setScale(.7).setInteractive();
        
        // Display the price of the card below it
        const priceTag = this.add.text(card.x, card.y + 60, `Cost: ${letterCostMap[cardChar.toLowerCase()]}`, {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: '#ffffff',
            backgroundColor: '#007bff', // Using a blue background for visibility
            padding: {
                x: 5,
                y: 5,
            },
        }).setOrigin(0.5);
        
        card.on('pointerup', () => {
            if (this.data.money >= letterCostMap[cardChar]) {
                this.data.money -= letterCostMap[cardChar];
                this.data.deck.addLetter(cardChar);
                card.destroy(); // Remove the bought card
                priceTag.destroy(); // Also remove the price tag
                this.generateCard(position, letterCostMap); // Generate a new card
            } else {
                // Handle insufficient funds
            }
        });
    }
    update() {
        this.background.tilePositionY -= .5;
        this.moneyText?.destroy();
        this.moneyText = this.add.text(config.width / 9, config.height / 5, `Money: ${this.data.money}`, { font: "25px Arial", fill: "black" });
    }
    displayBoughtCards() {
    if (!this.data.deck) return;

    const letters = this.data.deck.getAllLetters();
    let displayText = "Bought Cards: ";
    letters.forEach(letter => {
        displayText += letter + " ";
    });

    this.add.text(config.width / 2, 20, displayText, {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#000',
        align: 'center'
    }).setOrigin(0.5);
}
}

function getRandLetter() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    return alphabet.charAt(Phaser.Math.Between(0, alphabet.length - 1));
}
