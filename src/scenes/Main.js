class Main extends Phaser.Scene {
    constructor() {
        super("Main");
    } 

    init() {
        
    }
    preload(){
        this.load.image("shopBackground", "/src/assets/shopBackground.jpg");
        this.load.image("startBackground", "/src/assets/startBackground.jpg");
        this.load.image("bossBackground", "/src/assets/bossBackground.jpg");
        this.load.image("trophy", "/src/assets/trophy.png");
        this.load.audio("startScreenMusic", "/src/assets/music.mp3");
        this.load.image("logo", "/src/assets/logo.png");
        this.load.image("red", "/src/assets/red.png");
        this.load.image("title_holder", "/src/assets/title_holder.png");
        this.load.audio("onClick", "/src/assets/button.mp3");
        this.load.image("shop", "/src/assets/shop.png");
        this.load.bitmapFont('vermin', '/src/assets/vermin.png', '/src/assets/vermin.xml');
        this.load.image("flame", "/src/assets/flame1.png");


        for (let i = 1; i <= 10; i++) {
            this.load.image(`boss${i}`, `/src/assets/bosses/boss${i}.jpg`);
        }

        for (let letter of 'abcdefghijklmnopqrstuvwxyz') {
            this.load.image(letter, `/src/assets/alphabet/${letter}.png`);
        }


//add dictionary to load maybe?

    }

    create() {
        this.add.text(20,20, "Loading game...");
        this.scene.start("Start");
    }
}