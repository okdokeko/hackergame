class Win extends Phaser.Scene {
    constructor() {
        super('Win');
    }

    preload() {
        this.load.image('trophy', 'path/to/trophy.png');
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.add.image(centerX, centerY, 'trophy').setScale(.5);

        this.add.text(centerX, 150, 'YOU WIN!!!', {
            fontSize: '100px',
            color: '#ffffff',
        }).setOrigin(0.5);

        this.add.text(centerX, centerY + 200, 'Go to Start', {
            fontSize: '50px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: {
                left: 20,
                right: 20,
                top: 10,
                bottom: 10
            }
        }).setOrigin(0.5).setInteractive().on('pointerdown', () => {
            this.scene.start('Start');
        });
    }
}