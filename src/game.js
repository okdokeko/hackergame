
var config = {
    width: 1980*2/3, //old: 500
    height: 1080*2/3, //old: 393
    backgroundColor: 0x000000,
    scene: [Main, Start, Shop, Boss, Lose, Win, Credits]
}

var game = new Phaser.Game(config);