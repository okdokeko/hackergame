class Boss extends Phaser.Scene {
    constructor() {
        super("Boss");
    }

    init(data) {
        this.data = data;
        this.bossMaxHealth = 100 * this.data.level;
        this.bossCurrHealth = this.bossMaxHealth;

        // Ensure the deck is initialized for the session
        if (!this.data.deck) {
            this.data.deck = new Deck();
        }

    }

    create() {

        // Assuming a predefined letterCostMap and config object exists
        const letterScores = {
            'a': 3, 'b': 2, 'c': 1, 'd': 2, 'e': 3, 'f': 2, 'g': 1, 'h': 2, 'i': 3,
            'j': 2, 'k': 2, 'l': 1, 'm': 2, 'n': 3, 'o': 3, 'p': 2, 'q': 2, 'r': 3,
            's': 3, 't': 3, 'u': 2, 'v': 2, 'w': 2, 'x': 2, 'y': 2, 'z': 1
        };

        this.currScore = 0;
        this.currMult = 1;
        this.currWord = "";



///////////////////////////

        // Add a background image
        this.background = this.add.tileSprite(0, 0, 5400, 3400, "bossBackground").setScale(.5);
        this.background.setOrigin(0);

        // Calculate the color of the overlay based on the level
        const overlayColor = Phaser.Display.Color.GetColor(255 - this.data.level * 15, 204 - this.data.level * 15, 204 - this.data.level * 15);

        // Add a rectangle to act as the overlay
        this.overlay = this.add.rectangle(0, 0, config.width, config.height, overlayColor);
        this.overlay.setOrigin(0);
        this.overlay.setAlpha(.1);

        this.add.particles(config.width * 15 / 100, config.height * 10/100, 'flame', {
            speed: 200,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });
        this.add.particles(config.width * 85 / 100, config.height * 10/100, 'flame', {
            speed: 200,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });

        this.add.image(config.width / 2, config.height * 1.3 / 10, "title_holder").setScale(.15, .04)


        this.bossName = this.getBossNameByLevel(this.data.level);
        const textBox = this.add.bitmapText(config.width / 2, config.height * 1.3 / 10, 'vermin', `${this.bossName}`, 60).setOrigin(.5)
        textBox.setTint(0xB22222)
        //const textBox = this.add.text(config.width / 2, config.height / 10, `${this.bossName}`, {
        //    fontFamily: 'Arial',
        //    fontSize: '24px',
        //    color: '#ffffff',
        //    backgroundColor: '#000000',
        //    padding: { x: 10, y: 5 }
        //}).setOrigin(0.5);

        this.bossImage = this.add.image(config.width * 20 / 100, config.height * 40/ 100, 'boss' + this.data.level);
        this.bossImage.displayWidth = 400;
        this.bossImage.displayHeight = 250;

        // const rect = this.add.rectangle(config.width / 2, config.height / 1.3, config.width / 2, config.height / 3, 0x000000);

        const healthBar = this.add.rectangle(config.width * 66/ 100, config.height * 28 / 100, config.width / 3, config.height / 15, 'red');

        const hpText = this.add.bitmapText(config.width * 40/100, config.height * 25 / 100, 'vermin', 'HP:', 18).setScale(2);
        //const hpText = this.add.text(config.width / 2.5, config.height / 6 - 30, "HP", {
        //    fontFamily: 'Arial',
        //    fontSize: '18px',
        //    color: '#ffffff',
        //    backgroundColor: '#000000',
        //    padding: { x: 10, y: 5 }
        //}).setOrigin(0.5);

        // const handText = this.add.text(config.width / 2, config.height / 1.15, "Current Hand", {
        //     fontFamily: 'Arial',
        //     fontSize: '24px',
        //     color: '#ffffff',
        //     backgroundColor: '#000000',
        //     padding: { x: 10, y: 5 }
        // }).setOrigin(0.5);

        const playWordText = this.add.text(config.width * 66/ 100, config.height * 62 / 100, "Play Word", {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: 'black',
            backgroundColor: 'gold',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5);

        const goldLine = this.add.rectangle(healthBar.x, healthBar.y + 220, config.width / 3, 2, 0xffd700);
        goldLine.setStrokeStyle(4, 0x000000);

        // Add white rectangle behind money text
        //const moneyBackground = this.add.rectangle(config.width / 9, config.height / 10, 150, 30, 0xffffff);
        //moneyBackground.setOrigin(0.5);

        // Display money
        this.moneyText = this.add.bitmapText(config.width * .1 / 9, config.height * 9.2 / 10,'vermin',`Money: ${this.data.money}`, 25)
        //this.moneyText = this.add.text(config.width / 9, config.height / 10, `Money: ${this.data.money}`, { font: "25px Arial", fill: "black" });
        //this.moneyText.setOrigin(0.5);

        // Add white rectangle behind level text
        //const levelBackground = this.add.rectangle(config.width / 4, config.height / 10, 150, 30, 0xffffff);
        //levelBackground.setOrigin(0.5);

        // Display level
        this.levelText = this.add.bitmapText(config.width * .1 / 9, config.height * 9.6 / 10,'vermin',`Level: ${this.data.level}`, 25)
        //this.levelText = this.add.text(config.width / 4, config.height / 10, `Level: ${this.data.level}`, { font: "25px Arial", fill: "black" });
        //this.levelText.setOrigin(0.5);


        // Display the player's current hand
        // this.displayPlayerHand();

        this.generateCardsz(letterScores);
        playWordText.setInteractive();
        playWordText.on('pointerdown', () => this.submitCurrentWord());
    
    }

    update() {
        this.background.tilePositionY -= 0.5;
        this.background.tilePositionX += 0.5;

        this.currHealthBar?.destroy();
        this.currHealthBar = this.add.rectangle(config.width * 66/ 100, config.height * 28 / 100, (config.width / 3) * (this.bossCurrHealth / this.bossMaxHealth), config.height / 15, 0xFF0000);

        //this.bossCurrHealth -= 1; // Placeholder for actual game mechanics

        const healthText = this.add.text(config.width * 66/ 100, config.height * 28 / 100, `${this.bossCurrHealth} / ${this.bossMaxHealth}`, {
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
        this.wordText = this.add.text(config.width * 66/ 100, config.height * 50 / 100, this.currWord, {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5);

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
            "Ahmad Quereshi", "Sam Perry", "Sam Moreno", "Hippopotamus",
            "Bacon Hair", "Gordis, Devourer of Worlds"
        ];
        return names[level] || ""; // Default to empty string if level is out of bounds
    }

    generateCardsz(letterScores) {
        const positions = [14, 26, 38, 50, 62, 74, 86];
        positions.forEach(position => {
            this.generateCardz(position, letterScores);
        });
    }

    generateCardz(position, letterScores) {
        const cardChar = this.data.deck.getRandomLetter();
        const card = this.add.image(config.width * position / 100, config.height / 1.3, cardChar).setScale(.4).setInteractive();        
        
        card.on('pointerup', () => {
            this.currScore += letterScores[cardChar]; // Correctly adds the score based on the letter
            this.currWord += cardChar; // Correctly appends the letter to the current word
        });
    }
    submitCurrentWord() {
        if (this.currWord.length > 0) {

            const damagePerLetter = 5; // Each letter causes 5 I am sorry
    
            const totalDamage = this.currWord.length * damagePerLetter;
    
            this.bossCurrHealth -= totalDamage;
   
            if (this.bossCurrHealth < 0) {
                this.bossCurrHealth = 0;
            }

            this.updateBossHealthDisplay();
            console.log(`Dealt ${totalDamage} damage. Boss health: ${this.bossCurrHealth}`);
            this.currWord = "";
    
            // Additional logic for when the boss's health drops to 0 or below
            if (this.bossCurrHealth <= 0) {
                // Example: Move to the next level, reward player, etc.
                console.log("Boss defeated!");
                this.handleBossDefeat(); // Implement this according to your game's logic
            }
        }
    }
    
    // Ensure to implement this method to update the visual representation of the boss's health
    updateBossHealthDisplay() {
        // Your code to update the health bar or health text goes here
        // For example:
        this.healthBar.scaleX = this.bossCurrHealth / this.bossMaxHealth;
        this.healthText.setText(`${this.bossCurrHealth} / ${this.bossMaxHealth}`);
    }
 

}
