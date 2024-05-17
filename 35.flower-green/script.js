class Flower {
  constructor() {
    this.pos = [random(width), random(height)];
    this.rot = goldenAngle * floor(random(1, 3));
    this.angle = random(TAU);
    this.scale = 1;
    this.size = random(50, 150);
    this.amp = this.size * random(0.1, 0.6);
    this.hue = random(0.3, 0.45);
  }
  update() {
    this.angle += this.rot;
    this.scale *= 0.99;
  }
  render() {
    pushpop(() => {
      translate(...this.pos);
      rotate(this.angle);
      scale(this.scale);

      fill(this.hue, 0.7, 1);
      stroke(this.hue, 0.7, 0.5);

      beginShape();
      vertex(0, 0);
      quadraticVertex(this.amp, this.amp, this.size, 0);
      quadraticVertex(this.amp, -this.amp, 0, 0);
      endShape(CLOSE);
    });
  }
}

let flowers = [];
let goldenAngle = 0.381966;

function setup() {
  pixelDensity(1);
  createCanvas();
  colorMode(HSB, 1, 1, 1);
  windowResized();
}

function init() {
  background(0.18);
  flowers = [];
  flowers.push(new Flower());
}

function draw() {
  if (frameCount % 8 == 1) background(0, 0.01);
  if (random() < 0.1) flowers.push(new Flower());
  flowers.map((f) => {
    console.log(f);
    f.update();
    f.render();
  });
  flowers = flowers.filter((f) => f.scale > 0.1);
}

function pushpop(f) {
  push();
  f();
  pop();
}
function mousePressed() {
  windowResized();
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  init();
}
