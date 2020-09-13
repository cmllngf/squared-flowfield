let seed;
let xoff = 0
let yoff = 0
const numberOfParticles = 500;
let flowfield
const scl = 40
let cols, rows;
const particles = []
const border = 20

function setup() {
  createCanvas(400, 400)
  seed = random(99999)
  randomSeed(seed)
  background('black');
  cols = width/scl
  rows = height/scl
  flowfield = new Array(cols*rows)
  const anglesPos = [
    {a:0, x:border, y:border},
    {a:PI/2, x:border, y:border},
    {a:PI, x:width - border, y:height - border},
    {a:-PI/2, x:width - border, y:height - border}
  ]

  for(let i = 0; i < numberOfParticles; i++) {
    const aP = anglesPos[int(random(anglesPos.length))]
    particles.push(new Particle(random() < .5, p5.Vector.fromAngle(aP.a), createVector(aP.x, aP.y)))
  }
  
  yoff = 0
  for (let y = 0; y < rows; y++) {
    xoff = 0;
    for (let x = 0; x < cols; x++) {
      const phi = noise(xoff,yoff) * TWO_PI
      const v = p5.Vector.fromAngle(phi)
      v.setMag(0.1)
      flowfield[y*cols+x] = v
      xoff+=.1
    }
    yoff += 0.06;
  }
  frameRate(60)
  createLoop({duration:20, gif:true})
}

function draw() {
  background(0, 150);
  for(let i = 0; i < numberOfParticles; i++) {
    particles[i].follow(flowfield)
    particles[i].update()
    particles[i].display()
  }
}

function keyPressed(key) {
  console.log(key)
  if(key.keyCode === 80)
    save()
}
