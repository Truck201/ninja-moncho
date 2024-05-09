// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Game extends Phaser.Scene {
  constructor() {
    super("main");
  }

  init(data) {
    // Recupera el valore score
    score = data.score
  }

  preload() {
    //cargar assets

   //import cielo
    this.load.image("cielo","../public/assets/Cielo.webp");

    //import plataforma
    this.load.image("plataforma","../public/assets/platform.png");

    //import personaje
    this.load.image("personaje","../public/assets/Ninja.png");

    //import star
    this.load.image("stars", "../public/assets/star.png")
  }

  create() {
    //crear elementos
    const cielo = this.add.image(400, 300, "cielo");
    cielo.setScale(2);

    //crear plataforma
    plataformas = this.physics.add.staticGroup();
    plataformas.create(400, 580, "plataforma").setScale(1.8,1.3).setSize(720,45).setOffset(-160,-5) // Size tamaño, y offset posición x e y
    plataformas.create(200, 300, "plataforma").setScale(0.5,0.9).setSize(200,28).setOffset(100,2)
    plataformas.create(600, 400, "plataforma").setScale(0.5,0.9).setSize(200,28).setOffset(100,2)

    //agregar estrellas
    stars = this.physics.add.staticGroup();
    stars.create(400, 200, "stars").setScale(0.02,0.02);
    
    //agregar puntucación 
    score = 0
    //agregar "bombas"

    //agregar personaje
    personaje = this.physics.add.sprite(400, 500, "personaje");
    personaje.setScale(0.08);
    personaje.setSize(400,400)
    personaje.setOffset(50,90)
    personaje.setCollideWorldBounds(true);

    //agregar colision entre personaje y plataforma 
    this.physics.add.collider(personaje, plataformas);

    // cursors
    cursors = this.input.keyboard.createCursorKeys(); // uso las flechas y barra espaciadora

    // colisiones
    this.physics.add.collider(plataformas, personaje); // Detecta las colisiones entre objetos
  }

  update() {
    
    // Score
    if (this.physics.add.collider(personaje, stars) === true) {
      score = score + 1
    
    }
    
    // Manejo de jugador
    if (cursors.right.isDown && personaje.body.touching.down) {
      personaje.setVelocityX(190)
    } 
    else if (cursors.left.isDown && personaje.body.touching.down) {
      personaje.setVelocityX(-190)
    }
    else {
      personaje.setVelocityX(0)
    }
    if (cursors.up.isDown && personaje.body.touching.down) {
      personaje.setVelocityY(-290)
    }
    
    if (personaje.body.touching.down === false) {
      
      if (cursors.right.isDown) {
        personaje.setVelocityX(140)
      } 
      else if (cursors.left.isDown) {
        personaje.setVelocityX(-140)
      }
      else {
        personaje.setVelocityX(0)
      }

      if (cursors.down.isDown === true) {
        personaje.setVelocityY(300)
      } 

    }
  }
}

var score
var stars
var personaje
var plataformas
var cursors