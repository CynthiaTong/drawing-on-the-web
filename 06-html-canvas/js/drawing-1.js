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
