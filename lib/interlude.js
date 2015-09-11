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
