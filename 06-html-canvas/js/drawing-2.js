// Drawing 2
var fireworks = [];

function setup() {
  createCanvas(600, 450);

  createFireworks(random(5, 7));
}

function draw() {

    background(20, 100);

    textSize(20);
    fill(150);
    noStroke();
    text("Fireworks", 30, 30);
    noFill();

    for (var i = 0; i < fireworks.length; i++) {
    var firework = fireworks[i];

    firework.rise();
    if (firework.dead()) {
      fireworks.splice(i, 1);
    }
    else {
      firework.add();
    }
    }

    if (fireworks.length === 0) {
    createFireworks(random(4, 6));
    }

}

function createFireworks(num) {
  for (var i = 0; i < num; i++) {
    fireworks.push(new System(createVector(random(100, width-100), height)));
  }
}

// Particle class
var Particle = function(pos) {
  this.pos = pos.copy();
  this.v = createVector(random(-3, 3), random(-5, 0.5));
  this.a = createVector(0, 0.15);
  this.life = 255;
  this.color = [random(255), random(255), random(255)];

};

Particle.prototype.update = function() {
  this.v.add(this.a);
  this.pos.add(this.v);
  this.life -= 4;
};

Particle.prototype.display = function() {
  noStroke();
  fill(this.color[0], this.color[1], this.color[2], this.life);
  rectMode(CENTER);
  rect(this.pos.x, this.pos.y, 5, 5);
};

Particle.prototype.dead = function() {
  if (this.life < 0) return true;
  else return false;
};

// System class
var System = function(position) {
  this.pos = position;
  this.particles = [];
  this.finalPos = createVector(this.pos.x, random(height/2, height/3.5));
  this.life = 120;
  this.delay = random(0, 120);
};

System.prototype.add = function () {
  if (frameCount % 5 === 0) {
    this.particles.push(new Particle(this.finalPos));
  }
};

System.prototype.rise = function () {
  this.delay --;

  if (this.pos.y > this.finalPos.y) {
    if (this.delay < 0) {
      this.pos.y -= random(2, 4);
      this.display();
    }

  } else {
    this.explode();
  }
};

System.prototype.display = function() {
  stroke(100);
  strokeWeight(1);
  fill(200);
  rectMode(CENTER);
  rect(this.pos.x, this.pos.y, 5, 5);
};

System.prototype.dead = function () {
  if (this.life < 0) return true;
  else return false;
};

System.prototype.explode = function () {
  this.life --;

  for (var i = 0; i < this.particles.length; i++) {
    var p = this.particles[i];

    p.display();
    p.update();

    if (p.dead()) this.particles.splice(i, 1);
  }
};
