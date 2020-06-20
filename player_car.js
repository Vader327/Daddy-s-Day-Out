class Car{
    constructor(x, y) {
        var options = {
            isStatic: true,
        }
        this.body = Bodies.rectangle(x, y, 100, 100, options);
        this.width = width;
        this.height = height;
  
        this.image = loadImage("player_car.png");
        
        World.add(world, this.body);
    }

    display(){
        var angle = this.body.angle;
        rectMode(CENTER);
        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(angle);
        image(this.image, 0, 0, this.width, this.height);
        pop();
    }
     
}