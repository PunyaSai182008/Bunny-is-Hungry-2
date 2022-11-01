const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;


function preload() {
  bg = loadImage("assets/background.png");
  melon = loadImage("assets/melon.png");
  rabbit1 = loadImage("assets/sad_1.png");
  blink = loadAnimation("assets/blink_1.png", "assets/blink_2.png", "assets/blink_3.png")
  sadbunny = loadAnimation("assets/sad_2.png", "assets/sad_3.png")
  eatbunny = loadAnimation("assets/eat_0.png", "assets/eat_1.png", "assets/eat_2.png", "assets/eat_3.png", "assets/eat_4.png",)

  blink.playing = true;
  blink.looping = true;

  eatbunny.playing = true;
  eatbunny.looping = false;

  sadbunny.playing = true;
  sadbunny.looping = false;

  air = loadSound("assets/air.wav");
  sad = loadSound("assets/sad.wav");
  ropecut = loadSound("assets/rope_cut.mp3")
  eat = loadSound("assets/eating_sound.mp3");
  bgsong = loadSound("assets/sound1.mp3")



}


function setup() {
  createCanvas(500, 700);
  engine = Engine.create();
  world = engine.world;

  bgsong.play();
  bgsong.setVolume(0.1);


  sadbunny.frameDelay = 20;
  blink.frameDelay = 20;
  eatbunny.frameDelay = 20;

  ground = new Ground(200, 700, 600, 20);

  rope = new Rope(7, { x: 245, y: 30 });

  rope2 = new Rope(5, { x: 1, y: 71 })

  var fruitOptions = {
    density: 0.001
  }

  bunny = createSprite(320, 630, 100, 100);

  bunny.addAnimation("blinking", blink)
  bunny.addAnimation("eating", eatbunny);
  bunny.addAnimation("sad", sadbunny);

  bunny.changeAnimation("blinking");



  bunny.scale = 0.2;

  fruit = Bodies.circle(300, 300, 20);


  Matter.Composite.add(rope.body, fruit);

  fruitCon = new Link(rope, fruit);

  cutbutton = createImg("assets/cut_btn.png");
  cutbutton.position(220, 30);
  cutbutton.size(50, 50);
  cutbutton.mouseClicked(drop);

  cutbutton2 = createImg("assets/cut_btn.png");
  cutbutton2.position(26, 71);
  cutbutton2.size(50, 50);
  cutbutton2.mouseClicked(drop);

  airBlower = createImg("assets/balloon.png");
  airBlower.position(10, 250);
  airBlower.size(100, 80);
  airBlower.mouseClicked(airblow);

  mute = createImg("assets/mute.png");
  mute.position(450, 50);
  mute.size(50, 50);
  mute.mouseClicked(muteSound);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50);

}

function draw() {
  background(50);
  image(bg, width / 2, height / 2);


  if (fruit != null) {
    image(melon, fruit.position.x, fruit.position.y, 70, 70);
  }

  Engine.update(engine);
  ground.display();
  rope.show();
  if (collide(fruit, bunny) == true) {
    bunny.changeAnimation("eating");
    eat.play();
  }

  if (collide(fruit, ground.body) == true) {
    bunny.changeAnimation("sad");
    sad.play();
  }
  drawSprites();
}

function drop() {
  ropecut.play();
  rope.break();
  fruitCon.detach();
  fruitCon = null;

}

function collide(body, sprite) {
  if (body != null) {
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y)
    if (d <= 80) {
      World.remove(world, fruit);
      fruit = null;
      return true;

    } else {
      return false;
    }
  }
}

function airblow() {
  Matter.Body.applyForce(fruit, { x: 0, y: 0 }, { x: 0.01, y: 0 })
  air.play();
}

function muteSound() {
  if (bgsong.isPlaying()) {
    bgsong.stop();

  } else {
    bgsong.play();
  }
}




