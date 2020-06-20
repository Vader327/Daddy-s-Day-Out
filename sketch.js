const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var backgroundIMG, homeIMG, newspaper_manIMG, virusIMG, paperIMG;
var player_car, player, newspaper_man, virus, paper;
var carIMG, manIMG;
var level = 0;
var level1 = 1;
var level2 = 0;
var state = "play";
var move_disabled = true;
var obs1, obs2, obs3, obs4, obs5, obs6, obs7;
var over, restart, caught_virus;
var title, rules, start;
var level_head, level_text;
var next, next_button, end_text;
var shop_title, array, goal;
var virus1, virus2, virus3, virus4, virus5, virus6, virus7, virus8;

function preload(){
  backgroundIMG = loadImage("town1.jpg");
  homeIMG = loadImage("home.jpg");
  carIMG = loadImage("player_car_up.png");
  manIMG = loadImage("man_walk_up.png");
  newspaper_manIMG = loadImage("newspaper_man.png");
  virusIMG = loadImage("virus.png");
  paperIMG = loadImage("newspaper.png");
}

function setup() {
  var canvas = createCanvas(1200,1200);
  engine = Engine.create();
  world = engine.world;

  player_car = createSprite(660,580,10,10);
  player_car.addImage("up", carIMG);

  player = createSprite(530,730,10,10);
  player.addImage("up", manIMG);
  player.visible = false;

  newspaper_man = createSprite(-100,290,10,10);
  newspaper_man.addImage("newspaper_man", newspaper_manIMG);
  newspaper_man.scale = 0.5;

  virus1 = createSprite(-140,300,10,10);
  virus2 = createSprite(-90,300,10,10);
  virus3 = createSprite(500,430,10,10);
  virus4 = createSprite(270,500,10,10);
  virus5 = createSprite(200,600,10,10);
  virus6 = createSprite(270,800,10,10);
  virus7 = createSprite(200,850,10,10);
  virus8 = createSprite(400,850,10,10);
  virus9 = createSprite(500,800,10,10);
  virus10 = createSprite(650,850,10,10);
  virus11 = createSprite(880,800,10,10);
  virus12 = createSprite(960,850,10,10);
  virus13 = createSprite(930,650,10,10);

  array = [virus1,virus2,virus3,virus4,virus5,virus6,virus7,virus8,virus9,virus10,virus11,virus12,virus13];

  for(var object of array){
    object.addImage("virus", virusIMG);
    object.scale = 0.1;
    object.setCollider("rectangle",0,0,180,180);
    object.visible = false;
  }

  obs1 = createSprite(430,560,10,450);
  obs2 = createSprite(600,560,10,450);
  obs3 = createSprite(520,780,150,10);

  obs4 = createSprite(450,641,360,294);
  obs5 = createSprite(790,641,201,294);
  obs6 = createSprite(650,713,100,150);
  obs7 = createSprite(1050,630,10,450);
  obs1.visible = false;
  obs2.visible = false;
  obs3.visible = false;
  obs4.visible = false;
  obs5.visible = false;
  obs6.visible = false;
  obs7.visible = false;

  paper = createSprite(540,420,10,10);
  paper.addImage("paper", paperIMG);
  paper.scale = 0.1;
  paper.setCollider("rectangle",0,0,280,280);
  paper.visible = false;

  over = createElement("h3");
  over.elt.id = "over";
  over.position(430, 400);
  over.html("Game Over!");
  over.hide();

  caught_virus = createElement("h3");
  caught_virus.elt.id = "caught_virus";
  caught_virus.position(410, 520);
  caught_virus.html("You caught the virus!");
  caught_virus.hide();

  restart = createButton("Restart");
  restart.elt.id = "restart";
  restart.position(520, 650);
  restart.hide();

  title = createElement("h3");
  title.elt.id = "title";
  title.position(400, 400);
  title.html("Dad's Day Out");

  rules = createElement("h3");
  rules.elt.id = "rules";
  rules.position(300, 520);
  rules.html("You have to support your family by<br> doing work, like getting groceries and items.<br> Make sure you do not get the virus!");

  start = createButton("Play");
  start.elt.id = "restart";
  start.position(520, 680);

  level_head = createElement("h3");
  level_head.elt.id = "level_head_text";
  level_head.position(550, -10);
  level_head.hide();

  level_text = createElement("h3");
  level_text.elt.id = "level_head_text";
  level_text.position(140, 60);
  level_text.html("Always be informed about what is going on around the world.<br>Fetch the newspaper without getting the virus, then go back inside.");
  level_text.hide();

  next = createElement("h3");
  next.elt.id = "title";
  next.position(455, 440);
  next.html("Well Done!");
  next.hide();

  next_button = createButton("Next");
  next_button.elt.id = "restart";
  next_button.position(520, 640);
  next_button.hide();

  end_text = createElement("h3");
  end_text.elt.id = "rules"
  end_text.position(350,550);
  end_text.html("You have now completed the game!")
  end_text.hide();

  shop_title = createElement("h3");
  shop_title.elt.id = "rules";
  shop_title.position(1000, 740);
  shop_title.html("Grocery Store");
  shop_title.hide();

  goal = createSprite(1020,700,40,40);
  goal.visible = false;
}

