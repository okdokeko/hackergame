class Boss extends Phaser.Scene {
    constructor() {
        super("Boss");
    }

    init(data) {
        // initial data for the scene 
        this.data = data;
        this.bossMaxHealth = 100 * this.data.level;
        this.bossCurrHealth = this.bossMaxHealth;

        console.log(this.data.deck.makeHand());

        // Ensure the deck is initialized for the session
        if (!this.data.deck) {
            this.data.deck = new Deck();
        }

    }

    create() {

        // A predefined map between letters and scores. Based on scrabble 
        this.letterScores = {
            'a': 1, 'e': 1, 'i': 1, 'o': 1, 'u': 1, 'l': 1, 'n': 1, 's': 1, 't': 1, 'r': 1,
            'd': 2, 'g': 2,
            'b': 3, 'c': 3, 'm': 3, 'p': 3,
            'f': 4, 'h': 4, 'v': 4, 'w': 4, 'y': 4,
            'k': 5,
            'j': 8, 'x': 8,
            'q': 10, 'z': 10
        };

        this.wordsLeft = 5 + this.data.level;

        this.currScore = 0;
        this.currMult = 1;
        this.currWord = "";

        // Add a background image
        this.background = this.add.tileSprite(0, 0, 5400, 3400, "bossBackground").setScale(.5);
        this.background.setOrigin(0);

        // Calculate the color of the overlay based on the level
        const overlayColor = Phaser.Display.Color.GetColor(255 - this.data.level * 15, 204 - this.data.level * 15, 204 - this.data.level * 15);

        // Add a rectangle to act as the overlay
        this.overlay = this.add.rectangle(0, 0, config.width, config.height, overlayColor);
        this.overlay.setOrigin(0);
        this.overlay.setAlpha(.1);

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

        this.add.image(config.width / 2, config.height * 1.3 / 10, "title_holder").setScale(.15, .04)

        this.bossName = this.getBossNameByLevel(this.data.level);
        const textBox = this.add.bitmapText(config.width / 2, config.height * 1.3 / 10, 'vermin', `${this.bossName}`, 60).setOrigin(.5)
        textBox.setTint(0xB22222)



        this.bossImage = this.add.image(config.width * 20 / 100, config.height * 40 / 100, 'boss' + this.data.level);
        this.bossImage.displayWidth = 400;
        this.bossImage.displayHeight = 250;

        const healthBar = this.add.rectangle(config.width * 66 / 100, config.height * 28 / 100, config.width / 3, config.height / 15, 'red');

        const hpText = this.add.bitmapText(config.width * 40 / 100, config.height * 25 / 100, 'vermin', 'HP:', 18).setScale(2);

        const playWordText = this.add.text(config.width * 66 / 100, config.height * 62 / 100, "Play Word", {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: 'black',
            backgroundColor: 'gold',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5);


        // Display money
        this.moneyText = this.add.bitmapText(config.width * .1 / 9, config.height * 9.2 / 10, 'vermin', `Money: ${this.data.money}`, 25)

        // Display level
        this.levelText = this.add.bitmapText(config.width * .1 / 9, config.height * 9.6 / 10, 'vermin', `Level: ${this.data.level}`, 25)

        // Clear Word button
        const clearWordButton = this.add.text(config.width * 66 / 100, config.height * 56 / 100, "Clear Word", {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: 'black',
            backgroundColor: 'red',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5);

        // Generate cards
        this.generateHand(this.letterScores);
        
        clearWordButton.setInteractive();
        clearWordButton.on('pointerdown', () => {
            if (this.wordText) {
                this.currWord = "";
            }
        });
        
        playWordText.setInteractive();
        playWordText.on('pointerdown', () => {
            this.submitCurrentWord();
            this.generateHand(this.letterScores);
        });
                
    }

    update() {
        this.background.tilePositionY -= 0.5;
        this.background.tilePositionX += 0.5;

        this.currHealthBar?.destroy();
        this.currHealthBar = this.add.rectangle(config.width * 66 / 100, config.height * 28 / 100, (config.width / 3) * (this.bossCurrHealth / this.bossMaxHealth), config.height / 15, 0xFF0000);

        //this.bossCurrHealth -= 1; // Placeholder for actual game mechanics

        const healthText = this.add.text(config.width * 66 / 100, config.height * 28 / 100, `${this.bossCurrHealth} / ${this.bossMaxHealth}`, {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5);

        if (this.bossCurrHealth < 1) {
            this.data.level += 1;
            if (this.data.level > 10) {
                this.scene.start('Win');
            } else {
                this.data.money += 10 * this.data.level; // Reward for defeating the boss
                this.scene.start('Shop', this.data);
            }
        }

        // Add a text field to display this.currWord
        this.wordText?.destroy();
        this.wordText = this.add.text(config.width * 66 / 100, config.height * 50 / 100, this.currWord, {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5);

        this.moneyText?.destroy();
        this.moneyText = this.add.bitmapText(config.width / 2, config.height / 2,'vermin', `Moves left: ${this.wordsLeft}`,24);

        if (this.wordsLeft < 1){
            this.scene.start('Lose');
        }
    }

    displayPlayerHand() {
        if (!this.data.deck) return;

        const letters = this.data.deck.getAllLetters();
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
        let displayText = "Bought Cards: ";
        this.sessionPurchases.forEach(letter => {
            displayText += letter + " ";
        });

        this.add.text(config.width / 2, config.height - 100, displayText, {
            fontFamily: 'Arial',
            fontSize: '20px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5);
    }
    getBossNameByLevel(level) {
        const names = [
            "", // Index 0 unused
            "Bennet Jackson", "William Rains", "Phoenix Garcia", "Maximilian Mace",
            "Ahmad Quereshi", "Sam Perry", "Sam Stinky EEWWWWWWWWWWWWWWW", "Hippopotamus",
            "Bacon Hair", "Gordis, Devourer of Worlds"
        ];
        return names[level] || ""; // Default to empty string if level is out of bounds
    }
    
    clearHand() {
        // Remove all existing cards and price tags
        this.children.each(child => {
            if (child instanceof Phaser.GameObjects.Image || child instanceof Phaser.GameObjects.Text) {
                child.destroy();
            }
        });
    }

    generateHand(letterScores) {
        const positions = [14, 26, 38, 50, 62, 74, 86];
        
        const cardChars = this.data.deck.makeHand();
        console.log(cardChars);
    
        positions.forEach((position, index) => {
            const cardChar = cardChars[index];
            const card = this.add.image(config.width * position / 100, config.height / 1.3, cardChar).setScale(.4).setInteractive();
    
            const priceTag = this.add.text(card.x, card.y + 60, `Score: ${letterScores[cardChar.toLowerCase()]}`, {
                fontFamily: 'Arial',
                fontSize: '18px',
                color: '#ffffff',
                backgroundColor: '#550674', // Using a blue background for visibility
                padding: {
                    x: 5,
                    y: 5,
                },
            }).setOrigin(0.5);
            card.on('pointerup', () => {
                this.currScore += letterScores[cardChar]; // Correctly adds the score based on the letter
                this.currWord += cardChar; // Correctly appends the letter to the current word
            });
        });
    }
            
    
    submitCurrentWord() {
        if (this.currWord.length > 0) {
            // Initialize wordScore variable
            if (!this.data.dictionary.hasWord(this.currWord)){
                console.log("Invalid word");
                this.currWord = "";
                return;
            }
            let wordScore = 0;

            // Calculate wordScore based on letterScores
            for (let i = 0; i < this.currWord.length; i++) {
                const letter = this.currWord[i];
                wordScore += this.letterScores[letter] || 0; // Ensure letterScores exist for the letter
            }

            // Calculate total damage
            const totalDamage =  Math.round(wordScore ** ((this.currWord.length - 2) / 1.5));
            // Update boss's current health
            this.bossCurrHealth -= totalDamage;

            // Ensure boss's health doesn't go below 0
            if (this.bossCurrHealth < 0) {
                this.bossCurrHealth = 0;
            }

            //this.updateBossHealthDisplay();
            console.log(`Dealt ${totalDamage} damage. Boss health: ${this.bossCurrHealth}`);

            // Clear the current word
            this.wordsLeft -= 1;
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
