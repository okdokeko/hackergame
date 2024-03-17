class Main extends Phaser.Scene {
    constructor() {
        super("Main");
    } 

    init() {
        
    }
    preload(){
        this.load.image("shopBackground", "/src/assets/background.jpg");
        this.load.image("startBackground", "/src/assets/startBackground.jpg")
        this.load.image("a", "/src/assets/alphabet/a.png");
    }

    create() {
        this.add.text(20,20, "Loading game...");
        this.scene.start("Start");
    }
}














// class Main {
//     static hand = {
//         A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4, I: 1, J: 8, K: 5, L: 1, M: 3,
//         N: 1, O: 1, P: 3, Q: 10, R: 1, S: 1, T: 1, U: 1, V: 4, W: 4, X: 8, Y: 4, Z: 10
//     };

//     static userMoney = 1000;
//     static userMultiplier = 1.5;
//     static userCards = {
//         card1: { name: 'Card 1', multiplier: 2 },
//         card2: { name: 'Card 2', multiplier: 3 },
//         card3: { name: 'Card 3', multiplier: 4 }
//     };

//     static displayVariables() {
//         const moneySpan = document.getElementById('money');
//         moneySpan.textContent = Main.userMoney;

//         const handSpan = document.getElementById('hand');
//         handSpan.textContent = JSON.stringify(Main.hand);
//     }
// }

// // Call the displayVariables function to update the HTML content
// Main.displayVariables();
