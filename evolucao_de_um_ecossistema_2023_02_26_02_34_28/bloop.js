// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Evolution EcoSystem

// Creature class

// Create a "bloop" creature
class Bloop {
  constructor(l, dna_) {
    this.nearestFood = false;
    this.position = l.copy(); // Location
    this.health = 200; // Life timer
    this.xoff = random(1000); // For perlin noise
    this.yoff = random(1000);
    this.dna = dna_; // DNA
    // DNA will determine size and maxspeed
    // The bigger the bloop, the slower it is
    this.maxspeed = map(this.dna.genes[0], 0, 1, 15, 0);
    this.r = map(this.dna.genes[0], 0, 1, 0, 50);
    this.vision = this.r + this.dna.genes[1] * 100; //visão do bloop
  }

  run() {
    this.update();
    this.borders();
    this.display();
    this.displayVision(); //criando a visão do bloop
  }

  // A bloop can find food and eat it
  eat(f) {
    let food = f.getFood(this.position)
    // Are we touching any food objects?
    if(!food.length) return;
    this.nearestFoodLocation = food[0];
    let d = p5.Vector.dist(this.position, this.nearestFoodLocation);//distancia do bloop e da comida
    if (d < this.vision / 2) {
      this.nearestFood = true;
      if(d < this.r / 2) {
        this.health += 100;
        food.splice(0,1);
        this.nearestFood = false;
      }
    }
    else this.nearestFood = false;
  }

  // At any moment there is a teeny, tiny chance a bloop will reproduce
  reproduce(nearestBloop) {
    if (random(1) < 0.0005 && p5.Vector.dist(nearestBloop.position, this.position) < this.range + nearestBloop.vision) {
      console.log(this.dna.genes[0], nearestBloop.dna.genes[0]);
      let childDNA = new DNA([(this.dna.genes[0] + nearestBloop.dna.genes[0])/2, (this.dna.genes[1] + nearestBloop.dna.genes[1])/2]);
      // Child DNA can mutate
      childDNA.mutate(0.01);
      return new Bloop(this.position, childDNA);
    } else {
      return null;
    }
  }
  
  // Method to update position
  update() {
    if(this.nearestFood) {
      p5.Vector.sub(this.nearestFoodLocation, this.position)
      return this.position.add(p5.Vector.sub(this.nearestFoodLocation, this.position).normalize());
    }
    // Simple movement based on perlin noise
    let vx = map(noise(this.xoff), 0, 1, -this.maxspeed, this.maxspeed);
    let vy = map(noise(this.yoff), 0, 1, -this.maxspeed, this.maxspeed);
    let velocity = createVector(vx, vy);
    this.xoff += 0.01;
    this.yoff += 0.01;

    this.position.add(velocity);
     // Death always looming
    this.health -= 0.2;
  }

  // Wraparound
  borders() {
    if (this.position.x < -this.vision/2) this.position.x = width+this.vision/2;
    if (this.position.y < this.vision/2) this.position.y = height+this.vision/2;
    if (this.position.x > width+this.vision/2) this.position.x = -this.vision/2;
    if (this.position.y > height+this.vision/2) this.position.y = -this.vision/2;
  }

  // Method to display
  display() {
    ellipseMode(CENTER);
    stroke(0, this.health);
    fill(0, this.health);
    ellipse(this.position.x, this.position.y, this.r, this.r);
  }
  
  displayVision() {
    stroke(255, 204, 100);
    fill(1000, 0, 0, 0);
    ellipse(this.position.x, this.position.y, this.vision, this.vision);
  }

  // Death
 dead() {
    if (this.health < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}
