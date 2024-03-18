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
        //data that gets passed between scenes
        var data = {
            money: 10,
            score: 0,
            deck: new Deck(), 
            level: 1,
        };
        data.deck.initDeck();  
    

        // Add sound
        var music = this.sound.add("startScreenMusic", {loop: true});
        var click = this.sound.add("onClick", {loop: false, volume: .3});
        music.play();

        // Add a background image
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "startBackground");
        this.background.setOrigin(0);
        this.background.setScale(2);

        // Add particle effects
        this.add.particles(config.width * 5 / 10, config.height * 15/100, 'red', {
            speed: 200,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });
        this.add.particles(config.width * 2 / 10, config.height * 15/100, 'red', {
            speed: 200,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });
        this.add.particles(config.width * 3 / 10, config.height * 15/100, 'red', {
            speed: 200,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });
        this.add.particles(config.width * 6 / 10, config.height * 15/100, 'red', {
            speed: 200,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });
        this.add.particles(config.width * 7 / 10, config.height * 15/100, 'red', {
            speed: 200,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });

        // Add logo
        this.add.image(config.width / 2, config.height * 20/100, "title_holder").setScale(.15,.06);
        this.logo = this.add.image(config.width / 2, 150, 'logo');
        this.logo.setScale(1.5);
    
        // Add a start button
        const startButton = this.add.text(config.width / 2, 300, 'Start', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#ffffff',
            backgroundColor: '#B8860B',
            padding: {
                x: 16,
                y: 8
            },
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5).setInteractive();
    
        // Add an event listener to the start button
        startButton.on('pointerdown', () => {
            this.scene.start('Shop', data);
        });
    
        // Add a tutorial button
        const tutorialButton = this.add.text(config.width / 2, 400, 'Tutorial', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#ffffff',
            backgroundColor: '#B8860B',
            padding: {
                x: 16,
                y: 8
            },
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5).setInteractive();

        // Add an event listener to the tutorial button
        tutorialButton.on('pointerdown', () => {
            this.scene.start('Tutorial');
        });
    
        // Add a credits button
        const creditsButton = this.add.text(config.width / 2, 500, 'Credits', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#ffffff',
            backgroundColor: '#B8860B',
            padding: {
                x: 16,
                y: 8
            },
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5).setInteractive();

        // Add an event listener to the credits button
        creditsButton.on('pointerdown', () => {
            this.scene.start('Credits');
        });

        // Add a button to toggle music
        const musicButton = this.add.text(config.width / 2, 600, 'Music Off (Recommended experience)', {
            fontFamily: 'Arial',
            fontSize: '12px',
            color: '#ffffff',
            backgroundColor: '#B8860B',
            padding: {
                x: 16,
                y: 8
            },
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5).setInteractive();
        // Add an event listener to the music button
        musicButton.on('pointerdown', () => {
            music.stop();
        });

        //Add version note
        this.add.text(config.width * 1/ 100, config.height * 90 / 100, "Version: 2.3.3", {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#ffffff',
        });

        //On click sound effect
        this.input.on('pointerdown', () => {
            click.play();
        });
    }
    

    update() {
        // create background motion
        this.background.tilePositionY -= 0.5;
        this.background.tilePositionX += 0.5;
    }
}


class Deck {
    // A linked list that is used to implement the deck
    // The nodes contain char data and nodes to traverse
    constructor() {
        this.head = null; // Added head property
        this.tail = null;
        this.length = 0;
    }

    //returns array of all letters
    getAllLetters() {
        let letters = [];
        let current = this.head;
        while (current != null) {
            letters.push(current.letter);
            current = current.next;
        }
        return letters;
    }

    //adds a letter to the end of the list
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

    //removes a letter from the front of the list
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

    //returns a random letter from the list 
    getRandomLetter() {
        if (this.length === 0) {
            return null;
        }
        const randomIndex = Math.floor(Math.random() * this.length);
        let current = this.head;
        for (let i = 0; i < randomIndex; i++) {
            current = current.next;
        }
        return current.letter;
    }

    //initializes the deck, and ensures some vowels
    initDeck(){

        const letters = [
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
            'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
            'w', 'x', 'y', 'z'
        ];
    
        const initiDeckSize = 8;
        for (let i = 0; i < initiDeckSize; i++) {
            const randomIndex = Math.floor(Math.random() * letters.length);
            const randomLetter = letters[randomIndex]; // Generating random letter object
            this.addLetter(randomLetter); // Adding letter object to the deck
        }
        this.addLetter('a');
        this.addLetter('a');
        this.addLetter('e');
        this.addLetter('e');
        this.addLetter('i');
        this.addLetter('i');
        this.addLetter('o');
        this.addLetter('o');
        this.addLetter('u');
    }
}