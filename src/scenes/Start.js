class Start extends Phaser.Scene
{
    
    constructor ()
    {
        super('Start');
    }

    init (data)
    {
        
    }

    preload ()
    {
        
    }

    create ()
    {
            // Add a background image
            this.background = this.add.image(0,0, "startBackground");
            this.background.setOrigin(0);
            

            // Add a title text
            this.add.text(config.width / 2, 100, 'Welcome to WordGame', {
                fontFamily: 'Arial',
                fontSize: '40px',
                color: '#ffffff'
            }).setOrigin(0.5);

            //Add a start button
            const startButton = this.add.text(config.width / 2, 200, 'Start', {
                fontFamily: 'Arial',
                fontSize: '32px',
                color: '#ffffff',
                backgroundColor: '#000000',
                padding: {
                    x: 16,
                    y: 8
                }
            }).setOrigin(0.5).setInteractive();

            // Add an event listener to the start button
            startButton.on('pointerdown', () => {
                this.scene.start('Shop');
            });
    }
}

