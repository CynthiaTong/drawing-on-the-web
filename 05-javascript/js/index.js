document.addEventListener('DOMContentLoaded', function() {

   var rightBtn = document.getElementById("rightBtn");
   var leftBtn = document.getElementById("leftBtn");

   var clicks = 0;

   function slideRight(count) {
     var images = document.querySelector(".slides");
     var degrees = clicks*60 + 60;

     images.style.transform = "rotateY(" + degrees + "deg)";
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
