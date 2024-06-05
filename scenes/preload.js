export default class Preload extends Phaser.Scene {
    constructor() {
    super("preload");
    }

    preload () {
            //cargar assets
   //import cielo
    this.load.image("cielo","../public/Cielo.webp");

    //import plataforma
    this.load.image("plataforma","../public/platform.png");

    //import personaje
    this.load.image("personaje","../public/Ninja.png");

    //import star
    this.load.image("star", "../public/star.png")

    //import bomba
    this.load.image("enemigo","../public/circle.png")

    //Games over img
    this.load.image("GamesOver","../public/gameOver.png")

    //Fondo Menu img
    this.load.image("FondoMenu","../public/FondoMenu.jpg")

    //CONGRATULATIONS
    this.load.image("sprite","../public/sprite.png");

    //Parallax
    this.load.image("parallax","../public/parallax2.jpg")
    }

    update () {
        console.log("start-pass")
        this.scene.start("main")
        
    }
}
