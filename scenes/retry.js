export default class retry extends Phaser.Scene {
    constructor() {
    super("main");
    }

    preload () {
        //imports
        this.load.image("GamesOver","../public/assets/gameOver.png")
    }

    create () {
        //scene
        over = this.physics.add.staticGroup(300,300, "GameOver")
    }


    update () {
        //actions
    }
}
