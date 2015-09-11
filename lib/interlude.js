Interlude = {};

function degreesToRadians(degrees)
{
return ((degrees-90) * Math.PI) / 180;  
}



function paint_circle(params)
    {        
        "use strict";
        var canvas, context, x,y, radius, counterClockwise, nova;    
        
        canvas  = params.canvas;
        context = params.context;   
    
        x = canvas.width / 2;
        y = canvas.height / 2;
        radius = params.radius;
        counterClockwise = false;
    
    
        context.beginPath();
        context.arc(x, y, radius, degreesToRadians(params.start), degreesToRadians(params.end), counterClockwise);
        context.lineWidth = 5;
    
    
        context.shadowColor = "white";
        context.shadowBlur = 7;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
    
        nova=context.createLinearGradient(0,0,270,0);
        nova.addColorStop("0","darkorange");
        nova.addColorStop("0.2","rgb(0,0,60)");
        nova.addColorStop("0.7","gold");        
        nova.addColorStop(1, 'rgba(200, 66, 0, 1)');


        context.strokeStyle = nova;
        context.stroke();
        context.closePath(); 
    

    }



Interlude.Loading = function(obj) {
  "use strict";
  var self = this;
  
    
  this.init = function init() {
    var s,
        node, 
        cv,
        canvas,
        context,
        q;
    
    if (! obj.div) {
        self.div = "body";    
        }
     else {
       self.div = document.getElementById(obj.div);
     }
        
    node = document.createElement("DIV");
    node.id             = "distance";
    node.className      = "InterludeLoading";
    // node.textContent    = "0";

    cv = document.createElement("canvas");
    cv.width = 60;
    cv.height = 60;
    cv.id     = node.id + "_canvas";
    node.appendChild(cv);
    self.div.appendChild(node);
    
    canvas = document.getElementById(cv.id);
    context = canvas.getContext('2d');    

    if (context) 
        {
        q = { start: 20, end: 340, radius: 25, canvas:canvas, context:context};
        paint_circle(q);    
        }
    

    
  };
   
  self.init();  
};



/////////////////////////////////////////////////////

  window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  })();


Interlude.Forms = function(obj) {
  "use strict";
  var self      = this;
  self.canvas   = null;
  self.context  = null;
  self.form     = null;  // this is the object to be drawn

  self.start_time = 0;

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
  
  // animate
  this.animate = function() {
        // update      
        self.form.x += 1;
        // this call clears the rectangle
        // self.context.clearRect(0, 0, self.canvas.width, self.canvas.height);
        self.draw();
    };
  
  
  // the first draw;
  this.draw = function() {
       
       self.context.beginPath();
       self.context.rect(self.form.x, self.form.y, self.form.width, self.form.height);
       self.context.fillStyle = '#8ED6FF';
       self.context.fill();
       self.context.lineWidth = self.form.borderWidth;
       self.context.strokeStyle = 'black';
       self.context.stroke();
           
  };
  
  
  // initialization
  this.init = function init() {   
     self.create_canvas();
     self.startTime = (new Date()).getTime();
     
     

     self.form = {
        x: 0,
        y: 75,
        width: 100,
        height: 50,
        borderWidth: 2
      };
      
    
      
      if (! Interlude.ani) {
        Interlude.ani = new Interlude.Animation();  
        }
        
      Interlude.ani.calls.push(this);    
      self.draw();        
      self.animate(0);
         
  };
    
  self.init();  
    
};


// Main Animation Frame

Interlude.ani = null; 
NOVA = null;

Interlude.Animation = function() {
  "use strict";
  var self = this;
    
  this.calls = [];  
    
  this.loop = function() {

    if (self.calls.length > 0) {
      for (var i = 0; i < self.calls.length; i++) {
       if (self.calls[i].animate) {
        self.calls[i].animate.call(this);   
        } 
        
      }  
    }; 
        
    requestAnimationFrame(self.loop);    
  };

  this.init = function() {
    self.loop();  
  };

   
   self.init();
    
};



