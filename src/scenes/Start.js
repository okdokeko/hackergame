

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
            dictionary: new Dict('/src/assets/words.txt'),
            letterScores: {
                'a': 1, 'e': 1, 'i': 1, 'o': 1, 'u': 1, 'l': 1, 'n': 1, 's': 1, 't': 1, 'r': 1,
                'd': 2, 'g': 2,
                'b': 3, 'c': 3, 'm': 3, 'p': 3,
                'f': 4, 'h': 4, 'v': 4, 'w': 4, 'y': 4,
                'k': 5,
                'j': 8, 'x': 8,
                'q': 10, 'z': 10
            }
        };
        data.deck.initDeck();

        // Add sound
        var music = this.sound.add("startScreenMusic", { loop: true });
        var click = this.sound.add("onClick", { loop: false, volume: .3 });
        music.play();

        // Add a background image
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "startBackground");
        this.background.setOrigin(0);
        this.background.setScale(2);

        // Add particle effects
        this.add.particles(config.width * 5 / 10, config.height * 15 / 100, 'red', {
            speed: 200,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });
        this.add.particles(config.width * 2 / 10, config.height * 15 / 100, 'red', {
            speed: 200,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });
        this.add.particles(config.width * 3 / 10, config.height * 15 / 100, 'red', {
            speed: 200,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });
        this.add.particles(config.width * 6 / 10, config.height * 15 / 100, 'red', {
            speed: 200,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });
        this.add.particles(config.width * 7 / 10, config.height * 15 / 100, 'red', {
            speed: 200,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });

        // Add logo
        this.add.image(config.width / 2, config.height * 20 / 100, "title_holder").setScale(.15, .06);
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
        this.add.text(config.width * 1 / 100, config.height * 90 / 100, "Version: 3.3.4", {
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

    //returns a random letter from the list 
    makeHand() {
        if (this.length === 0) {
            return null;
        }

        const handSize = 7; // Define the size of the hand
        const hand = [];
        const selectedLetters = new Set(); // Set to keep track of selected letters

        //let current = this.head; // Start from the head of the list
        while (hand.length < handSize) {
            const currLetter = this.removeLetter();
            hand.push(currLetter);
        }
        
        return hand;
    }

    /* Old stuff from makeHand */
    //selectedLetters.add(currLetter);
    // // Generate a random index to select a letter from the deck
    // const randomIndex = Math.floor(Math.random() * this.length);
    // let count = 0;
    // let temp = this.head; // Use a temporary pointer to traverse the list

    // // Traverse the list to the randomly selected index
    // while (count < randomIndex && temp !== null) {
    //     temp = temp.next;
    //     count++;
    // }

    // // Check if the selected letter is not already in the hand
    // if (temp !== null && !selectedLetters.has(temp.letter)) {
    //     // Add the selected letter to the hand
    //     hand.push(temp.letter);
    //     selectedLetters.add(temp.letter);
    // }

    // current = this.head; // Reset current to the head for the next iteration


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

    /* Shuffling */
    // Method to convert the linked list to an array
    toArray() {
        const array = [];
        let current = this.head;
        while (current) {
            array.push(current.letter);
            current = current.next;
        }
        return array;
    }

    // Method to insert a node at the end of the linked list
    insertAtEnd(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
    }

    // Method to add an array of letters to the end of the linked list
    addLettersArray(lettersArray) {
        for (let i = 0; i < lettersArray.length; i++) {
            const node = {
                letter: lettersArray[i],
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
    }

    // Method to shuffle the linked list
    shuffle(discardedCards) {
        // Convert linked list to array
        const linkedListArray = this.toArray();

        // Concatenate the discarded cards array with the original linked list array
        const array = linkedListArray.concat(discardedCards);

        // Shuffle the array (Fisher-Yates shuffle algorithm)
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }

        // Reconstruct the linked list using the shuffled array
        this.head = null;
        this.length = 0;
        this.addLettersArray(array);
    }

    //initializes the deck, and ensures some vowels
    initDeck() {

        const letters = [
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
            'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
            'w', 'x', 'y', 'z'
        ];

        const initiDeckSize = 14;
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

class Dict {
    constructor(filePath) {
        this.wordsSet = new Set();
        this.initialize(filePath);
    }

    async initialize(filePath) {
        await this.loadDictionary(filePath);
        console.log(this.wordsSet);
    }

    async loadDictionary(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error('Failed to load dictionary file');
            }
            const wordsText = await response.text();
            const wordsArray = wordsText.split('\n');
            wordsArray.forEach(word => {
                // Check if the word contains only letters
                if (/^[a-zA-Z]+$/.test(word)) {
                    this.wordsSet.add(word.trim().toLowerCase());
                }
            });
        } catch (error) {
            console.error('Error loading dictionary:', error);
        }
    }

    // Method to check if a word exists in the dictionary
    hasWord(word) {
        return this.wordsSet.has(word.toLowerCase());
    }
}
