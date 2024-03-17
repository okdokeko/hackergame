class Boss extends Phaser.Scene {
    constructor() {
        super("Boss");
    }

    init(data) {
        this.data = data;
        this.bossMaxHealth = 100 * this.data.level;
        this.bossCurrHealth = this.bossMaxHealth;
    }

    create() {
        this.cameras.main.setBackgroundColor(0xffcccc);

        // Add text box
        const textBox = this.add.text(config.width / 2, config.height / 10, `Boss ${this.data.level}: Bennet Jackson`, {
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

        // Add boss image as a class member
        this.bossImage = this.add.image(config.width / 4, config.height / 3, 'boss');
        this.bossImage.setScale(.4, .1);

        // Add black rectangle
        const rect = this.add.rectangle(config.width / 2, config.height / 1.3, config.width / 2, config.height / 3, 0x000000);

        // Add health bar
        const healthBar = this.add.rectangle(this.bossImage.x + config.width / 2.5, config.height / 5, config.width / 3, config.height / 15, 'red');

        // Add HP text
        const hpText = this.add.text(this.bossImage.x + config.width / 2.5, config.height / 5 - 30, "HP", {
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
        const playWordText = this.add.text(this.bossImage.x + config.width / 2.5, config.height / 5 + 60, "Play Word", {
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
        this.levelText = this.add.text(config.width / 4, config.height / 10, `Level: ${this.data.level}`, { font: "25px Arial", fill: "black" });

    }

    update() {
        //money count change test

        //this.currHealthBar?.destroy();
        this.currHealthBar = this.add.rectangle(this.bossImage.x + config.width / 2.5, config.height / 5,
            (config.width / 3) * (this.bossCurrHealth / this.bossMaxHealth), config.height / 15, 'gold');

        this.bossCurrHealth -= 1;


        // Add health text
        const healthText = this.add.text(this.bossImage.x + config.width / 2.5, config.height / 5, `${this.bossCurrHealth} / ${this.bossMaxHealth}`, {
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


        if (this.bossCurrHealth < 1) {
            this.data.level += 1;
            if (this.data.level == 11) {
                this.scene.start('Win');
            } else {
                this.scene.start('Shop', this.data);
            }
        }

        // this.moneyText?.destroy(); // Clear previous money count
        // this.moneyText = this.add.text(config.width / 9, config.height / 5, `Money: ${this.data.money}`, { font: "25px Arial", fill: "black" });
    }
}
