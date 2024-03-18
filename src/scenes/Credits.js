class Credits extends Phaser.Scene {
    constructor() {
        super('Credits');
    }

    create() {
        this.cameras.main.setBackgroundColor('#FFFFFF');
        // Add your credits text here

        this.add.text(config.width / 2, 200, 'Credits', { fontSize: '24px', fill: '#000000' }).setOrigin(0.5);
        this.add.text(config.width / 2, 250, 'Software - Samuel Moreno, Maximilian Mace, Phoenix Garcia, William Rains', { fontSize: '16px', fill: '#000000' }).setOrigin(0.5);
        this.add.text(config.width / 2, 280, 'Assets - Maximilian Mace, Samuel Moreno', { fontSize: '16px', fill: '#000000' }).setOrigin(0.5);
        this.add.text(config.width / 2, 310, 'Music - William Rains', { fontSize: '16px', fill: '#000000' }).setOrigin(0.5);
        this.add.text(config.width / 2, 340, 'Inspired by Balatro', { fontSize: '16px', fill: '#000000' }).setOrigin(0.5);
        // Add any other elements or animations you want for your credits scene
        // Add a button to go to the start screen
        const graphics = this.add.graphics();
        graphics.fillStyle(0xF08080, 1);
        graphics.fillRect(config.width / 2 - 100, config.height - 130, 200, 60);
        const button = this.add.text(config.width / 2, config.height - 100, 'To Start', { fontSize: '24px', fill: '#0000000' }).setOrigin(0.5);
        button.setStroke('#000000', 2); // Add this line to add a black border around the button
        button.setInteractive();
        button.on('pointerdown', () => {
            this.scene.start('Start');
        });
    }
}
