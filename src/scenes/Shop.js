class Shop extends Phaser.Scene {

    constructor() {
        super('Shop');
    }

    init(data) {
        this.data = data;
    }

    preload() {

    }

    create() {
        /*background*/
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "shopBackground");
        this.background.setOrigin(0, 0);
        this.background.setScale(3);

        this.add.text(config.width / 10, config.height / 15, "Shop", { font: config.width / 15 + "px Brush Script MT, cursive", fill: "black" });

        /*Shop*/
        // Add the rectangle to the scene
        this.blackBox = this.add.rectangle(config.width / 2, config.height * 5/8 , config.width * 6/7 , config.height * 5/8, 0x000000, .9);

        this.waresAccent = this.add.rectangle(config.width / 2.015, config.height / 2.55, config.width / 8, config.height / 14, 0xf0e62e, .9);
        this.add.text(config.width / 2.24, config.height / 2.8, "Wares", {
            font: config.width / 30 + "px Brush Script MT, cursive", fill: "black",
        });
        this.add.text(config.width / 2.25, config.height / 2.8, "Wares", {
            font: config.width / 30 + "px Brush Script MT, cursive", fill: "white",
        });

        // Add cards
        var card1Char = getRandLetter();
        this.card1 = this.add.image(config.width * 18 / 100, config.height / 1.65 , card1Char);
        this.card1.setScale(.7);

        var card2Char = getRandLetter();
        this.card2 = this.add.image(config.width * 34 / 100, config.height / 1.65 , card2Char);
        this.card2.setScale(.7);

        var card3Char = getRandLetter();
        this.card3 = this.add.image(config.width * 50 / 100, config.height / 1.65 , card3Char);
        this.card3.setScale(.7);

        var card4Char = getRandLetter();
        this.card4 = this.add.image(config.width * 66 / 100, config.height / 1.65 , card4Char);
        this.card4.setScale(.7);

        var card5Char = getRandLetter();
        this.card5 = this.add.image(config.width * 82 / 100, config.height / 1.65 , card5Char);
        this.card5.setScale(.7);

        // Cost of each letter. More frequent letters are more expensive 
        const letterCostMap = {
            'a': 3,
            'b': 2,
            'c': 1,
            'd': 2,
            'e': 3,
            'f': 2,
            'g': 1,
            'h': 2,
            'i': 3,
            'j': 2,
            'k': 2,
            'l': 1,
            'm': 2,
            'n': 3,
            'o': 3,
            'p': 2,
            'q': 2,
            'r': 3,
            's': 3,
            't': 3,
            'u': 2,
            'v': 2,
            'w': 2,
            'x': 2,
            'y': 2,
            'z': 1
        };

        // Add price button and text
        const buy1 = this.add.text(config.width * 18 / 100, config.height * 85 / 100 , `Cost ${letterCostMap[card1Char]}`, {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#000000',
            backgroundColor: '#FFD1DC',
            padding: {
                x: 10,
                y: 5
            }
        }).setOrigin(0.5).setInteractive();

        const buy2 = this.add.text(config.width * 34 / 100, config.height * 85 / 100 , `Cost ${letterCostMap[card2Char]}`, {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#000000',
            backgroundColor: '#FFD1DC',
            padding: {
                x: 10,
                y: 5
            }
        }).setOrigin(0.5).setInteractive();
        
        const buy3 = this.add.text(config.width * 50 / 100, config.height * 85 / 100 , `Cost ${letterCostMap[card3Char]}`, {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#000000',
            backgroundColor: '#FFD1DC',
            padding: {
                x: 10,
                y: 5
            }
        }).setOrigin(0.5).setInteractive();

        const buy4 = this.add.text(config.width * 66 / 100, config.height * 85 / 100 , `Cost ${letterCostMap[card4Char]}`, {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#000000',
            backgroundColor: '#FFD1DC',
            padding: {
                x: 10,
                y: 5
            }
        }).setOrigin(0.5).setInteractive();

        const buy5 = this.add.text(config.width * 82 / 100, config.height * 85 / 100 , `Cost ${letterCostMap[card5Char]}`, {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#000000',
            backgroundColor: '#FFD1DC',
            padding: {
                x: 10,
                y: 5
            }
        }).setOrigin(0.5).setInteractive();

        /*Boss Button*/
        const bossButton = this.add.text(config.width / 1.2, config.height / 6, 'To Boss →', {
            fontFamily: 'Arial',
            fontSize: '60px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: {
            x: 16,
            y: 8
            }
        }).setOrigin(0.5).setInteractive();
        bossButton.on('pointerup', () => {
            this.data.iterationIndex += 1;
            this.scene.start('Boss', this.data);
        });

    }

    update() {
        this.background.tilePositionY -= .5;
        
        //money count change test
        this.moneyText?.destroy(); // Clear previous money count
        this.moneyText = this.add.text(config.width / 9, config.height / 5, `Money: ${this.data.money}`, { font: "25px Arial", fill: "black" });
    }
}

function getRandLetter() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet.charAt(randomIndex);
}
