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
            deck: {
                head: null,
                tail: null,
                length: 0,
                addLetter: function(letter) {
                    const node = {
                        letter: letter,
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
                },
                removeLetter: function() {
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
            },
            level: 0, //which shop/boss loop is the player? entering shop increments this.
        }

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

