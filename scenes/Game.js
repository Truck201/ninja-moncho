// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Game extends Phaser.Scene {
  constructor() {
    super("main");
  }

  init() { }

  preload() {
    //cargar assets

    //import cielo
    this.load.image("cielo","../public/assets/Cielo.webp");

    //import plataforma
    this.load.image("plataforma","../public/assets/platform.png");

    //import personaje
    this.load.image("personaje","../public/assets/Ninja.png");
   }

  create() {
    //crear elementos
    const cielo = this.add.image(400, 300, "cielo");
    cielo.setScale(2);

    //crear plataforma
    this.plataformas = this.physics.add.staticGroup();
    this.plataforma = this.physics.add.sprite()
    plataforma.setScale(2);
    this.plataforma.add(this.plataforma);

    //agregar personaje
    this.personaje = this.physics.add.sprite(400, 300, "personaje");
    this.personaje.setScale(0.1);
    this.personaje.setCollideWorldBounds(true);

    //agregar colision entre personaje y plataforma 
    this.physics.add.collider(thois.personaje, this.plataformas);
   
   }


  update() { }
}
