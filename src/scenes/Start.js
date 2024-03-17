//import Deck from 'src/Data/Deck.js'; //TODO: Fix import
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
            deck: new Deck(), 
            level: 1,
        }
        data.deck.initDeck();  

        // Add a background image
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "startBackground");
        this.background.setOrigin(0);
        this.background.setScale(2);


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

        // Add a credits button
        const creditsButton = this.add.text(config.width / 2, 300, 'Credits', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: {
                x: 16,
                y: 8
            }
        }).setOrigin(0.5).setInteractive();
        // Add an event listener to the credits button
        creditsButton.on('pointerdown', () => {
            this.scene.start('Credits');
        });
    }

    update() {
        this.background.tilePositionY -= 0.5;
        this.background.tilePositionX += 0.5;
    }
}


//TODO: verify the code is working and that the deck can be imported/manipulated in scenes
class Deck {
    
    constructor() {
        this.head = null; // Added head property
        this.tail = null;
        this.length = 0;
    }

    addLetter(letterObj) {
        const node = {
            letter: letterObj,
            next: null
        };
        if (this.head === null) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
        this.length++;
    }

    removeLetter() {
        if (this.head === null) {
            return null;
        }
        const letter = this.head.letter;
        this.head = this.head.next;
        if (this.head === null) {
            this.tail = null;
        }
        this.length--;
        return letter;
    }

    initDeck(){

        const letters = [
            { letter: 'A', value: 1 },
            { letter: 'B', value: 3 },
            { letter: 'C', value: 3 },
            { letter: 'D', value: 2 },
            { letter: 'E', value: 1 },
            { letter: 'F', value: 4 },
            { letter: 'G', value: 2 },
            { letter: 'H', value: 4 },
            { letter: 'I', value: 1 },
            { letter: 'J', value: 8 },
            { letter: 'K', value: 5 },
            { letter: 'L', value: 1 },
            { letter: 'M', value: 3 },
            { letter: 'N', value: 1 },
            { letter: 'O', value: 1 },
            { letter: 'P', value: 3 },
            { letter: 'Q', value: 10 },
            { letter: 'R', value: 1 },
            { letter: 'S', value: 1 },
            { letter: 'T', value: 1 },
            { letter: 'U', value: 1 },
            { letter: 'V', value: 4 },
            { letter: 'W', value: 4 },
            { letter: 'X', value: 8 },
            { letter: 'Y', value: 4 },
            { letter: 'Z', value: 10 }
        ];
    
        const initiDeckSize = 10;
        for (let i = 0; i < initiDeckSize; i++) {
            const randomIndex = Math.floor(Math.random() * letters.length);
            const randomLetterObj = letters[randomIndex]; // Generating random letter object
            this.addLetter(randomLetterObj); // Adding letter object to the deck
        }
    }
}