function draw() {
  background(backgroundIMG);
  Engine.update(engine);

  level_head.html("Level " + level);

  if(player.isTouching(virus1) || player.isTouching(virus2) || 
  player_car.isTouching(virus1) || player_car.isTouching(virus2) || player_car.isTouching(virus3) || player_car.isTouching(virus4) || player_car.isTouching(virus5) || player_car.isTouching(virus6) || player_car.isTouching(virus7) || player_car.isTouching(virus8) || player_car.isTouching(virus9) || player_car.isTouching(virus10) || player_car.isTouching(virus11) || player_car.isTouching(virus12) || player_car.isTouching(virus13)){
    state = "end";
  }

  if(level===0){
    virus1.visible = true;
    virus2.visible = true;

    player_car.visible = false;
    push();
    strokeWeight(10);
    stroke("#4eb5f1")
    rectMode(CENTER)
    rect(600,600,650,300);
    pop();
    title.show();
    rules.show();
    start.show();

    start.mousePressed(()=>{
      title.hide();
      rules.hide();
      start.hide();
      level = 1;
    })
  }

  if(level===1){
    player_car.visible = false;
    player.visible = true;
    paper.visible = true;
    level_head.show();
    level_text.show();

    background(homeIMG);
    if(move_disabled === false){
      move(player);
    }

    player.collide(obs1);
    player.collide(obs2);
    player.collide(obs3);

    virus1.velocityX = 5;
    virus2.velocityX = 5;
    newspaper_man.velocityX = 5; 

    if(newspaper_man.x > 1300){
      newspaper_man.velocityX = 0;
    }

    if(virus1.y < 450){
      move_disabled = true;
    }
    if(virus1.x > 480){
      virus1.velocityX = 0;
      virus1.velocityY = 3;
      if(virus1.y > 400){
        virus1.velocityY = 0;
        move_disabled = false;
      }
    }
    if(virus2.x > 550){
      virus2.velocityX = 0;
      virus2.velocityY = 3;
      if(virus2.y > 450){
        virus2.velocityY = 0;
      }
    }

    if(player.isTouching(paper)){
      level1 = 2;
    }
    if(level1 == 2){
      paper.visible = false;
      if(player.y > 737){
        player.visible = false;
        virus2.visible = false;
        push();
        strokeWeight(10);
        stroke("#4eb5f1")
        rectMode(CENTER)
        rect(600,600,600,250);
        pop();

        next.show();
        next_button.show();
        move_disabled = true;

        next_button.mousePressed(()=>{
          next.hide();
          next_button.hide();
          paper.visible = false;
          player.visible = false;
          virus1.visible = false;
          virus2.visible = false;
          level = 2;
          level1 = 1;
          player_car.visible = true;
        })
      }
    }
  }

  if(level===2){
    virus1.x = 870;
    virus1.y = 460;
    virus2.x = 620;
    virus2.y = 500;
    for(object of array){
      object.visible = true;
    }
    obs1.x = 180;
    obs1.y = 630;
    obs2.x = 620;
    obs2.y = 410;
    obs2.width = 870;
    obs2.height = 10;
    obs3.x = 620;
    obs3.y = 870;
    obs3.width = 880;
    player_car.collide(obs1);
    player_car.collide(obs2);
    player_car.collide(obs3);
    player_car.collide(obs4);
    player_car.collide(obs5);
    player_car.collide(obs6);
    player_car.collide(obs7);

    if(state==="play"){move_disabled = false}
    push();
    strokeWeight(10);
    stroke("#4eb5f1")
    rectMode(CENTER)
    rect(600,100,1200,190);
    pop();

    level_text.position(10, 60)
    level_text.html("You need to go out to by groceries. Go to the grocery store without touching the virus.")
    
    push();
    strokeWeight(10);
    stroke("#4eb5f1")
    rectMode(CENTER)
    rect(1095,790,205,50);
    pop();
    shop_title.show();
    if(move_disabled === false && (level1 === 1 || level1 === 3) && level2 != 1){move(player_car)}

    if(player_car.isTouching(goal) && level1 != 3){level1 = 2}
    if(level1 == 2){
      push();
      strokeWeight(10);
      stroke("#4eb5f1")
      rectMode(CENTER)
      rect(600,600,600,250);
      pop();

      next.show();
      next_button.show();
      move_disabled = true;

      next_button.mousePressed(()=>{
        next.hide();
        next_button.hide();
        level1 = 3;
      })
    }
    if(level1===3){
      if(level2 != 1){move_disabled = false}
      level_text.position(250, 60);
      level_text.html("Now return to your house, without touching the virus.");
      goal.x = 660;
      goal.y = 580;

      if(player_car.isTouching(goal)){
        push();
        strokeWeight(10);
        stroke("#4eb5f1")
        rectMode(CENTER)
        rect(600,600,600,250);
        pop();

        next.show();
        next_button.show();
        end_text.show();
        move_disabled = true;
        player_car.visible = false;
        virus2.visible = false;
        level2 = 1;

        next_button.mousePressed(()=>{
          next.hide();
          next_button.hide();
          end_text.hide();
          goal.x = 1020;
          goal.y = 700;

          for(object of array){
            object.visible = false;
          }
          player_car.visible = false;
          player_car.rotation = 0;
          level_head.hide();
          level_text.hide();
          shop_title.hide();
          player.x = 530;
          player.y = 730;
          player.rotation = 0;
          newspaper_man.x = -100;
          virus1.x = -140;
          virus1.y = 300;
          virus2.x = -90;
          virus2.y = 300;
          level1 = 1;
          level2 = 0;
          level = 0;
          level_text.position(140, 60);
          level_text.html("Always be informed about what is going on around the world.<br>Fetch the newspaper without getting the virus, then go back inside.");
        })
      }
    }
  }

  drawSprites();
  end();
}

