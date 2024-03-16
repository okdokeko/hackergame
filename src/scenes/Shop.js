class Shop extends Phaser.Scene
{
    
    constructor ()
    {
        super('Shop');
    }

    init (data)
    {
        
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
    }
}

