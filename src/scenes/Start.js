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
    

        //Sounds
        var music = this.sound.add("startScreenMusic", {loop: true});
        var click = this.sound.add("onClick", {loop: false, volume: .3});
        music.play();

        // Add a background image
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "startBackground");
        this.background.setOrigin(0);
        this.background.setScale(2);
    
        // Add a title text
        /*this.add.text(config.width / 2, 100, 'Welcome to WordGame', {
            fontFamily: 'Luminari',
            fontSize: config.width / 20 + 'px',
            color: '#ffffff',
            fontWeight: 'bold'
        }).setOrigin(0.5);*/

        //Add Logo
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
        //this.add.rectangle(config.width / 2, config.height * 20/100, config.width * 66 / 100, config.height * 20 / 100, 0xB8860B, 1);
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
        this.add.text(config.width * 1/ 100, config.height * 90 / 100, "Version: 2.2.0", {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#ffffff',
        });
        //On click effect
        this.input.on('pointerdown', () => {
            click.play();
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

    getAllLetters() {
        let letters = [];
        let current = this.head;
        while (current != null) {
            letters.push(current.letter);
            current = current.next;
        }
        return letters;
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
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
            'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
            'w', 'x', 'y', 'z'
        ];
    
        const initiDeckSize = 1;
        for (let i = 0; i < initiDeckSize; i++) {
            const randomIndex = Math.floor(Math.random() * letters.length);
            const randomLetter = letters[randomIndex]; // Generating random letter object
            this.addLetter(randomLetter); // Adding letter object to the deck
        }
    }
}