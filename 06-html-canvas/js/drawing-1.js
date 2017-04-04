// Drawing 1

var canvas, context;

var min_galaxy, galaxy;
var pixelateBtn = parent.document.getElementById("pixelateBtn");
var posterizeBtn = parent.document.getElementById("posterizeBtn");
var resetBtn = parent.document.getElementById("resetBtn");

function preload() {
    min_galaxy = loadImage("../img/min_galaxy.jpg");
    galaxy = loadImage("../img/galaxy.jpg");
}

function setup() {
    createCanvas(600, 450);

    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");

    image(galaxy, 0, 0, width, height);

    pixelateBtn.addEventListener("click", function() {
        var scale = width/min_galaxy.width;
        pixelate(min_galaxy, scale);
    });

    posterizeBtn.addEventListener("click", function() {
        image(galaxy, 0, 0, width, height);
        filter(POSTERIZE, 3);

        var imgData = context.getImageData(0,0, width, height).data;

        posterize(imgData);
    });

    resetBtn.addEventListener("click", function() {
        image(galaxy, 0, 0, width, height);
    });
}

function draw() {
    // galaxy.filter(POSTERIZE,4);

}

function pixelate(img, scale) {
    pixelDensity = 1;
    img.loadPixels();
    // loadPixels();

    var index;
	var r,g,b,a;

    for (var x = 0; x < img.width; x++) {
        for (var y = 0; y < img.height; y++) {
            index = (x + y*img.width)*4;

            r = img.pixels[index];
            g = img.pixels[index+1];
            b = img.pixels[index+2];
            a = img.pixels[index+3];

            fill(r,g,b,a);
            strokeWeight(0.2);
            stroke(0);
            rect(x*scale, y*scale, scale, scale);

        }
    }

}

function posterize(pixelData) {

    // var rgbValues = [25, 75, 125, 175, 225, 255];
    //
    // pixelDensity = 1;
    // img.loadPixels();
    // loadPixels();
    //
    // var index;
    // var r,g,b,a;
    //
    // for (var x=0; x < img.width; x ++) {
    //     for (var y=0; y < img.height; y ++) {
    //         index = (x + y*img.width)*4;
    //
    //         r = img.pixels[index];
    //         g = img.pixels[index+1];
    //         b = img.pixels[index+2];
    //         a = img.pixels[index+3];
    //
    //         for (var i in rgbValues) {
    //             if (r <= rgbValues[i]) {
    //                 console.log(r);
    //                 pixels[index] = i;
    //                 break;
    //             }
    //         }
    //         for (var i in rgbValues) {
    //             if (g <= rgbValues[i]) {
    //                 pixels[index+1] = i;
    //                 break;
    //             }
    //         }
    //         for (var i in rgbValues) {
    //             if (b <= rgbValues[i]) {
    //                 pixels[index+2] = i;
    //                 break;
    //             }
    //         }
    //
    //
    //         // fill(r,g,b);
    //         // rect(x, y, 1, 1);
    //     }
    // }
    //
    // updatePixels();

}
