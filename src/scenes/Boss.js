class Boss extends Phaser.Scene {
    constructor() {
        super("Boss");
    }

    // Initialize scene data
    init(data) {
        this.data = data;
        this.bossMaxHealth = 100 * this.data.level;
        this.bossCurrHealth = this.bossMaxHealth;

        // Log the initial deck
        console.log(this.data.deck.makeHand());

        // Ensure the deck is initialized for the session
        if (!this.data.deck) {
            this.data.deck = new Deck();
        }
    }

    // Create scene elements
    create() {

        this.shufflesLeft = 3;
        this.discardedHand = [];

        this.currScore = 0;
        this.currMult = 1;
        this.currWord = "";

        // Add background image
        this.background = this.add.tileSprite(0, 0, 5400, 3400, "bossBackground").setScale(.5);
        this.background.setOrigin(0);

        // Calculate overlay color based on level
        const overlayColor = Phaser.Display.Color.GetColor(255 - this.data.level * 15, 204 - this.data.level * 15, 204 - this.data.level * 15);

        // Add overlay rectangle
        this.overlay = this.add.rectangle(0, 0, config.width, config.height, overlayColor);
        this.overlay.setOrigin(0);
        this.overlay.setAlpha(.1);

        // Add particles for visual effect
        this.add.particles(config.width * 15 / 100, config.height * 10 / 100, 'flame', {
            speed: 200,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });
        this.add.particles(config.width * 85 / 100, config.height * 10 / 100, 'flame', {
            speed: 200,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });

        // Add title holder image
        this.add.image(config.width / 2, config.height * 1.3 / 10, "title_holder").setScale(.15, .04);

        // Add boss name text
        this.bossName = this.getBossNameByLevel(this.data.level);
        const textBox = this.add.bitmapText(config.width / 2, config.height * 1.3 / 10, 'vermin', `${this.bossName}`, 60).setOrigin(.5);
        textBox.setTint(0xB22222);

        // Add boss image
        this.bossImage = this.add.image(config.width * 20 / 100, config.height * 40 / 100, 'boss' + this.data.level);
        this.bossImage.displayWidth = 400;
        this.bossImage.displayHeight = 250;

        // Add health bar and text
        const healthBar = this.add.rectangle(config.width * 66 / 100, config.height * 28 / 100, config.width / 3, config.height / 15, 'red');
        const hpText = this.add.bitmapText(config.width * 40 / 100, config.height * 25 / 100, 'vermin', 'HP:', 18).setScale(2);

        // Add Play Word button
        const playWordText = this.add.text(config.width * 66 / 100, config.height * 62 / 100, "Play Word", {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: 'black',
            backgroundColor: 'gold',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5);


        // Display money
        this.moneyText = this.add.bitmapText(config.width * .1 / 9, config.height * 9.2 / 10, 'vermin', `Money: ${this.data.money}`, 25)

        //Display cards left
        this.cardsLeftText = this.add.bitmapText(config.width *40 / 100, config.height * 55 / 100,'vermin', `Cards in draw pile: ${this.data.deck.length}`,24);
        
        //Display cards discarded
        this.cardsDiscardedText = this.add.bitmapText(config.width * 40 / 100, config.height * 60 / 100,'vermin', `Cards in discard pile: ${this.discardedHand.length}`,24);

        // Display level
        this.levelText = this.add.bitmapText(config.width * .1 / 9, config.height * 9.6 / 10, 'vermin', `Level: ${this.data.level}`, 25)

        // Add Clear Word button
        const clearWordButton = this.add.text(config.width * 66 / 100, config.height * 56 / 100, "Clear Word", {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: 'black',
            backgroundColor: 'red',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5);

        // Generate cards
        this.data.deck.shuffle(this.discardedHand);
        this.generateHand(this.data.letterScores);
        
        clearWordButton.setInteractive();
        clearWordButton.on('pointerdown', () => {
            if (this.wordText) {
                this.currWord = "";
            }
        });

        playWordText.setInteractive();
        playWordText.on('pointerdown', () => {
            this.submitCurrentWord();
            this.generateHand(this.data.letterScores);
        });
    }

    update() {
        // Move the background tiles diagonally
        this.background.tilePositionY -= 0.5;
        this.background.tilePositionX += 0.5;

        // Destroy previous health bar if it exists
        this.currHealthBar?.destroy();

        // Create a new health bar based on current boss health
        this.currHealthBar = this.add.rectangle(config.width * 66 / 100, config.height * 28 / 100, (config.width / 3) * (this.bossCurrHealth / this.bossMaxHealth), config.height / 15, 0xFF0000);

        // Display current boss health
        const healthText = this.add.text(config.width * 66 / 100, config.height * 28 / 100, `${this.bossCurrHealth} / ${this.bossMaxHealth}`, {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5);

        // Check if the boss's health is zero or less
        if (this.bossCurrHealth < 1) {
            // Increase the level and check if it exceeds the maximum level
            this.data.level += 1;
            if (this.data.level > 10) {
                // If exceeded, go to the Win scene
                this.scene.start('Win');
            } else {
                // Otherwise, reward the player and go to the Shop scene
                this.data.money += 10 * this.data.level;
                this.data.deck.addLettersArray(this.discardedHand); //add back to deck the discarded hand
                this.scene.start('Shop', this.data);
            }
        }

        // Destroy previous word text if it exists
        this.wordText?.destroy();

        // Display the current word
        this.wordText = this.add.text(config.width * 66 / 100, config.height * 50 / 100, this.currWord, {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5);

        // Destroy previous money text if it exists
        this.moneyText?.destroy();
        this.moneyText = this.add.bitmapText(config.width * 40 /100, config.height / 2,'vermin', `Deck shuffles left: ${this.shufflesLeft}`,24);
        
        this.cardsLeftText?.destroy();
        this.cardsLeftText = this.add.bitmapText(config.width * 40 / 100, config.height * 55 / 100,'vermin', `Cards in draw pile: ${this.data.deck.length}`,24);

        this.cardsDiscardedText?.destroy();
        this.cardsDiscardedText = this.add.bitmapText(config.width * 40 / 100, config.height * 60 / 100,'vermin', `Cards in discard pile: ${this.discardedHand.length}`,24);

        // Display the remaining moves
        //this.moneyText = this.add.bitmapText(config.width / 2, config.height / 2, 'vermin', `Moves left: ${this.wordsLeft}`, 24);

        // Check if there are no moves left
        if (this.shufflesLeft < 1) {
            // If no moves left, go to the Lose scene
            this.scene.start('Lose');
        }

        // Calculate total damage based on the current word
        let wordScore = 0;
        for (let i = 0; i < this.currWord.length; i++) {
            const letter = this.currWord[i];
            wordScore += this.data.letterScores[letter] || 0; // Ensure letterScores exist for the letter
        }
        const totalDamage = Math.round(wordScore ** ((this.currWord.length - 2) / 1.5));

        // Check if totalDamageText exists and currWord length is less than 2 before destroying it
        if (this.totalDamageText && this.currWord.length < 2) {
            this.totalDamageText.destroy();
        }

        // Update the text to display the current total damage if the word length is greater than 1
            this.totalDamageText?.destroy();
        
        
        if (this.currWord.length > 1) {
            this.totalDamageText = this.add.text(
                config.width / 2, // X position
                config.height - 50, // Y position
                `Total Damage: ${wordScore} ^ ${Math.round((this.currWord.length - 2) / 1.5)} = ${totalDamage}`, // Initial text (empty)
                {
                    fontFamily: 'Arial',
                    fontSize: '24px',
                    color: '#ffffff',
                    backgroundColor: '#000000',
                    padding: { x: 10, y: 5 }
                }
            );
            this.totalDamageText.setOrigin(0.5); // Center the text
        }
    }

    displayPlayerHand() {
        // Check if the deck exists
        if (!this.data.deck) return;

        // Get all letters from the deck
        const letters = this.data.deck.getAllLetters();

        // Display each letter on the screen
        letters.forEach((letter, index) => {
            this.add.text(config.width / 2 + (index * 30) - (letters.length * 15), config.height / 1.2, letter, {
                fontFamily: 'Arial',
                fontSize: '24px',
                color: '#ffffff',
                backgroundColor: '#000000',
                padding: { x: 5, y: 5 },
            }).setOrigin(0.5);
        });
    }

    displayBoughtCards() {
        // Initialize text to display bought cards
        let displayText = "Bought Cards: ";

        // Iterate through session purchases and append to display text
        this.sessionPurchases.forEach(letter => {
            displayText += letter + " ";
        });

        // Display the bought cards text on the screen
        this.add.text(config.width / 2, config.height - 100, displayText, {
            fontFamily: 'Arial',
            fontSize: '20px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5);
    }

    getBossNameByLevel(level) {
        // Array of boss names corresponding to levels
        const names = [
            "", // Index 0 unused
            "Bennet Jackson", "William Rains", "Phoenix Garcia", "Maximilian Mace",
            "Ahmad Quereshi", "Sam Perry", "Sam Stinky EEWWWWWWWWWWWWWWW", "Hippopotamus",
            "Bacon Hair", "Gordis, Devourer of Worlds"
        ];

        // Return the boss name based on the level, default to empty string if level is out of bounds
        return names[level] || "";
    }

    clearHand() {
        // Remove all existing cards and price tags from the screen
        this.children.each(child => {
            if (child instanceof Phaser.GameObjects.Image || child instanceof Phaser.GameObjects.Text) {
                child.destroy();
            }
        });
    }

    generateHand(letterScores) {
        // Positions for displaying cards
        const positions = [14, 26, 38, 50, 62, 74, 86];

        if(this.data.deck.length < 7){
            this.data.deck.shuffle(this.discardedHand);
            this.discardedHand = [];
            this.shufflesLeft -= 1;
        }

        //const cardChars = ['a','b','c','d','e','f','g'] // default values
        // Generate a hand of cards from the deck
        const cardChars = this.data.deck.makeHand();
        this.discardedHand = this.discardedHand.concat(cardChars);

        // Iterate through positions and display cards along with their scores
        positions.forEach((position, index) => {
            const cardChar = cardChars[index];
            const card = this.add.image(config.width * position / 100, config.height / 1.3, cardChar).setScale(.4).setInteractive();
    
            const scoreTag = this.add.text(card.x, card.y + 60, `Score: ${letterScores[cardChar.toLowerCase()]}`, {
                fontFamily: 'Arial',
                fontSize: '18px',
                color: '#ffffff',
                backgroundColor: '#550674', // Using a blue background for visibility
                padding: {
                    x: 5,
                    y: 5,
                },
            }).setOrigin(0.5);

            // Event listener to update score and current word when a card is clicked
            card.on('pointerup', () => {
                this.currScore += letterScores[cardChar]; // Correctly adds the score based on the letter
                this.currWord += cardChar; // Correctly appends the letter to the current word
            });
        });
    }

    submitCurrentWord() {
        if (this.currWord.length > 0) {
            // Check if the current word is valid
            if (!this.data.dictionary.hasWord(this.currWord)) {
                // Display invalid word message
                const invalidText = this.add.text(
                    config.width / 1.5, // X position
                    config.height / 2.5, // Y position
                    `${this.currWord} is an invalid word!`, // Message
                    {
                        fontFamily: 'Arial',
                        fontSize: '48px',
                        color: '#ff0000', // Red color
                        backgroundColor: '#000000', // Black background
                        padding: { x: 20, y: 10 }
                    }
                );
                invalidText.setOrigin(0.5); // Center the text

                // Remove the text after 5 seconds
                setTimeout(() => {
                    invalidText.destroy();
                }, 3000);

                // Clear the current word
                this.currWord = "";
                return;
            }
            let wordScore = 0;

            // Calculate wordScore based on letterScores
            for (let i = 0; i < this.currWord.length; i++) {
                const letter = this.currWord[i];
                wordScore += this.data.letterScores[letter] || 0; // Ensure letterScores exist for the letter
            }

            // Calculate total damage
            const totalDamage = Math.round(wordScore ** ((this.currWord.length - 2) / 1.5));
            // Update boss's current health
            this.bossCurrHealth -= totalDamage;

            // Ensure boss's health doesn't go below 0
            if (this.bossCurrHealth < 0) {
                this.bossCurrHealth = 0;
            }

            // Display damage dealt and boss's current health
            console.log(`Dealt ${totalDamage} damage. Boss health: ${this.bossCurrHealth}`);

            // Decrease the remaining moves
            this.wordsLeft -= 1;

            // Clear the current word
            this.currWord = "";

            // Additional logic for when the boss's health drops to 0 or below
            if (this.bossCurrHealth <= 0) {
                // Example: Move to the next level, reward player, etc.
                console.log("Boss defeated!");
                //this.handleBossDefeat(); // Implement this according to your game's logic
            }
        }
    }
}