function move(obj){
  if(keyIsDown(LEFT_ARROW)){
    obj.rotation = 270;
    obj.x -= 5;
  }
  if(keyIsDown(RIGHT_ARROW)){
    obj.rotation = 90;
    obj.x += 5;
  }
  if(keyIsDown(UP_ARROW)){
    obj.rotation = 0;
    obj.y -= 5;
  }
  if(keyIsDown(DOWN_ARROW)){
    obj.rotation = 180;
    obj.y += 5;
  }
}

function end(){
  if(state==="end"){
    push();
    strokeWeight(10);
    stroke("red")
    rectMode(CENTER)
    rect(600,600,600,300);
    pop();
    over.show();
    caught_virus.show();
    restart.show();
    move_disabled = true;

    restart.mousePressed(()=>{
      state = "play";
      over.hide();
      caught_virus.hide();
      restart.hide();

      if(level === 1){
        move_disabled = false;
        player.x = 530;
        player.y = 730;
        player.rotation = 0;
        newspaper_man.x = -100;
        virus1.x = -140;
        virus1.y = 300;
        virus2.x = -90;
        virus2.y = 300;
        level1 = 1;
      }

      if(level === 2){
        if(level1 === 1){
          player_car.x = 660;
          player_car.y = 580;
          player_car.rotation = 0;
        }
        if(level1 === 3){
          player_car.x = 660;
          player_car.y = 580;
          player_car.rotation = 0;
          level1 = 1;
          goal.x = 1020;
          goal.y = 700;
        }
        move_disabled = false;
      }
    })
  }
}
