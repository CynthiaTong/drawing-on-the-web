// Drawing 1
var canvas, context;
var pxd, pxWidth, pxHeight;

var min_galaxy, galaxy;
var pixelateBtn = parent.document.getElementById("pixelateBtn");
var posterizeBtn = parent.document.getElementById("posterizeBtn");
var invertBtn = parent.document.getElementById("invertBtn");
var resetBtn = parent.document.getElementById("resetBtn");

function preload() {
    min_galaxy = loadImage("../img/min_galaxy.jpg");
    galaxy = loadImage("../img/galaxy.jpg");
}

function setup() {
    createCanvas(600, 450);

    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");

    pxd = pixelDensity();
    pxWidth = width * pxd;
    pxHeight = height * pxd;

    image(galaxy, 0, 0, width, height);

    // pixelateBtn.addEventListener("click", function() {
    //     var scale = width/min_galaxy.width;
    //     pixelate(min_galaxy, scale);
    // });

    posterizeBtn.addEventListener("click", function() {
        image(galaxy, 0, 0, width, height);
        var imgData = context.getImageData(0,0, pxWidth, pxHeight);
        posterize(imgData);
    });

    invertBtn.addEventListener("click", function() {
        image(galaxy, 0, 0, width, height);
        var imgData = context.getImageData(0,0, pxWidth, pxHeight);
        invert(imgData);
    });

    resetBtn.addEventListener("click", function() {
        image(galaxy, 0, 0, width, height);
    });
}

function draw() {

}

function pixelate(img, scale) {
    pixelDensity = 1;
    img.loadPixels();

    var index;
	var r,g,b,a;

    for (var x = 0; x < img.width; x++) {
        for (var y = 0; y < img.height; y++) {
            index = (x + y*img.width) * 4;

            r = img.pixels[index];
            g = img.pixels[index + 1];
            b = img.pixels[index + 2];
            a = img.pixels[index + 3];

            fill(r,g,b,a);
            strokeWeight(0.2);
            stroke(0);
            rect(x*scale, y*scale, scale, scale);
        }
    }

}

// the algorithm for this posterize function comes from
// p5.js : https://github.com/processing/p5.js/blob/master/src/image/filters.js
function posterize(imgData) {

    var pixelData = imgData.data;
    var level = 4;
    var levels1 = level - 1;

    for (var i = 0; i < pixelData.length; i += 4) {

        var rlevel = pixelData[i];
        var glevel = pixelData[i + 1];
        var blevel = pixelData[i + 2];

        pixelData[i] = (((rlevel * level) >> 8) * 255) / levels1;
        pixelData[i + 1] = (((glevel * level) >> 8) * 255) / levels1;
        pixelData[i + 2] = (((blevel * level) >> 8) * 255) / levels1;
   }

   context.putImageData(imgData, 0, 0);
}

function invert(imgData) {

    var pixelData = imgData.data;
    for (var i = 0; i < pixelData.length; i += 4) {

        for (var j=0; j < 3; j++) {
            pixelData[i+j] = 255 - pixelData[i+j];
        }
    }

    context.putImageData(imgData, 0, 0);
}
