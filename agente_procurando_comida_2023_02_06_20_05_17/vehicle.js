class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(6, 8);
    this.acc = createVector(0, 0);
    this.maxSpeed = 8; //velocidade máxima
    this.r = 16;
  }

  // função para prever a posição da comida e seguí-la
  persue(vehicle) {
    let food = vehicle.pos.copy();
    let prediction = vehicle.vel.copy();
    prediction.mult(10);
    food.add(prediction);
    return this.seek(food);
  }

  seek(food) {
    // usando a subtração de vetores temos um vetor que aponta para a comida
    let force = p5.Vector.sub(food, this.pos);
    force.setMag(this.maxSpeed);

    // a força ta subtraindo a velocidade de ponto (dando a direçao)
    force.sub(this.vel);
    this.applyForce(force);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill(255);
    push();
    translate(this.pos.x, this.pos.y);
    // girar de acordo com sua velocidade
    rotate(this.vel.heading());
    // trasnformar em um formato de triângulo
    triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);
    pop();
  }

  edges() {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
      this.vel = createVector(6, 8);
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
      this.vel = createVector(6, 8);
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
      this.vel = createVector(6, 8);
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
      this.vel = createVector(6, 8);
    }
  }
}

// criando a comida
class Food extends Vehicle {
  constructor(x, y) {
    super(x, y);
    this.vel= createVector(0,0); // velocidade da comida
  }

  show() {
    stroke(0);
    strokeWeight(2);
    fill("	#8470FF");
    push();
    translate(this.pos.x, this.pos.y);
    circle(0, 0, this.r * 2);
    pop();
  }
}
