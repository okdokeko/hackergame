class Boss extends Phaser.Scene {
    constructor() {
        super("Boss");
    }

    init(data) {
        this.data = data;
        this.bossMaxHealth = 100 * this.data.level;
        this.bossCurrHealth = this.bossMaxHealth;
    }

    create() {
        // Add a background image
        this.background = this.add.tileSprite(0, 0, 5400, 3400, "bossBackground").setScale(.5);
        this.background.setOrigin(0);

        // Calculate the color of the overlay based on the level
        const overlayColor = Phaser.Display.Color.GetColor(255 - this.data.level * 15, 204 - this.data.level * 15, 204 - this.data.level * 15);

        // Add a rectangle to act as the overlay
        this.overlay = this.add.rectangle(0, 0, config.width, config.height, overlayColor);
        this.overlay.setOrigin(0);
        this.overlay.setAlpha(.1);

        this.bossName = this.getBossNameByLevel(this.data.level);
        const textBox = this.add.text(config.width / 2, config.height / 10, `Boss ${this.data.level}: ${this.bossName}`, {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5);

        this.bossImage = this.add.image(config.width / 4, config.height / 2.7, 'boss' + this.data.level);
        this.bossImage.displayWidth = 400;
        this.bossImage.displayHeight = 250;

        const rect = this.add.rectangle(config.width / 2, config.height / 1.3, config.width / 2, config.height / 3, 0x000000);

        const healthBar = this.add.rectangle(this.bossImage.x + config.width / 2.5, config.height / 5, config.width / 3, config.height / 15, 'red');

        const hpText = this.add.text(this.bossImage.x + config.width / 2.5, config.height / 5 - 30, "HP", {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5);

        const handText = this.add.text(config.width / 2, config.height / 1.15, "Current Hand", {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5);

        const playWordText = this.add.text(this.bossImage.x + config.width / 2.5, config.height / 5 + 60, "Play Word", {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: 'black',
            backgroundColor: 'gold',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5);

        const goldLine = this.add.rectangle(healthBar.x, healthBar.y + 220, config.width / 3, 2, 0xffd700);
        goldLine.setStrokeStyle(4, 0x000000);

        // Add white rectangle behind money text
        const moneyBackground = this.add.rectangle(config.width / 9, config.height / 10, 150, 30, 0xffffff);
        moneyBackground.setOrigin(0.5);

        // Display money
        this.moneyText = this.add.text(config.width / 9, config.height / 10, `Money: ${this.data.money}`, { font: "25px Arial", fill: "black" });
        this.moneyText.setOrigin(0.5);

        // Add white rectangle behind level text
        const levelBackground = this.add.rectangle(config.width / 4, config.height / 10, 150, 30, 0xffffff);
        levelBackground.setOrigin(0.5);

        // Display level
        this.levelText = this.add.text(config.width / 4, config.height / 10, `Level: ${this.data.level}`, { font: "25px Arial", fill: "black" });
        this.levelText.setOrigin(0.5);


        // Display the player's current hand
        this.displayPlayerHand();
    }

    update() {
        this.background.tilePositionY -= 0.5;
        this.background.tilePositionX += 0.5;

        this.currHealthBar?.destroy();
        this.currHealthBar = this.add.rectangle(this.bossImage.x + config.width / 2.5, config.height / 5, (config.width / 3) * (this.bossCurrHealth / this.bossMaxHealth), config.height / 15, 'gold');

        this.bossCurrHealth -= 1; // Placeholder for actual game mechanics

        const healthText = this.add.text(this.bossImage.x + config.width / 2.5, config.height / 5, `${this.bossCurrHealth} / ${this.bossMaxHealth}`, {
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
            "Bacon Hair", "Gordis"
        ];
        return names[level] || ""; // Default to empty string if level is out of bounds
    }
}
