document.addEventListener('DOMContentLoaded', function() {

   var rightBtn = document.getElementById("rightBtn");
   var leftBtn = document.getElementById("leftBtn");

   var clicks = 0;

   function slideRight(count) {
     var images = document.querySelector(".slides");
     var degrees = clicks*60 + 60;

     images.style.transform = "rotateY(" + degrees + "deg)";

    //  images.animate([
    //    {transform: "rotateY(" + (degrees-60) + "deg)"},
    //  	 {transform: "rotateY(" + degrees + "deg)"}
    //  ], {
    //    duration: 1500,
    //    easing: "linear",
    //    fill: "forwards"
    //  });

   }

   function slideLeft(count) {
     var images = document.querySelector(".slides");
     var degrees = clicks*60 - 60;

     images.style.transform = "rotateY(" + degrees + "deg)";

   }

   rightBtn.addEventListener("click", function() {
     slideRight(clicks);
     clicks ++;
   });

   leftBtn.addEventListener("click", function() {
     slideLeft(clicks);
     clicks --;
   });
});
