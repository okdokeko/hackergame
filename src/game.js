
var config = {
    width: 1980*2/3, //old: 500
    height: 1080*2/3, //old: 393
    backgroundColor: 0xFFFFFF,
    scene: [Main, Start, Shop, Boss, Lose, Win, Credits, Tutorial]
}

var game = new Phaser.Game(config);