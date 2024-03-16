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

        this.a = this.add.image(config.width/2-60, config.height/3 * 2, "a");
        
        this.add.text(130,20, "Welcome to the shop", {font: "25px Arial", fill: "black"});
        this.moneyText = this.add.text(260,50, `Money: ${this.money}`, {font: "25px Arial", fill: "black"})
    }

    update ()
    {
        //this.moneyText.setText("Money: " + money);
    }
}

