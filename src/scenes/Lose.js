class Lose extends Phaser.Scene {
    constructor() {
        super('Lose');
    }

    create() {
        const loseText = this.add.text(
            this.cameras.main.width - 100,
            this.cameras.main.height - 100,
            'You Lose',
            {
                fontSize: '48px',
                color: '#ff0000',
            }
        );

        // Set origin to the center of the text
        loseText.setOrigin(0.5);

        // Define the radius of the circular motion
        const radius = 100;

        // Add a tween to make the text spin in a circle
        this.tweens.add({
            targets: loseText,
            x: {
                value: 100,
                ease: 'Sine.easeInOut',
                duration: 2000, // Adjust the duration as needed
                yoyo: true,
                repeat: -1 // Repeat indefinitely
            },
            y: {
                value: 100,
                ease: 'Sine.easeInOut',
                duration: 2000, // Adjust the duration as needed
                yoyo: true,
                repeat: -1 // Repeat indefinitely
            },
            angle: {
                value: '+=360', // Rotate 360 degrees
                ease: 'Linear',
                duration: 2000, // Adjust the duration as needed
                repeat: -1 // Repeat indefinitely
            }
        });
    }
}
