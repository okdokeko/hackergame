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
        };
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
    
        // Add a start button
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
    
        // Add a tutorial button
        const tutorialButton = this.add.text(config.width / 2, 300, 'Tutorial', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: {
                x: 16,
                y: 8
            }
        }).setOrigin(0.5).setInteractive();
        // Add an event listener to the tutorial button
        tutorialButton.on('pointerdown', () => {
            this.scene.start('Tutorial');
        });
    
        // Add a credits button
        const creditsButton = this.add.text(config.width / 2, 400, 'Credits', {
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
            'A',
            'B',
            'C',
            'D',
            'E',
            'F',
            'G',
            'H',
            'I',
            'J',
            'K',
            'L',
            'M',
            'N',
            'O',
            'P',
            'Q',
            'R',
            'S',
            'T',
            'U',
            'V',
            'W',
            'X',
            'Y',
            'Z'
        ];
    
        const initiDeckSize = 40;
        for (let i = 0; i < initiDeckSize; i++) {
            const randomIndex = Math.floor(Math.random() * letters.length);
            const randomLetter = letters[randomIndex]; // Generating random letter object
            this.addLetter(randomLetter); // Adding letter object to the deck
        }
    }
}