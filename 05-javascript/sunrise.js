var sun = document.getElementById("sun");
var bg = document.getElementById("background");

var angle = 270;
var radius = 10;
var light = 50;

function circularMotion(cx, cy) {

  x = cx + radius * Math.cos(angle*Math.PI/180);
  y = cy + radius * Math.sin(angle*Math.PI/180);

  if (angle > 360) {
    angle = 0;
    // cancelAnimationFrame(motion);
  }


  sun.style.left = x + "px";
  sun.style.top = y + "px";
  sun.style.fill = "hsl(24, 100%, " + light + "%)";

  bg.style.opacity = (255 - light*8.0) /255;

  angle ++;

  if (angle > 320 || angle < 150) {
    light -= 0.2;
  } else {
    light += 0.2;
  }

  requestAnimationFrame(function() {
    circularMotion(x, y);
  });

}

var motion = requestAnimationFrame(function() {
  circularMotion(80, 600);
});
