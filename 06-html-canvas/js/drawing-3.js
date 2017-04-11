// Drawing 3
var sun;
var stars = [];
var numStars;

function setup() {
    createCanvas(600, 450);

    numStars = 20;


    for (var i=0; i < numStars; i++) {
        stars.push(new Star(random(5,15), random(width),random(height)));
    }

    star = new Star(10, width/2, height/3);
    sun = new Sun();

    smooth();

}

function draw() {
    background(0, 100);

    if (stars.length < numStars-2) {
        stars.push(new Star(random(5,15), random(width, width+100),random(-200, 0)));
        stars.push(new Star(random(5,15), random(-100, 0),random(height+10, height+ 200)));
    }

    for (var i = 0; i < stars.length; ++i) {
        drawStars(stars[i]);
    }

    sun.display();

    textSize(20);
    fill(150);
    noStroke();
    text("The formation of a blackhole", 30, 30);
    noFill();

}

function drawStars(star) {
    var dead = sun.destroy(star);

    if (!dead) {
        var f = sun.attract(star);
        star.applyForce(f);
        star.update();

        star.display(sun);
    }
    else {
        var index = stars.indexOf(star);
        if (index >= 0) {
            stars.splice(index, 1);
        }
    }

}

function Star(m, x, y) {
    this.mass = m;
    this.r = this.mass;
    this.loc = createVector(x, y);
    // initial velocity is 0
    this.v = createVector(0, 0);
    this.a = createVector(random(-2.5, 2.5), random(-1, 1));
}

Star.prototype.update = function() {
    this.v.add(this.a);
    this.loc.add(this.v);

    this.a.mult(0); // reset every frame
};

Star.prototype.applyForce = function(f) {
    var acceleration = f.div(this.mass);
    this.a.add(acceleration);
};

Star.prototype.display = function (sun) {
    var dist = p5.Vector.sub(sun.loc, this.loc).mag();
    // dist = map(dist, 0, width/2, 0, 255);
    strokeWeight(1);
    stroke(200);
    fill(dist, 200);
    ellipse(this.loc.x, this.loc.y, this.r, this.r);
};

function Sun() {
    this.mass = 400;
    this.loc = createVector(random(width/2-100, width/2+100), random(height/2-100, height/2+100));
    this.G = 5;
    this.r = this.mass/7;

    this.darkness = 255;
}

Sun.prototype.attract = function (star) {
    var force = p5.Vector.sub(this.loc, star.loc);
    var dist = force.mag();
    // console.log(dist);
    dist = constrain(dist, 0, width/3);

    force.normalize();
    var strength = this.mass*star.mass/(dist*dist);
    force.mult(strength);

    return force;
};

Sun.prototype.destroy = function(star) {
    var dist = p5.Vector.sub(this.loc, star.loc).mag();

    if (dist < this.r/2 + star.r) {
        if (this.darkness >= -255) {
            this.darkness -= 5;
            this.mass += 2.5*7;
            this.r += 2.5;
        }

        return true;
    }

    return false;
};

Sun.prototype.display = function () {
    strokeWeight(3);
    stroke(200, 255-this.darkness);
    fill(this.darkness);
    ellipse(this.loc.x, this.loc.y, this.r, this.r);
};
