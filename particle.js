class Particle {
  constructor(followFlowfeild, vel, pos = createVector(random(width), random(height))) {
    this.pos = pos
    this.prevpos = pos
    this.vel = vel;
    this.acc = createVector(0,0)
    this.maxSpeed = random(1, 7)
    this.followFlowfeild = followFlowfeild
  }
  
  update() {
    this.vel.add(this.acc)
    this.vel.limit(this.maxSpeed);
    this.prevpos = this.pos.copy();
    this.pos.add(this.vel)
    this.acc.mult(0)
    this.edges()
  }

  applyForce(force) {
    this.acc.add(force)
  }

  follow(flowfield) {
    if(this.followFlowfeild) {
      const x = floor(this.pos.x / scl)
      const y = floor(this.pos.y / scl)
      const vector = flowfield[y * cols + x]
      this.applyForce(vector)
    } else {
      this.vel.mult(1.1)
    }
  }
  
  display() {
    noFill()
    strokeWeight(1)
    stroke(255)
    line(this.pos.x, this.pos.y, this.prevpos.x, this.prevpos.y)
  }

  edges() {
    if(this.pos.x < border){
      this.pos.x = width - border
      this.prevpos = this.pos.copy();
    }
    if(this.pos.x > width - border)
    {
      this.pos.x = border
      this.prevpos = this.pos.copy();
    }
    if(this.pos.y < border)
    {
      this.pos.y = height - border
      this.prevpos = this.pos.copy();
    }
    if(this.pos.y > height - border)
    {
      this.pos.y = border
      this.prevpos = this.pos.copy();
    }
  }
}