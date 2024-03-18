class Tutorial extends Phaser.Scene {
    constructor() {
        super('Tutorial');
    }

    create() {
        // Update the tutorial scene (e.g., handle player input, game logic)
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "startBackground");
        this.background.setOrigin(0);
        this.background.setScale(2);
    
        // Add title
        const title = this.add.text(config.width / 2, 50, 'Tutorial', { fontSize: '32px', fill: '#000' });
        title.setOrigin(0.5);
    
        // Add detailed instructions
        const instructionsText = `
        Welcome to SussyBalls - Word Game! In this game, you will embark on an epic journey to defeat powerful bosses by playing words.
        
        How to Play:
        1. You will encounter various bosses throughout the game. Your goal is to defeat each boss by playing words.
        
        2. To play a word, simply click on the letters in the grid below the boss. Click on the letters in the correct order to form a valid word.
        
        3. Each word you play will have a score associated with it. The longer the word, the higher the score multiplier.
        
        4. Keep an eye on the health bar at the top of the screen. If the bar runs out you defeat the boss!
        
        5. Earn money by defeating bosses and use it to purchase power-ups and upgrades from the shop.
        
        Are you ready to become the ultimate word warrior? Let's get started!
        `;
        const instructionsObject = this.add.text(config.width / 2, config.height/2, instructionsText, { fontSize: '20px', fill: '#000', align: 'center', wordWrap: { width: config.width - 100 } });
        instructionsObject.setOrigin(0.5);
    
        // Add button
        const button = this.add.text(config.width / 2, config.height - 100, 'Start Game', { fontSize: '24px', fill: '#000' }).setOrigin(0.5).setInteractive().on('pointerdown', () => {
            this.scene.start('Start');
        });
        const buttonBounds = button.getBounds();
    
        // Add box behind the butto
    }

    update() {
        // Parallax scrolling effect
        this.background.tilePositionY -= 0.5;
        this.background.tilePositionX += 0.5;
    }
}
