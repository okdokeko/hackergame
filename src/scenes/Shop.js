
class Shop extends Phaser.Scene {
    constructor() {
        super('Shop');
    }

    init(data) {
        this.data = data;

        console.log("In shop");
        //console.log(this.data.dictionary.wordsSet);

        // Ensure the deck is initialized for the session
        if (!this.data.deck) {
            this.data.deck = new Deck();
        }
    }

    preload() {
        
    }

    create() {
        // Add background
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "shopBackground").setOrigin(0, 0).setScale(3);

        // Add shop text image
        this.add.image(config.width * 1.5 / 10, config.height * 2/ 15, 'shop');

        // Add the wares box 
        this.blackBox = this.add.rectangle(config.width / 2, config.height * 5 / 8, config.width * 6 / 7, config.height * 5 / 8, 0xA6A6A6, 0.9);
        this.waresAccent = this.add.rectangle(config.width / 2.015, config.height / 2.55, config.width / 8, config.height / 14, 0x550674, 0.9);
        this.add.text(config.width / 2.20, config.height / 2.8, "Wares", {
            font: `${config.width / 30}px Brush Script MT, cursive`, fill: "pink",
        }).setShadow(2, 2, "#333333", 2, false, true);

        // Assuming a predefined letterCostMap and config object exists
        const letterCostMap = {
            'a': 3, 'b': 2, 'c': 1, 'd': 2, 'e': 3, 'f': 2, 'g': 1, 'h': 2, 'i': 3,
            'j': 2, 'k': 2, 'l': 1, 'm': 2, 'n': 3, 'o': 3, 'p': 2, 'q': 2, 'r': 3,
            's': 3, 't': 3, 'u': 2, 'v': 2, 'w': 2, 'x': 2, 'y': 2, 'z': 1
        };

        // populate the shop with 5 cards and the costs
        this.generateCards(letterCostMap);

        // Add the challenge sigma button 
        this.add.rectangle(config.width * 7 / 10, config.height / 6, config.width * 4.6 / 10, config.height * 1.5 / 10, 0xB22222, .9)
        const bossButton = this.add.bitmapText(config.width * 7.05 / 10, config.height / 6,'vermin', 'CHALLENGE THE SIGMA →', 60)
        bossButton.setOrigin(0.5).setInteractive();

        // Listener for challenge sigma
        bossButton.on('pointerup', () => {
            this.data.iterationIndex += 1;
            this.scene.start('Boss', this.data);
        });

        //Sound Effects
        var click = this.sound.add("onClick", {loop: false, volume: .3});
        //On click effect
        this.input.on('pointerdown', () => {
            click.play();
        });
    }

    // contains position of all 5 cards
    generateCards(letterCostMap) {
        const positions = [18, 34, 50, 66, 82];
        positions.forEach(position => {
            this.generateCard(position, letterCostMap);
        });
    }

    // generates cards in all 5 positions
    generateCard(position, letterCostMap) {
        const cardChar = Phaser.Math.RND.pick(Object.keys(letterCostMap));
        const card = this.add.image(config.width * position / 100, config.height / 1.65, cardChar).setScale(.7).setInteractive();
        
        // Display the price of the card below it
        const priceTag = this.add.text(card.x, card.y + 60, `Cost: ${letterCostMap[cardChar.toLowerCase()]}`, {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: '#ffffff',
            backgroundColor: '#550674', // Using a blue background for visibility
            padding: {
                x: 5,
                y: 5,
            },
        }).setOrigin(0.5);
        const letterScore = this.add.text(card.x, card.y + 90, `Score: ${this.data.letterScores[cardChar.toLowerCase()]}`, {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: '#ffffff',
            backgroundColor: '#550674', // Using a blue background for visibility
            padding: {
                x: 5,
                y: 5,
            },
        }).setOrigin(0.5);
        
     // Bobbing effect when hovered
    card.on('pointerover', () => {
        this.tweens.add({
            targets: card,
            y: card.y - 5, // Move up slightly
            duration: 200,
            ease: 'Power1',
            yoyo: true,
            repeat: -1 // Repeat indefinitely
        });
    });

    card.on('pointerout', () => {
        this.tweens.killTweensOf(card); // Stop the bobbing effect
        card.y = config.height / 1.65; // Reset position
    });
    
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
        // moves the background
        this.background.tilePositionY -= .5;

        // Add moneytext with current data
        this.moneyText?.destroy();
        this.moneyText = this.add.bitmapText(config.width *.8/ 10, config.height / 5,'vermin', `Money: ${this.data.money}`,24);
        this.moneyText.setTint(0x550674);
        this.moneyText.setScale(1.5)
    }

    // outdated function
    // Shows which cards are bought 
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

// gives a random char 
function getRandLetter() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    return alphabet.charAt(Phaser.Math.Between(0, alphabet.length - 1));
}
