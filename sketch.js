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

var ground;
var boy,boy_img;
var fruit,fruit_img,fruit_con1,fruit_con2;
var background,background_img;
var rope_1,rope_2;
var btn_1,btn_2;
var sad,happy;

function preload()
{
 boy_img = loadImage('Boy.png');
 fruit_img = loadImage('Apple.png');
 background_img = loadImage('Background.png');
 sad = loadAnimation('Sad Boy.png');
 happy = loadAnimation('Happy_Boy.png');
 
 sad.looping = false
 happy.looping = false
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  engine = Engine.create();
  world = engine.world;

  ground = new Ground(200,690,windowWidth+1500,20);
  
  boy = createSprite(width/2,540,100,100);
  boy.scale = 0.7;
  boy.addImage(boy_img);
  boy.addAnimation('sad',sad);
  boy.addAnimation('happy',happy);

  btn_1 = createImg('Button.png');
  btn_1.position(900, 50);
  btn_1.size(50,50);
  btn_1.mouseClicked(drop_1);

  btn_2 = createImg('Button.png');
  btn_2.position(500, 50);
  btn_2.size(50,50);
  btn_2.mouseClicked(drop_2);

  rope_1 = new Rope(6, { x: 500, y: 80 });
  rope_2 = new Rope(6, { x: 900, y: 80 });
  
  fruit = Bodies.circle(300, 300, 20);
  Matter.Composite.add(rope_1.body, fruit);
  fruit_con1 = new Link(rope_1, fruit);
  fruit_con2 = new Link(rope_2, fruit);

  rectMode(CENTER);
}

function draw() 
{
  background(51);
  image(background_img,0,0,displayWidth,displayHeight);

  push()
  imageMode(CENTER);
  if (fruit != null) {
    image(fruit_img, fruit.position.x, fruit.position.y, 60, 60);
  }
  pop();

  rope_1.show();
  rope_2.show();

  Engine.update(engine);
  ground.display();

  if (collide(boy, fruit, 60) == true) {
    boy.changeAnimation('happy');
    boy.scale = 0.2;
    fruit = null;
  }

  if (fruit != null && fruit.position.y >=650) { 
    boy.changeAnimation('sad');
  }

  drawSprites();
}

function drop_1(){
  fruit_con2.detach();
  fruit_con2 = null;
}

function drop_2(){
  fruit_con1.detach();
  fruit_con1 = null;
}

function collide(sprite,fruit,x){
    if (fruit != null) {
      var d = dist(fruit.position.x, fruit.position.y, sprite.position.x, sprite.position.y);
      if (d < x) {
        World.remove(world, fruit);
        //fruit = null;
        return true;
      }
      else {
        return false;
    }
  }
}