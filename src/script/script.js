$(() => {
  $("svg").draggable();
});

function make_number(min, max) {
  var result = "";
  result = Math.round(Math.random() * (max - min) + min);
  return result;
}

$("#shape_01").html(
  '<path d="M' +
    make_number(6, 9) +
    " " +
    make_number(5, 10) +
    " L" +
    make_number(5, 10) +
    " " +
    make_number(15, 25) +
    " L" +
    make_number(10, 20) +
    " " +
    make_number(40, 50) +
    " L" +
    make_number(16, 16) +
    " " +
    make_number(60, 70) +
    " L" +
    make_number(16, 16) +
    " " +
    make_number(85, 95) +
    '" />',
);

$("#shape_02").html(
  '<path d="M' +
    make_number(45, 55) +
    " " +
    make_number(5, 10) +
    " L" +
    make_number(75, 85) +
    " " +
    make_number(10, 20) +
    " L" +
    make_number(90, 95) +
    " " +
    make_number(40, 50) +
    " L" +
    make_number(80, 90) +
    " " +
    make_number(70, 80) +
    " L" +
    make_number(60, 70) +
    " " +
    make_number(85, 95) +
    " L" +
    make_number(30, 40) +
    " " +
    make_number(85, 95) +
    " L" +
    make_number(5, 15) +
    " " +
    make_number(70, 80) +
    " L" +
    make_number(5, 15) +
    " " +
    make_number(40, 50) +
    " L" +
    make_number(15, 25) +
    " " +
    make_number(10, 20) +
    " Z" +
    '" />',
);

$("#shape_03").html(
  '<path d="M' +
    make_number(6, 16) +
    " " +
    make_number(5, 10) +
    " L" +
    make_number(6, 16) +
    " " +
    make_number(30, 35) +
    " L" +
    make_number(5, 20) +
    " " +
    make_number(40, 45) +
    " L" +
    make_number(5, 20) +
    " " +
    make_number(50, 60) +
    " L" +
    make_number(5, 20) +
    " " +
    make_number(70, 80) +
    " L" +
    make_number(5, 20) +
    " " +
    make_number(100, 105) +
    " L" +
    make_number(5, 20) +
    " " +
    make_number(115, 120) +
    " L" +
    make_number(6, 18) +
    " " +
    make_number(135, 145) +
    " L" +
    make_number(8, 13) +
    " " +
    make_number(160, 175) +
    " L" +
    make_number(9, 11) +
    " " +
    make_number(180, 220) +
    " L" +
    make_number(5, 20) +
    " " +
    make_number(235, 245) +
    '" />',
);

$("#shape_04").html(
  '<path d="M' +
    make_number(5, 10) +
    " " +
    make_number(5, 10) +
    " L" +
    make_number(15, 25) +
    " " +
    make_number(10, 20) +
    " L" +
    make_number(40, 50) +
    " " +
    make_number(1, 15) +
    " L" +
    make_number(60, 70) +
    " " +
    make_number(10, 20) +
    " L" +
    make_number(85, 95) +
    " " +
    make_number(5, 15) +
    '" />',
);

$("#shape_05").html(
  '<path d="M' +
    make_number(90, 95) +
    " " +
    make_number(5, 10) +
    " L" +
    make_number(55, 70) +
    " " +
    make_number(5, 10) +
    " L" +
    make_number(30, 40) +
    " " +
    make_number(5, 10) +
    " L" +
    make_number(5, 10) +
    " " +
    make_number(15, 30) +
    " L" +
    make_number(5, 10) +
    " " +
    make_number(55, 70) +
    " L" +
    make_number(10, 20) +
    " " +
    make_number(80, 95) +
    " L" +
    make_number(40, 50) +
    " " +
    make_number(85, 95) +
    " L" +
    make_number(55, 65) +
    " " +
    make_number(85, 95) +
    '" />',
);

$("#shape_06").html(
  '<path d="M' +
    make_number(60, 70) +
    " " +
    make_number(5, 10) +
    " L" +
    make_number(80, 90) +
    " " +
    make_number(10, 15) +
    " L" +
    make_number(90, 95) +
    " " +
    make_number(30, 40) +
    " L" +
    make_number(90, 95) +
    " " +
    make_number(60, 65) +
    " L" +
    make_number(80, 90) +
    " " +
    make_number(80, 90) +
    " L" +
    make_number(60, 70) +
    " " +
    make_number(90, 95) +
    " L" +
    make_number(15, 25) +
    " " +
    make_number(85, 95) +
    " L" +
    make_number(5, 10) +
    " " +
    make_number(60, 65) +
    " L" +
    make_number(10, 15) +
    " " +
    make_number(20, 30) +
    '" />',
);

$("#shape_07").html(
  '<path d="M' +
    make_number(5, 10) +
    " " +
    make_number(5, 10) +
    " L" +
    make_number(20, 30) +
    " " +
    make_number(5, 10) +
    " L" +
    make_number(40, 50) +
    " " +
    make_number(7, 13) +
    " L" +
    make_number(57, 65) +
    " " +
    make_number(10, 20) +
    " L" +
    make_number(65, 70) +
    " " +
    make_number(30, 40) +
    " L" +
    make_number(65, 70) +
    " " +
    make_number(60, 70) +
    " L" +
    make_number(65, 70) +
    " " +
    make_number(85, 95) +
    '" />',
);

$("#shape_01").css({
  "-webkit-transform": "rotate(" + make_number(-20, 20) + "deg)",
  transform: "rotate(" + make_number(-20, 20) + "deg)",
});

$("#shape_02").css({
  "-webkit-transform": "rotate(" + make_number(0, 360) + "deg)",
  transform: "rotate(" + make_number(0, 360) + "deg)",
});

$("#shape_03").css({
  "-webkit-transform": "rotate(" + make_number(-10, 10) + "deg)",
  transform: "rotate(" + make_number(-10, 10) + "deg)",
});

$("#shape_04").css({
  "-webkit-transform": "rotate(" + make_number(-30, 30) + "deg)",
  transform: "rotate(" + make_number(-30, 30) + "deg)",
});

$("#shape_05").css({
  "-webkit-transform": "rotate(" + make_number(-60, 60) + "deg)",
  transform: "rotate(" + make_number(-60, 60) + "deg)",
});

$("#shape_06").css({
  "-webkit-transform": "rotate(" + make_number(-45, 30) + "deg)",
  transform: "rotate(" + make_number(-45, 30) + "deg)",
});

$("#shape_07").css({
  "-webkit-transform": "rotate(" + make_number(-30, 30) + "deg)",
  transform: "rotate(" + make_number(-30, 30) + "deg)",
});

/*$("path").css("stroke-width", +make_number(9, 9) + "px");*/
