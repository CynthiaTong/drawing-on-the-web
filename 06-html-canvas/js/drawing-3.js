// Drawing 3

var sun;
var star;
var stars = [];
var randomMass = [];
var randomX = [];
var randomY = [];
var numStars;

function setup() {
    createCanvas(600, 450);

    numStars = 20;

    for (var i=0; i < numStars; i++) {
        randomMass.push(random(10, 15));
        randomX.push(random(width/2-100, width/2+100));
        randomY.push(random(height/2 - 100, height/2 - 60));
    }


    for (var i=0; i < numStars; i++) {
        stars.push(new Star(random(10,12), random(width),random(height)));
        // stars.push(new Star(random(10,12), random(width/2-100),random(height/4, height/4+50)));
        // stars.push(new Star(randomMass[i], randomX[i], randomY[i]));
    }

    // stars.push(new Star(random(10, 15), random(280, width/2), random(100, height/2 - 100)));

    star = new Star(10, width/2, height/3);
    sun = new Sun();

    smooth();

}

function draw() {

    textSize(20);
    fill(255);
    text("The formation of a blackhole", 30, 30);
    noFill();

    background(0, 100);

    if (stars.length < numStars-2) {
        stars.push(new Star(random(10,12), random(width, width+100),random(-200, 0)));
        stars.push(new Star(random(10,12), random(-100, 0),random(height+10, height+ 200)));
    }

    for (var i = 0; i < stars.length; ++i) {
        drawStars(stars[i]);
    }

    sun.display();

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

var Star = function(m, x, y) {
    this.mass = m;
    this.loc = createVector(x, y);
    // initial velocity is 0
    this.v = createVector(0, 0);
    this.a = createVector(random(-2.5, 2.5), random(-1, 1));
};

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
    ellipse(this.loc.x, this.loc.y, this.mass, this.mass);
};

var Sun = function() {
    this.mass = 400;
    this.loc = createVector(random(width/2-100, width/2+100), random(height/2-100, height/2+100));
    this.G = 2.5;
    this.r = this.mass/7;

    this.darkness = 255;
};

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

    if (dist < this.r/2) {
        if (this.darkness !== 0) {
            this.darkness -= 5;
            this.mass += 2*7;
            this.r +=2;
        }

        return true;
    }

    return false;
};

Sun.prototype.display = function () {

    // this.loc = createVector(mouseX, mouseY);

    strokeWeight(3);
    stroke(200, 255-this.darkness);
    fill(this.darkness);
    ellipse(this.loc.x, this.loc.y, this.r, this.r);
};
