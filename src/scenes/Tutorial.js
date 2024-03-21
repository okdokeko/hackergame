class Tutorial extends Phaser.Scene {
    constructor() {
        super('Tutorial');
    }

    create() {
        // Update the tutorial scene (e.g., handle player input, game logic)
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "startBackground");
        this.background.setOrigin(0);
        this.background.setScale(2);
    
        // Add semi-transparent box behind the Tutorial text and Start button
        const box = this.add.graphics();
        const boxWidth = config.width - 100;
        const boxHeight = config.height - 200;
        const boxX = config.width / 2;
        const boxY = config.height / 2;
        const boxAlpha = 0.5; // Alpha value for transparency
        box.fillStyle(0xffffff, boxAlpha); // White color with specified alpha
        box.fillRect(boxX - boxWidth / 2, boxY - boxHeight / 2, boxWidth, boxHeight);
    
        // Add title
        this.add.rectangle(config.width / 2, 50, 200, 60, 0xffffff).setOrigin(0.5).setAlpha(.5);
        const title = this.add.text(config.width / 2, 50, 'Tutorial', { fontSize: '32px', fill: '#000' });
        title.setOrigin(0.5);
    
        // Add detailed instructions
        const instructionsText = `
            Welcome to Sigma Blasters! In this game, you will embark on an epic journey to defeat powerful Sigmas by playing words.
    
            Whats the goal of Sigma Blasters?
            You will face off against 10 Sigmas of increasing difficulty. If you can beat them all, you'll be the biggest Sigma around. 

            How do you beat a sigma?
            You must play words from a hand of cards. These cards each represent one letter. Cards all have a base damage based on their difficulty to use (ex. Q is worth 10 and E is worth 1).
            A longer the word will also have a higher the damage multiplier! Put your vocab to the test. 

            How do I get cards?
            You can buy cards for money in the shop. Easier to play cards will be more expensive, and harder to play cards will be less expensive. 

            Can the Sigmas win?
            Yes! You can only shuffle your deck 3 times for each fight. You shuffle your deck automatically when your deck runs low. Make sure to buy lots of cards so you can play more words!

            What if I get stuck?
            If you get stuck, you can play one vowel to cycle your hand. You'll do little damage but have the opportunity to play more words. 
    
            Are you ready to become the ultimate Sigma warrior? Let's get started!
            `;
        const instructionsObject = this.add.text(config.width / 2, config.height/2, instructionsText, { fontSize: '20px', fill: '#000', align: 'center', wordWrap: { width: config.width - 100 } });
        instructionsObject.setOrigin(0.5);
    
        // Add button
        this.add.rectangle(config.width / 2, config.height - 70, 180, 60, 0x00ff00).setOrigin(0.5);
        const button = this.add.text(config.width / 2, config.height - 70, 'Main Menu', { fontSize: '24px', fill: '#000' }).setOrigin(0.5).setInteractive().on('pointerdown', () => {
            this.scene.start('Start');
        });
        const buttonBounds = button.getBounds();
    }
    
    
    
    

    update() {
        // Parallax scrolling effect
        this.background.tilePositionY -= 0.5;
        this.background.tilePositionX += 0.5;
    }
}
