var waterflow = 0;


function setup() {
    createCanvas(710, 400, WEBGL);
  }


function flow_update(data){
    waterflow = data;
}
  
function draw() {
    background(180,0,30);
    rotateY(frameCount * 0.01);

    for (let j = 0; j < Math.floor(waterflow % 15); j++) {
        push();
        for (let i = 0; i < 80; i++) {
            translate(
                sin(frameCount * 0.001 + j) * 100,
                sin(frameCount * 0.001 + j) * 100,
                i * (0.1)
            );
            rotateZ(frameCount * 0.002);
            push();
            sphere(8, 6, 4);
            pop();
        }
        pop();
    }
}
  