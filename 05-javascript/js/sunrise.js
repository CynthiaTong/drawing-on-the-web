var sun = document.getElementById("sun");
var sky = document.getElementById("sky");
var ground = document.getElementById("ground");

var radius = 90;
var initY = 600;
var light = 75;

function sunMotion(cy) {

  y = cy -= 2;
  light -= 0.1;

  if (y < -400) {
    // reset
    y = initY;
    light = 75;
  }

  sun.style.top = y + "px";

  var hsl1 = "hsl(24, 100%, " + light + "%)";
  var hsl2 = "hsl(48, 100%, " + light + "%)";

  sun.style.background = "linear-gradient(to bottom," + hsl1 + "," + hsl2 + ")";
  ground.style.background = "radial-gradient(at 50% 0%," + hsl1 + ", #003366)";

  var perc = (y+radius+10)/screen.height*100.0;
  sky.style.background = "radial-gradient(at 50% " + perc + "%," + hsl2 + ", #80aaff)";

  requestAnimationFrame(function() {
    sunMotion(y);
  });

}

var motion = requestAnimationFrame(function() {
  sunMotion(initY);
});
