// import Deck from '../Data/Deck.js'; //TODO: Fix import

class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    init() {

    }

    preload() {

    }



    create() {
        var data = {
            money: 10, // initial money tbd
            score: 0,
            // deck: new Deck(), // TODO: fix the deck not loading
            level: 0,
        }

        // data.deck.initDeck();  // TODO: fix the deck being sussy

        // Add a background image
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "startBackground");
        this.background.setOrigin(0);
        this.background.setScale(2); //why doesnt this work? -- scale was uncapitalized lol


        // Add a title text
        this.add.text(config.width / 2, 100, 'Welcome to WordGame', {
            fontFamily: 'Luminari',
            fontSize: config.width / 20 + 'px',
            color: '#ffffff',
            fontWeight: 'bold'
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
            this.scene.start('Shop', data);
        });
    }

    update() {
        this.background.tilePositionY -= 0.5;
        this.background.tilePositionX += 0.5;
    }
}

