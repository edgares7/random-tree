let viewWidth = 500,
    viewHeight = 300,
    canvas = document.getElementById("canvas"),
    hue1=Math.random() * (360 - 1) + 1,
		hue2=Math.random() * (360 - 1) + 1,
    branches = [],
		grd;

Branch = function(x,y,r,w,h,grd){  
  this.x = x || canvas.width/2;
  this.y = y || canvas.height;
  this.r = r || 0;
  this.w = w || 20;
  this.h = h || 40;
  this.grd = grd || defgrd; 
    
  if (this.w>1 && this.y > 20){  
    var nodes = (this.y > viewHeight-50) ? 1 : 2;
    
    for (let i=0; i<nodes; i++){
      let tx = this.x + Math.sin(this.r)*this.h;
      let ty = this.y - Math.cos(this.r)*this.h;
      let tr = this.r -.75+Math.random()*1.5;
      let tw = this.w - (1 + Math.random()*2);
      let th = 15+Math.random()*15;
			let tb = Math.min(120 - ty/3 , 70);
      let tcol1 = "hsl("+(hue1)+",100%,"+tb+"%)";
      let tcol2 = "hsl("+(hue2)+",100%,"+(tb-30)+"%)";
      let tgrd = ctx.createLinearGradient(-tw/2,-th,tw,th);
      tgrd.addColorStop(0,tcol1);
      tgrd.addColorStop(.8,tcol2);
      branches.push(new Branch(tx,ty,tr,tw,th, tgrd));
    }
    
  }
  
  this.draw = function(){
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.r);
    ctx.fillStyle = this.grd;
    ctx.fillRect(-this.w/2, -this.h, this.w, this.h);
    ctx.restore();  
  }
}

window.onload = function() {
  canvas.width = viewWidth;
  canvas.height = viewHeight;
  ctx = canvas.getContext('2d');
  ctx.globalAlpha = 0.25;
  defcol1 = "hsl("+hue1+",100%,20%)";
  defcol2 = "hsl("+hue2+",100%,20%)";
  defgrd = ctx.createLinearGradient(-20,-20,40,20);
  defgrd.addColorStop(0,defcol1);
  defgrd.addColorStop(.8,defcol2);
  onmousedown = start;
  start();
};

start = function(e){
  branches = [];
  ctx.clearRect ( 0 , 0 , canvas.width, canvas.height );
  let b = new Branch();
  branches.push(b);
  requestAnimationFrame(loop);
}

function loop() {
  if (branches.length){
    let b = branches.pop();
    b.draw();
    
    requestAnimationFrame(loop);
  }  
};