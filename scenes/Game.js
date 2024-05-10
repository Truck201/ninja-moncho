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
    this.load.image("star", "../public/assets/star.png")

    //import bomba
    this.load.image("enemigo","../public/assets/circle.png")
  }

  create() {
    
    
    //map

    // const map = this.add.tilemap("map");
    // const tiles = map.addTilesImage("main","tiles")
    
    //animaciones personaje
    //this.anims.create({
    //  key: "idle",
    //  frames: this.anims.generateFrameNumbers("personaje",{start:0,end:3}),
    //  frameRate:10,
    //  repeat:-1,
    //});

    //crear elementos
    const cielo = this.add.image(400, 300, "cielo");
    cielo.setScale(2);

    //agregar puntucación 
    score = 0
    // crear el texto de puntos, con sus propiedades; Inicializamos en 0
    txtScore = this.add.text(10,20,"Score: 0",{font:"20px Helvetica", fill:"#ff0000"})

    //crear plataforma
    plataformas = this.physics.add.staticGroup();
    plataformas.create(400, 580, "plataforma").setScale(2,1.3).setSize(800,45).setOffset(-200,-5) // Size tamaño, y offset posición x e y
    plataformas.create(200, 300, "plataforma").setScale(0.5,0.9).setSize(200,28).setOffset(100,2)
    plataformas.create(600, 400, "plataforma").setScale(0.5,0.9).setSize(200,28).setOffset(100,2)

    // Bolsa de todas las estrellas, grupo
    allStars = this.physics.add.group({
      key: 'star', // nombre del hijo unidad
      repeat: 8,  // cuantas veces se repiten más
      setScale: {x: 0.02, y: 0.02}, // escalado
      setXY: { x: 110, y: 210, stepX: 80 }  // Posición X e Y e distanciamiento stepsX
    });
  
    // Llamar a los hijos
    allStars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)); // Grupo de Stars que reboten, entre la 0.4 y 0.8 de su salto altura
    });

    //agregar enemigos, bolsas
    enemigos = this.physics.add.group({
      key: 'enemigo',
      repeat: 4,
      setScale: {x:0.01, y:0.01},
      setXY: {x: 40, y:-10, stepX:(numR)}
    })
    
    // Llamar a los hijos, recorrer todos los enemigos del grupo
    enemigos.children.iterate(function (enemigo){
      enemigo.setBounceY(1.01)
      enemigo.setVelocity(0)
      enemigo.setCollideWorldBounds()
    })
    

    //agregar personaje
    personaje = this.physics.add.sprite(400, 500, "personaje");
    personaje.setScale(0.08);
    personaje.setSize(400,400)
    personaje.setOffset(50,90)
    personaje.setCollideWorldBounds(true);

    // cursors
    cursors = this.input.keyboard.createCursorKeys(); // uso las flechas y barra espaciadora

    // colisiones  // agregar eventos ??
    this.physics.add.collider(plataformas, personaje); // colision entre plataforma y personaje
    this.physics.add.collider(plataformas, enemigos) // colisión entre circle y plataformas
    this.physics.add.collider(plataformas, allStars);
    this.physics.add.collider(enemigos, enemigos);

    this.physics.add.overlap(personaje, allStars, pickStar, null, this);
    this.physics.add.collider(personaje, enemigos, gameOver, null, this); // entre circle y personaje 
  }

  update() {
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

var score;
var txtScore;
var enemigos;
var allStars;
var personaje;
var plataformas;
var cursors;
var star;


const numR = Math.floor(Math.random() * 260) + 100
    console.log(numR)

function pickStar (personaje, star) {
  // allStars.destroy() // Destruye las estrellas
  star.disableBody(true,true); // Desactiva las estrellas, Recomendado
  
  score = score + 100; // suma puntos
  console.log(score);
  txtScore.setText("Score: " + score)

  console.log(allStars.countActive()); // Funciona?, muestra en consola la cantidad de monedas
  if (allStars.countActive() === 0) {
    
    // recorrer el monedero
    allStars.children.iterate(function (child) {
      child.enableBody(true, child.x,100,true,true)
  });
  }
}

function gameOver () {
  this.game.pause()
}

