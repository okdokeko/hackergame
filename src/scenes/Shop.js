class Shop extends Phaser.Scene
{
    
    constructor ()
    {
        super('Shop');
    }

    init (data)
    {
        this.money = data.money;
        this.score = data.score;
        this.deck = data.deck;
        this.iterationIndex = data.iterationIndex + 1;
    }

    preload ()
    {
        
    }

    create ()
    {
        this.background = this.add.image(0,0, "shopBackground");
        this.background.setOrigin(0,0);
        this.background.setScale(3);

        this.a = this.add.image(config.width/2-60, config.height/3 * 2, "a");
        
        this.add.text(config.width / 10 , config.height/15, "Shop", {font: config.width / 15 + "px Brush Script MT, cursive", fill: "black"});
        this.moneyText = this.add.text(config.width / 9 ,config.height/5, `Money: ${this.money}`, {font: "25px Arial", fill: "black"})

        // this.blackBox = this.add.rectangle(config.width/2, config.height/2, 200, 200, 0x000000);
    }

    update ()
    {
        //this.moneyText.setText("Money: " + money);
    }
}

