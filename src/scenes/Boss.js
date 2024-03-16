class Boss extends Phaser.Scene {
    constructor() {
        super("Boss");
    }

    create() {
        this.add.text(20,20, "Loading game...");
    }
}