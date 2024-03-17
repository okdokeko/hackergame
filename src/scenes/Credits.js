class Credits extends Phaser.Scene {
    constructor() {
        super('Credits');
    }

    create() {
        // Add your credits text here
        this.add.text(400, 300, 'Credits Scene', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        // Add any other elements or animations you want for your credits scene

        // Example: Go back to the main menu after a delay
        this.time.delayedCall(500, () => {
            this.scene.start('Start');
        });
    }
}
