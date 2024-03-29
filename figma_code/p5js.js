/* export SVG
DDF 2018
need to have p5.svg.js in project and in index.html
see -https://github.com/zenozeng/p5.js-svg
this will save an SVG file in your download folder
*/

var cnv;
var Objects = [];
var NB = 40;
var seed_list = [164, 505, 5906, 8369]

var wid = 609;
var hei = 368;

var NB_FRAMES = 60; // *************smaller NB_FRAMES faster reaction, while higher will make slower*************

var frame_count = 60;

function mapRange(value, inputMin, inputMax, outputMin, outputMax) {
  const inputRange = inputMax - inputMin;
  const outputRange = outputMax - outputMin;
  const scaledValue = (value - inputMin) / inputRange;
  const mappedValue = scaledValue * outputRange + outputMin;
  return Math.round(mappedValue);
}

// function graph_update (){ // *************this function will update the NB_FRAMES every draw loop by mqtt data*************
//   NB_FRAMES = 60 / water_flow;
//   NB_FRAMES = NB_FRAMES.toFixed(0)
//   console.log('NB_FRAMES:', NB_FRAMES);
//   return NB_FRAMES
// }

function graph_update (){
  var seed_idx = mapRange(water_flow, 0, 10, 0, 3);
  var last_seed = curSeed;
  curSeed = seed_list[seed_idx];
  if (last_seed == curSeed){
    noiseSeed(curSeed);
    console.log("curSeed updated to: " + curSeed);
  }
}

function activation(t) {
  return ((1 - cos(2 * PI * t)) / 2) ** 1;
}


function setup() {

  curSeed = 164;
  noiseSeed(curSeed);
  randomSeed(1);

  createCanvas(wid, hei, SVG);
  strokeWeight(1);   // do 0.1 for laser
  stroke(255, 0, 0);      // red is good for laser
  noFill();
  //cnv.parent("canvas");

  background(0);

  for (var i = 0; i < NB; i++) {
    Objects[i] = new object(i);

  }
  // better not to have a fill for laser
}

function object(id) {

  this.id = id;

  this.draw = function (NB_FRAMES) {// *************force it use the latest NB_FRAMES to count the rate*************
    var t = ((frame_count) % NB_FRAMES) / NB_FRAMES;

    var x0 = lerp(0, wid, this.id / NB);

    theta = PI / 2;

    var xx = x0;
    var yy = 0;

    var Nt = 75; // this can change the drawing style // original (Nt = 75)

    var step = hei / Nt;

    var turn = lerp(0, 0.4, activation((this.id / NB + 0 * t) % 1));

    stroke(255);
    strokeWeight(1);
    noFill();
    beginShape();

    vertex(xx, yy);


    for (var i = 0; i <= Nt; i++) {
      theta += turn * sin(100 * noise(1000) + 2 * PI * (15 * noise(0.2 * this.id / NB, 0.02 * i) + t));
      xx += step * cos(theta);
      yy += step * sin(theta);

      var xx2 = lerp(xx, x0, (i / Nt) * (i / Nt) * (i / Nt));
      var yy2 = lerp(yy, lerp(0, hei - 0, i / Nt), max((i / Nt), 1 - sqrt(i / Nt)));

      vertex(xx2, yy2);


    }
    endShape();

  }
}

// function mousePressed(){
//     curSeed = floor(random()*10000);
//     noiseSeed(curSeed);
//     console.log(curSeed);
// }

function draw() {
  background(192, 225, 248);

  graph_update();
  for (var i = 0; i < NB; i++) { 
    Objects[i].draw(NB_FRAMES);
  }

  noStroke();
  fill(255);
  text("seed : " + curSeed, 10, 10);

  frame_count++;

  //////////////////////////////////////EXPORT
  if (keyCode === LEFT_ARROW) {
    save("mySVG.svg");
    print("saved svg");
    noLoop();
  }
}
