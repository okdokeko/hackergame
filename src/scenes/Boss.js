class Boss extends Phaser.Scene {
    constructor() {
        super("Boss");
    }

    init(data) {
        this.data = data;
    }

    create() {
        this.cameras.main.setBackgroundColor(0xffcccc);

        var bossMaxHealth = 100 * this.data.level;
        var bossCurrHealth = 75;

        // Add text box
        const textBox = this.add.text(config.width / 2, config.height / 10, "Boss 1: Bennet Jackson", {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: {
                x: 10,
                y: 5
            }
        });
        textBox.setOrigin(0.5);

        // Add boss image
        var bossImage = this.add.image(config.width / 4, config.height / 3, 'boss');
        bossImage.setScale(.4, .1);

        // Add black rectangle
        const rect = this.add.rectangle(config.width / 2, config.height / 1.3, config.width / 2, config.height / 3, 0x000000);

        // Add health bar
        const healthBar = this.add.rectangle(bossImage.x + config.width / 2.5, config.height / 5, config.width / 3, config.height / 15, 0x000000);
        const currHealthBar = this.add.rectangle(bossImage.x + config.width / 2.5, config.height / 5,
            (config.width / 3) * (bossCurrHealth / bossMaxHealth), config.height / 15, 0xff0000);

        // Add HP text
        const hpText = this.add.text(bossImage.x + config.width / 2.5, config.height / 5 - 30, "HP", {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: {
                x: 10,
                y: 5
            }
        });
        hpText.setOrigin(0.5);

        // Add health text
        const healthText = this.add.text(bossImage.x + config.width / 2.5, config.height / 5, `${bossCurrHealth} / ${bossMaxHealth}`, {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: {
                x: 10,
                y: 5
            }
        });
        healthText.setOrigin(0.5);

        // Add current hand text
        const handText = this.add.text(config.width / 2, config.height / 1.15, "Current Hand", {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: {
                x: 10,
                y: 5
            }
        });
        handText.setOrigin(0.5);

        // Add play word text
        const playWordText = this.add.text(bossImage.x + config.width / 2.5, config.height / 5 + 60, "Play Word", {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: 'black',
            backgroundColor: 'gold', // Modified background color
            padding: {
                x: 10,
                y: 5
            }
        });
        playWordText.setOrigin(0.5);

        // Add gold line under the hp bar
        const goldLine = this.add.rectangle(healthBar.x, healthBar.y + 220, config.width / 3, 2, 0xffd700);
        goldLine.setStrokeStyle(4, 0x000000);

        //Display money
        this.moneyText = this.add.text(config.width / 9, config.height / 10, `Money: ${this.data.money}`, { font: "25px Arial", fill: "black" });

        //Display level
        this.moneyText = this.add.text(config.width / 4, config.height / 10, `Level: ${this.data.level}`, { font: "25px Arial", fill: "black" });


        //temp shop button
        const shopButton = this.add.text(config.width - 100, 300, 'Shop', {
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
        shopButton.on('pointerdown', () => {

            this.data.level += 1;

            if (this.data.level == 11) {
                this.scene.start('Win');
            }
            else {
                this.scene.start('Shop', this.data);
            }
        });

    }
}