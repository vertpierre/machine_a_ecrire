var bold = document.getElementById("bold");
bold.addEventListener("click", (event) => {
  $("path").css("stroke-width", +12 + "px");
});

var regular = document.getElementById("regular");
regular.addEventListener("click", (event) => {
  $("path").css("stroke-width", +10 + "px");
});

var thin = document.getElementById("thin");
thin.addEventListener("click", (event) => {
  $("path").css("stroke-width", +8 + "px");
});

var sharp = document.getElementById("sharp");
sharp.addEventListener("click", (event) => {
  $(".composition_blur").css({
    "-webkit-filter": "blur(" + 2 + "px)",
    filter: "blur(" + 2 + "px)",
  });
});

var smooth = document.getElementById("smooth");
smooth.addEventListener("click", (event) => {
  $(".composition_blur").css({
    "-webkit-filter": "blur(" + 8 + "px)",
    filter: "blur(" + 8 + "px)",
  });
});
