export default class Preload extends Phaser.Scene {
    constructor() {
    super("preload");
    }

    preload () {
            //cargar assets
   //import cielo
    this.load.image("cielo","../public/assets/Cielo.webp");

    //import plataforma
    this.load.image("plataforma","../public/assets/platform.png");

    //import personaje
    this.load.image("personaje","../public/assets/Ninja.png");

    //import star
    this.load.image("star", "../public/assets/star.png")

    //import bomba
    this.load.image("enemigo","../public/assets/circle.png")

    //Games over img
    this.load.image("GamesOver","../public/assets/gameOver.png")

    //Fondo Menu img
    this.load.image("FondoMenu","../public/assets/FondoMenu.jpg")

    //CONGRATULATIONS
    this.load.image("sprite","../public/assets/sprite.png");

    //Parallax
    this.load.image("parallax","../public/assets/parallax2.jpg")
    }

    update () {
        console.log("start-pass")
        this.scene.start("main")
        
    }
}
