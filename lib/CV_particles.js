////////////////////// PARTICLE SYSTEM //////////////////////////


function Vector(x, y) {
  "use strict";
  this.x = x || 0;
  this.y = y || 0;
}

Vector.prototype.add = function(vector) {
  "use strict";
  this.x += vector.x;
  this.y += vector.y;
};

// Gets the length of the vector
Vector.prototype.getMagnitude = function () {
  "use strict";
  return Math.sqrt(this.x * this.x + this.y * this.y);
};
 
// Gets the angle accounting for the quadrant we're in
Vector.prototype.getAngle = function () {
  "use strict";
  return Math.atan2(this.y,this.x);
};
 
// Allows us to get a new vector from angle and magnitude
Vector.fromAngle = function (angle, magnitude) {
  "use strict";
  return new Vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
};
 
///////////////// PARTICLE OBJECT //////////////////////
 
function Particle(point, velocity, acceleration) {
  "use strict";    
  this.position = point || new Vector(0, 0);
  this.velocity = velocity || new Vector(0, 0);
  this.acceleration = acceleration || new Vector(0, 0);
}
 
Particle.prototype.move = function () {
  // Add our current acceleration to our current velocity
  "use strict";
  this.velocity.add(this.acceleration);
  // Add our current velocity to our position
  this.position.add(this.velocity);
};
  

function Emitter(point, velocity, spread) {
  "use strict";
  this.position = point; // Vector
  this.velocity = velocity; // Vector
  this.spread = spread || Math.PI / 32; // possible angles = velocity +/- spread
  this.drawColor = "#999"; // So we can tell them apart from Fields later
}


Emitter.prototype.emitParticle = function() {
  // Use an angle randomized over the spread so we have more of a "spray"
  "use strict";
  var angle, magnitude, position, velocity;
  angle = this.velocity.getAngle() + this.spread - (Math.random() * this.spread * 2);
 
  // The magnitude of the emitter's velocity
  magnitude = this.velocity.getMagnitude();
 
  // The emitter's position
  position = new Vector(this.position.x, this.position.y);
 
  // New velocity based off of the calculated angle and magnitude
  velocity = Vector.fromAngle(angle, magnitude);
 
  // return our new Particle!
  return new Particle(position,velocity);
};
 






Particles = function(obj) {
  "use strict";
  var self = this;
  self.canvas           = null;
  self.context          = null;
  
  self.particles        = [];
  self.emitters = [new Emitter(new Vector(100, 230), Vector.fromAngle(0, 2))];
  
  self.maxParticles     = 1000;
  self.emissionRate     = 1;
  
  
  // this function takes the div and creates a canvas inside
  this.create_canvas = function() {
    
       if (! obj.div) {
            self.div = "body";    
            }
         else {
            self.div = document.getElementById(obj.div);
            } 
       var w,h, node, cv, x;   
      
       w = self.div.scrollWidth;
       h = self.div.scrollHeight;   
       node = self.div;
       cv = document.createElement("canvas");
       cv.width = w;
       cv.height = h;
       cv.id     = node.id + "_canvas";
       
       x = document.getElementById(cv.id);
       if (! x) {    
           node.appendChild(cv);        
           self.canvas = document.getElementById(cv.id);
           if (self.canvas) {
            self.context = self.canvas.getContext('2d');       
            }
        }
        else {
           self.canvas = x; 
           self.context = self.canvas.getContext('2d'); 
        }
            
  };
  
  this.addNewParticles = function() {
       if (self.particles.length > self.maxParticles) { return; }
     
      // for each emitter
      for (var i = 0; i < self.emitters.length; i++) {
     
        // for [emissionRate], emit a particle
        for (var j = 0; j < self.emissionRate; j++) {
          self.particles.push(self.emitters[i].emitParticle());
        }
     
      }    
  };
  
  
  
 self.plotParticles = function(boundsX, boundsY) {
  // a new array to hold particles within our bounds
  var currentParticles = [], i, particle, pos;
 
  for (i = 0; i < self.particles.length; i++) {
    particle = self.particles[i];
    pos = particle.position;
 
    // If we're out of bounds, drop this particle and move on to the next
    if (pos.x < 0 || pos.x > boundsX || pos.y < 0 || pos.y > boundsY) continue;
 
    // Move our particles
    particle.move();
 
    // Add this particle to the list of current particles
    currentParticles.push(particle);
  }
 
  // Update our global particles, clearing room for old particles to be collected
  self.particles = currentParticles;
};
  
  
self.particleSize = 2;
 
self.drawParticles = function() {
  // Set the color of our particles
  self.context.fillStyle = 'rgb(0,0,255)';
 
  // For each particle
  for (var i = 0; i < self.particles.length; i++) {
    var position = self.particles[i].position;
 
    // Draw a square at our position [particleSize] wide and tall
    self.context.fillRect(position.x, position.y, self.particleSize, self.particleSize);
  }
};
  
  
  
  
  
  this.clear = function() {
      self.context.clearRect(0, 0, self.canvas.width, self.canvas.height);
  };
  
  this.update = function() {
   self.addNewParticles();
   self.plotParticles(self.canvas.width, self.canvas.height);   
  };
  
  
  this.draw = function() {
   self.drawParticles();   
  };
  
  
  this.queue = function() {
      
  };
  
  
  this.loop = function() {
    self.clear();  
    self.update();
    self.draw();
    self.queue();
  };
  
  
  this.init = function init() {
        self.create_canvas();
        
        if (! Interlude.ani) {
            Interlude.ani = new Interlude.Animation();  
            }
        
        Interlude.ani.calls.push(this);
        PART = this;
        
  };
  
  
  self.init();
  
};